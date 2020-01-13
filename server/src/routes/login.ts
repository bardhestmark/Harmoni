import express from "express";
import { pool } from "../dao/database";
import userDao from "../dao/userDao";
import { compareHash, hash } from "../hashing";

var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

const router = express.Router();
const dao = new userDao(pool);

router.use(bodyParser.json()); //to transtalte JSON in the body

let publicKey;
let privateKey = (publicKey = "superSecret");

let user;
router.use(express.static("public"));

router.post("/", (req, res) => {
  dao.getUserByEMail(req.body.email, (status, data) => {
    user = data[0];
    if (typeof user != "undefined") {
      if (compareHash(user.hash, req.body.password, user.salt)) {
        console.log("email & password ok");
        let token = jwt.sign({ email: req.body.email }, privateKey, {
          expiresIn: 1800
        });
        //window.localStorage.setItem("x-access-token",token);
        // res.status()
        res.json({ jwt: token });
        res.status(200);
      } else {
        //console.log('email & password NOT ok');
        res.status(204);
        res.json({ error: "Not authorized" });
      }
    } else {
      res.status(204);
      res.json({ error: "brukeren finnes ikke" });
    }
  });
});

router.post("/token/update", (req, res, next) => {
  var token = req.headers["x-access-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token Not ok");
      res.status(401);
      res.json({ error: "Not authorized" });
    } else {
      let token = jwt.sign({ email: req.body.email }, privateKey, {
        expiresIn: 1800
      });
      localStorage.setItem("x-access-token", token);
      //console.log("Token ok: " + decoded.email);
      next();
    }
  });
});
router.post("/token", (req, res) => {
  let newToken = "";
  var token = req.body.headers["x-access-token"];
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      console.log("Token has expired");
      res.status(401);
      res.json({ error: "Not authorized" });
    } else {
      newToken = jwt.sign({ email: decoded.email }, privateKey, {
        expiresIn: 1800
      });
      dao.getUserByEMail(decoded.email, (status, data) => {
        let id = data[0] === undefined ? undefined : data[0];
        res.json({ jwt: newToken, userData: data[0] });
      });
    }
  });
});

router.post("/register", (req, res) => {
  let data = hash(req.body.password);
  req.body.hash = data.hash;
  req.body.salt = data.salt;
  dao.getUserByEMail(req.body.email, (status, data) => {
    user = data[0];
    if (typeof user === "undefined") {
      dao.addUser(req.body, status => {
        if (status !== 401) {
          let token = jwt.sign({ email: req.body.email }, privateKey, {
            expiresIn: 1800
          });
          res.json({ jwt: token });
        } else {
          console.log(status);
          res.status(401);
          res.json({ error: "Could not add user" });
        }
      });
    } else {
      res.status(409);
      res.json({ error: "the user exists error code:" + status });
    }
  });
});

module.exports = router;

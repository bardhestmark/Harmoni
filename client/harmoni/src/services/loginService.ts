import axios from "axios";
// import {Simulate} from "react-dom/test-utils";
// import { error } = Simulate.error;

export default class LoginService {
  login(email: string, password: string) {
    const headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    var postData = {
      email: email,
      password: password
    };
    return axios
      .post("http://localhost:15016/api/v0/login/", postData, {
        headers: headers
      })
      .then(response => {
        localStorage.setItem("x-access-token", response.data.jwt);
        return response;
      })
      .catch(error => error);
  }

  updateToken() {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-access-token": localStorage.getItem("x-access-token")
    };
    return axios
      .post("http://localhost:15016/api/v0/login/token/update", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem("x-access-token", response.data.jwt);
      })
      .catch(error => alert(error));
  }

  checkToken(){
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      "x-access-token":localStorage.getItem("x-access-token")
    }
    console.log(headers["x-access-token"]);
    return axios.post("http://localhost:15016/api/v0/login/token",{
      headers: headers
    }).then(response => {
      if (response.status === 401){
        return false;
      }else{
        localStorage.setItem("x-access-token",response.data.jwt)
        console.log(response.status);
        console.log(response.data.userId);
        return true;
      }
    }).catch(error => console.log(error));
  }

  registrerPerson(
    name: string,
    email: string,
    mobile: number | undefined,
    password: string,
    type: string,
    picture: string
  ) {
    var postData = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      type: type,
      picture: picture,
      salt: "",
      hash: ""
    };
    const headers = {
      "content-Type": "application/json;charset=utf-8"
    };
    return axios
      .post("http://localhost:15016/api/v0/login/register", postData, {
        headers: headers
      })
      .then(response => {
        if (response.status === 409) {
          console.log("User exists from before.");
        } else localStorage.setItem("x-access-token", response.data.jwt);

        return response;
      })
      .catch(error => error.response);
  }
}

export let loginService = new LoginService();

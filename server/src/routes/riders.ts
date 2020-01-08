import express from 'express';
import riderDAO from 'dao/riderDao';
import { pool } from '../dao/database'

const router = express.Router();
const dao = new riderDAO(pool);

// Routes to interact with riders.

// Add rider
router.post("/", async (request, response) => {
    dao.addRider(request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Add rider list
router.post("/", async (request, response) => {
    dao.addRiderList(request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get singular rider given id
router.get("/:id", async (request, response) => {
    dao.getRider(parseInt(request.params.id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders
router.get("/", async (request, response) => {
    dao.getAllRiders((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all riders in event
router.get("/:event_id", async (request, response) => {
    dao.getRiderByEventId(parseInt(request.params.event_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Get all riders of user in event 
router.get("/:event_id&:user_id", async (request, response) => {
    dao.getRiderByUserIdInEvent(parseInt(request.params.event_id), parseInt(request.params.user_id), (status, data)=>{
        status==500 ? response.status(500):response.send(data)
    });
})

// Update singular rider given id
router.put("/:id", async (request, response) => {
    dao.updateRider(parseInt(request.params.id), request.body,(status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete rider given id
router.delete("/:id", async (request, response) => {
    dao.deleteRider(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})
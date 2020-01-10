import express from 'express';
import eventDao from '../dao/eventDao'
import { pool } from '../dao/database'

const router = express.Router();
const dao = new eventDao(pool);
// Routes to interact with events.

// Create event
router.post("/authorized/events/", async (request, response) => {
    dao.addEvent(request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get singular event given id
router.get("/events/:id", async (request, response) => {
    dao.getEvent(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get events given address
router.get("/events/address/:address", async (request, response) => {
    dao.getEventsByAddress(request.params.address, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get events given status
router.get("/events/status/:status", async (request, response) => {
    dao.getEventsByStatus(request.params.status, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get events given organizer
router.get("/events/organizer/:organizer", async (request, response) => {
    dao.getEventsByOrganizer(parseInt(request.params.organizer), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get all
router.get("/events/", async (request, response) => {
    dao.getAllEvents((status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Update singular event given id
router.put("/authorized/events/:id", async (request, response) => {
    dao.updateEvent(parseInt(request.params.id), request.body, (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Delete event given id
router.delete("/authorized/events/:id", async (request, response) => {
    dao.deleteEvent(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    });
})

// Get events by user
router.get("/events/user/:id", async (request, response) => {
    dao.getEventsOfUser(parseInt(request.params.id), (status, data) => {
        status == 500 ? response.status(500) : response.send(data)
    })
})

module.exports = router;
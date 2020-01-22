// Routes to interact with events

import express from "express";
import eventDao from "../dao/eventDao";
import { pool } from "../dao/database";

const router = express.Router();
const dao = new eventDao(pool);
// Routes to interact with events.

// Create an event
router.post("/authorized/events/", async (request, response) => {
  dao.addEvent(request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get singular event by id
router.get("/events/:id", async (request, response) => {
  dao.getEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by address
router.get("/events/address/:address", async (request, response) => {
  dao.getEventsByAddress(request.params.address, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by status
router.get("/events/status/:status", async (request, response) => {
  dao.getEventsByStatus(parseInt(request.params.status), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by organizer
router.get("/events/organizer/:organizer", async (request, response) => {
  dao.getEventsByOrganizer(
    parseInt(request.params.organizer),
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

// Get all
router.get("/events/", async (request, response) => {
  dao.getAllEvents((status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get all with offset
router.get("/events/offset/:offset", async (request, response) => {
  dao.getAllEventsWithOffset(
    parseInt(request.params.offset),
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

router.get("/events/count/all", async (request, response) => {
  dao.getCountOfAllEventsNotCancelledNotFinished((status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

router.post(
  "/authorized/events/user_event/:userId/:eventId",
  async (request, response) => {
    dao.addUserToEvent(
      parseInt(request.params.userId),
      parseInt(request.params.eventId),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

// Get user for event given eventId,userId
router.get(
  "/authorized/events/user_event/:userId/:eventId",
  async (request, response) => {
    dao.getUserEvent(
      parseInt(request.params.userId),
      parseInt(request.params.eventId),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

// Delete user from an event given userId,eventId
router.delete(
  "/authorized/events/user_event/:userId/:eventId",
  async (request, response) => {
    dao.deleteUserFromEvent(
      parseInt(request.params.userId),
      parseInt(request.params.eventId),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

// Update singular event by id
router.put("/authorized/events/:id", async (request, response) => {
  dao.updateEvent(parseInt(request.params.id), request.body, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Delete event by id
router.delete("/authorized/events/:id", async (request, response) => {
  dao.deleteEvent(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by user
router.get("/events/user/:id", async (request, response) => {
  dao.getEventsOfUser(parseInt(request.params.id), (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by category
router.get("/events/user/:category", async (request, response) => {
  dao.getEventsByCategory(request.params.category, (status, data) => {
    status == 500 ? response.status(500) : response.send(data);
  });
});

// Get events by category with offset
router.get(
  "/events/category/offset/:category/:offset",
  async (request, response) => {
    dao.getEventsByCategoryWithOffset(
      request.params.category,
      parseInt(request.params.offset),
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);

router.get("/events/count/category/:category", async (request, response) => {
  dao.getCountOfEventsByCategoryNotCancelledNotFinished(
    request.params.category,
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

router.get("/events/user/:event_id/:type", async (request, response) => {
  dao.getUsersOfEventByType(
    parseInt(request.params.event_id),
    request.params.type,
    (status, data) => {
      status == 500 ? response.status(500) : response.send(data);
    }
  );
});

// Change status for an event given its id
router.put(
  "/authorized/events/:event_id/:status",
  async (request, response) => {
    dao.changeStatus(
      parseInt(request.params.event_id),
      request.params.status,
      (status, data) => {
        status == 500 ? response.status(500) : response.send(data);
      }
    );
  }
);


module.exports = router;

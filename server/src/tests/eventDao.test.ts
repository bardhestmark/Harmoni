// Tests to interact with events.

import eventDao from "../dao/eventDao";

var mysql = require("mysql");
var fs = require("fs");

function run(filename, pool, done) {
  let sql = fs.readFileSync(filename, "utf8");
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("runsqlfile: error connecting");
      done();
    } else {
      console.log("runsqlfile: connected");
      connection.query(sql, (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          done();
        } else {
          console.log("runsqlfile: run ok");
          done();
        }
      });
    }
  });
}

let poolConfig = {
  connectionLimit: 1,
  host: process.env.NODE_ENV == "ci" ? "mysql" : "localhost",
  user: "root",
  password: "humbug",
  database: "harmoni",
  debug: false,
  multipleStatements: true
};

var conPool = mysql.createPool(poolConfig);

const dao = new eventDao(conPool);

beforeAll(done => {
  run("src/tests/createTestDB.sql", conPool, () => {
    run("src/tests/createTestData.sql", conPool, done);
  });
});

afterAll(() => {
  conPool.end();
});

//This is a test test
test("Test zero equal to zero", done => {
  expect(0).toBe(0);
  done();
});

test("Test zero NOT equal to one", done => {
  expect(0).not.toBe(1);
  done();
});

test("Get all events", done => {
  dao.getAllEvents((status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    done();
  });
});

test("Get all events with offset 0", done => {
  dao.getAllEventsWithOffset(0, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    done();
  });
});

test("Get all events with offset 1", done => {
  dao.getAllEventsWithOffset(1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  });
});

test("Get count of all events not cancelled and not finished", done => {
  dao.getCountOfAllEventsNotCancelledNotFinished((status, data) => {
    expect(status).toBe(200);
    expect(data[0].count).toBe(2);
    done();
  });
});

// Expected 1000 capacity for event with eventId = 1
test("Get event by id", done => {
  dao.getEvent(1, (status, data) => {
    expect(status).toBe(200);
    expect(data[0].organizer).toBe(2);
    expect(data[0].capacity).toBe(1000);
    done();
  });
});

test("Get events by address", done => {
  dao.getEventsByAddress("Elgseter Gate 1", (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data[0].organizer).toBe(1);
    expect(data[0].capacity).toBe(300);
    done();
  });
});

test("Get events by status", done => {
  dao.getEventsByStatus(0, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    done();
  });
});

test("Get events by organizer", done => {
  dao.getEventsByOrganizer(2, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  });
});

test("Get events by category with offset 0", done => {
  dao.getEventsByCategoryWithOffset("festival", 0, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    done();
  });
});

test("Get events by category with offset 1", done => {
  dao.getEventsByCategoryWithOffset("festival", 1, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(0);
    done();
  });
});

test("Get count of events by category not cancelled and not finished", done => {
  dao.getCountOfEventsByCategoryNotCancelledNotFinished(
    "konsert",
    (status, data) => {
      expect(status).toBe(200);
      expect(data[0].count).toBe(1);
      done();
    }
  );
});

test("Add new event", done => {
  let event = {
    event_id: 3,
    organizer: 2,
    name: "Awesome konsert!",
    address: "Fantasiveien 3",
    from_date: "2020-01-07 15:00:00",
    to_date: "2020-01-07 20:00:00",
    capacity: 10,
    status: 0,
    information: "Veldig bra konsert",
    category: "concert",
    picture: "x'12B"
  };
  dao.addEvent(event, (status, data) => {
    expect(status).toBe(200);
    expect(data.insertId).toBe(3);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Add user to new event", done => {
  dao.addUserToEvent(3, 3, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Get all events for user", done => {
  dao.getEventsOfUser(3, (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(2);
    expect(data.map(e => e.event_id)).toContain(1);
    expect(data.map(e => e.event_id)).toContain(3);
    done();
  });
});

test("Get users by type in event", done => {
  dao.getUsersOfEventByType(3, "artist", (status, data) => {
    expect(status).toBe(200);
    expect(data.length).toBe(1);
    expect(data.map(e => e.user_id)).toContain(3);
    done();
  });
});

test("Delete user from event", done => {
  dao.deleteUserFromEvent(3, 3, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

test("Update event", done => {
  let event = {
    event_id: 3,
    organizer: 2,
    name: "Awesome konsert!",
    address: "Fantasiveien 3",
    from_date: "2020-01-07 15:00:00",
    to_date: "2020-01-07 20:00:00",
    capacity: 100,
    status: 0,
    information: "Veldig bra konsert",
    category: "concert",
    picture: "x'12B"
  };
  //Actual change
  dao.updateEvent(3, event, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    expect(data.changedRows).toBe(1);

    //No change
    dao.updateEvent(3, event, (status, data) => {
      expect(status).toBe(200);
      expect(data.affectedRows).toBe(1);
      expect(data.changedRows).toBe(0);
      done();
    });
  });
});

test("Delete an event", done => {
  dao.deleteEvent(3, (status, data) => {
    expect(status).toBe(200);
    expect(data.affectedRows).toBe(1);
    done();
  });
});

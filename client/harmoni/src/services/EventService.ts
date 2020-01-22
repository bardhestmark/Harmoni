import axios from "axios";
import Service, { updateToken } from "./Service";

interface Event {
  eventId: number;
  name: string;
  organizer: number;
  address: string;
  from_date: string;
  to_date: string;
  capacity: number;
  status: number;
}

class EventService extends Service {
  getEventById(eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getAllEvents() {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getAllEventsWithOffset(offset: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/offset/" + offset,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getCountOfAllEventsNotCancelledNotFinished() {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/count/all",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getEventsByLocation(location: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/address/" + location,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getEventsByStatus(status: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/status/" + status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Gets events to an organizer by id
  getEventsByOrganizer(userId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/organizer/" + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getEventsByCategoryWithOffset(category: string, offset: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/category/offset/" + category + "/" + offset,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getCountOfEventsByCategoryNotCancelledNotFinished(category: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/count/category/" + category,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  addEvent(event: Event) {
    updateToken();
    return axios({
      method: "post",
      url: this.path + "/authorized/events/",
      data: event,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  updateEvent(event: Event) {
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/events/" + event.eventId,
      data: event,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getEventsByUser(userId: number) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/user/" + userId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  getEventsByCategory(category: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/category/" + category,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  addUserToEvent(userId: number, eventId: number) {
    updateToken();
    return axios({
      method: "post",
      url:
        this.path + "/authorized/events/user_event/" + userId + "/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  getUserOfEvent(userId: number, eventId: number) {
    updateToken();
    return axios({
      method: "get",
      url:
        this.path + "/authorized/events/user_event/" + userId + "/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  removeUserFromEvent(userId: number, eventId: number) {
    updateToken();
    return axios({
      method: "delete",
      url:
        this.path + "/authorized/events/user_event/" + userId + "/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  // Delete events by eventId
  deleteEventById(eventId: number) {
    updateToken();
    return axios({
      method: "delete",
      url: this.path + "/authorized/events/" + eventId,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
  getUsersOfEventByType(eventId: number, type: string) {
    updateToken();
    return axios({
      method: "get",
      url: this.path + "/events/user/" + eventId + "/" + type,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }

  //User have to be logged in to use this function
  changeStatusOfEvent(eventId: number, newStatus: number) {
    updateToken();
    return axios({
      method: "put",
      url: this.path + "/authorized/events/" + eventId + "/" + newStatus,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "harmoni-token": localStorage.getItem("harmoni-token")
      }
    })
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export let eventService = new EventService();

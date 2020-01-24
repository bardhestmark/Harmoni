import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ProfilePageImage from "../Profile/profilePageImage";
import ProfileOptions from "../Profile/profileOptions";
import EventGrid from "../eventGrid";
import { eventService } from "../../services/EventService";
import EventCalendar from "../eventCalendar";

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 100px auto;
`;

const AddBtn = styled(props => <Link {...props} />)`
    display: grid;
    grid-template-columns: 30% 1fr;
    justify-items: start;
    align-items: center;
    width: 220px;
    height: 60px;
    background-color: #73CF5C;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: white;
    font-size: 16px;
    font-weight: 500;
    border none;
    margin: 0;
    margin-top: 100px;
    cursor: pointer;
    border-radius: 50px;
    text-align: center;
    outline: none;
    
    :hover {
        filter: brightness(95%);
        text-decoration: none;
        color: white;
    }
    :active {
        box-shadow: none;
    }
`;

const CalenderWrapper = styled.div`
  width: 80%;
  margin: 30px auto;
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 36px;
  margin: 70px 20px;
  width: 60%;
  max-width: 100%;

  ::first-letter {
    text-transform: uppercase;
  }
`;

const BtnIcon = styled.img`
  height: 40%;
  filter: invert(100%);
  justify-self: center;
`;

const Profile = (props: { userData: any }) => {
  const [events, setEvents] = useState();
  const [eventsParticipant, setEventsParticipant] = useState();

  useEffect(() => {
    const getEvents = async () => {
      if (props.userData) {
        // User is an organizer
        if (props.userData.type === "organizer")
          setEvents(
            await eventService.getEventsByOrganizer(props.userData.user_id)
          );
        // User is artist/manager or volunteer
        else
          setEvents(await eventService.getEventsByUser(props.userData.user_id));
      }
    };
    const getEventsVolunteers= async ()=>{
        setEventsParticipant(
            await eventService.getEventsByUser(props.userData.user_id)
        );
    };
    getEvents();
    getEventsVolunteers();
  }, [props.userData]);
  return (
    <>
      <Wrapper>
        <ProfileOptions />

        <ProfilePageImage
          picture={
            props.userData.picture
              ? new Buffer(props.userData.picture, "base64").toString("ascii")
              : ""
          }
          name={props.userData.name}
          type={props.userData.type}
        />

        {props.userData.type === "organizer" ? (
          <AddBtn to="/newEvent">
            <BtnIcon src="/icons/plus-1.svg" />
            Nytt arrangement
          </AddBtn>
        ) : (
          <></>
        )}
      </Wrapper>
        {props.userData.type==="volunteer" ||props.userData.type==="artist"?(
            <EventGrid
                eventInProfile={true}
                emptyText="Du har ingen arrangementer som du er medlem i"
                data={eventsParticipant && eventsParticipant.filter(e => e.status === 0)}
                title="Arrangementer der du er medlem"
            />
        ):(
            <></>
        )}
        {props.userData.type === "organizer" ? (
            <EventGrid
                eventInProfile={true}
                emptyText="Du har ingen kommende arrangementer"
                data={events && events.filter(e => e.status === 0)}
                title="Mine arrangementer"
            />
            ):(
            <></>
        )}


      <EventGrid
        eventInProfile={true}
        emptyText="Du har ingen arkiverte arrangementer"
        data={events && events.filter(e => e.status === 1)}
        title="Arkiverte arrangementer"
      />

      <CalenderWrapper>
        <Title>Kalender</Title>
          {props.userData.type === "organizer"?(
              <EventCalendar data={events && events.filter(e => e.status === 0)} />
          ):(
              <></>
          )}
          {props.userData.type==="volunteer"||props.userData.type==="artist"? (
              <EventCalendar data={eventsParticipant && eventsParticipant.filter(e => e.status === 0)} />
          ):(
              <></>
          )}

      </CalenderWrapper>
    </>
  );
};
export default Profile;

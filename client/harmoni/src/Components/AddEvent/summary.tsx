/**
 * Show a brief summary/overview of an event.
 * Intended to only be seen by users participating in the event.
 *
 *
 */

import React from "react";
import styled from "styled-components";
import ArtistList from "../Event/artistsList";
import TicketCard from "./EventForms/ticketCard";
import ListGroup from "react-bootstrap/ListGroup";
import moment from "moment";
import AttachmentList from "../Event/attachmentList";

const Wrapper = styled.div`
  margin-bottom: 80px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 5px;
`;

const ImgPlaceHolder = styled.img`
  height: 50%;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
`;

const UnderTitle = styled.h3`
  font-size: 20px;
  margin-top: 50px;

  font-weight: 500;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #777777;
  margin-top: 10px;
`;

// Format the date into a suitable and readable string
const formatDate = (date: any) => {
  if (typeof date === "string")
    date = moment(date, "DD-MM-YYYY HH:mm").toDate();

  let days = [
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
    "Søndag"
  ];

  let months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  return (
    days[date.getDay()] +
    " " +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    ". " +
    months[date.getMonth()].toLocaleLowerCase() +
    " " +
    date.getFullYear() +
    " kl: " +
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
};

interface IProps {
  name: string;
  img: any;
  category: string;
  location: string;
  fromDate: string | Date;
  toDate: string | Date;
  program: string;
  artists: any[];
  tickets: any[];
  attachments;
  userRights;
  riders: any[];
  readOnly?: boolean;
  eventId?: number;
  userData?: any;
  volunteers?: any;
}

const Summary = (props: IProps) => {
  let ticketsArr: JSX.Element[] = [];

  // Add all tickets to array for render
  for (let i = 0; i < props.tickets.length; i++) {
    ticketsArr.push(<TicketCard ticket={props.tickets[i]} key={i} />);
  }

  return (
    <Wrapper>
      <Title>Oppsummering</Title>

      {/* Name of event */}
      <UnderTitle>Navn på arrangement:</UnderTitle>
      <Text>{props.name || "Navn er ikke oppgitt"}</Text>

      {/* Picture preview */}
      <UnderTitle>Bilde</UnderTitle>
      <ImgWrapper>
        {props.img ? (
          <ImagePreview src={props.img} />
        ) : (
          <ImgPlaceHolder src="/icons/imagePlaceholder.svg" />
        )}
      </ImgWrapper>

      {/* Category */}
      <UnderTitle>Kategori:</UnderTitle>
      <Text>{props.category || "Kategori ikke valgt"}</Text>

      {/* Location */}
      <UnderTitle>Lokasjon:</UnderTitle>
      <Text>{props.location || "Lokasjon er ikke oppgitt"}</Text>

      {/* Date and time */}
      <UnderTitle>Dato og tid:</UnderTitle>
      {props.fromDate === null || props.toDate === null ? (
        <Text>"Dato og tid er ikke oppgitt" </Text>
      ) : (
        <>
          <Text>{"Fra: " + formatDate(props.fromDate)}</Text>
          <Text>{"Til: " + formatDate(props.toDate)}</Text>
        </>
      )}

      {/* Artists */}
      <UnderTitle>Artister:</UnderTitle>
      {!props.artists || props.artists.length === 0 ? (
        <Text>Ingen artister er valgt</Text>
      ) : (
        <ArtistList
          hideTitle={true}
          artists={props.artists}
          riderData={props.riders}
          readOnly={true}
          eventId={props.eventId}
          userData={props.userData}
        />
      )}

      {/* Tickets */}
      <UnderTitle>Billetter:</UnderTitle>
      {!props.tickets || props.tickets.length === 0 ? (
        <Text>Ingen billetter er opprettet</Text>
      ) : (
        <ListGroup>{ticketsArr}</ListGroup>
      )}

      {/* Attachments */}
      <UnderTitle>Vedlegg:</UnderTitle>
      {!props.attachments || props.attachments.length === 0 ? (
        <Text>Ingen vedlegg er lagt til</Text>
      ) : (
        <div>
          <AttachmentList
            attachments={props.attachments}
            userRights={props.userRights}
            artists={props.artists}
            readOnly={props.readOnly}
          ></AttachmentList>
        </div>
      )}

      <UnderTitle>Frivillige</UnderTitle>
      {!props.volunteers || props.volunteers.length === 0 ? (
        <Text>Ingen frivillige lagt til enda</Text>
      ) : (
        <ArtistList
          hideTitle={true}
          artists={props.volunteers}
          readOnly={true}
        />
      )}
    </Wrapper>
  );
};

export default Summary;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FaCheckCircle } from "react-icons/fa";

import { ticketService } from "../../services/TicketService";

import TicketBar from "./ticketBar";
import TicketSummary from "./ticketSummary";
import Button from "../Button/button";
import InfoDialog from "../infoDialog";

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}

const TotalSumText = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const TotalSumValueText = styled.label`
  color: #47bd29;
`;

const BuyButtonWrapper = styled.div`
  width: 35%;
  margin: 20px auto;
`;

const NoTicketsAvailableText = styled.p`
  margin: 20px auto;
  font-size: 20px;
`;

let checkCircleStyle = {
  fontSize: 120,
  color: "#82c91e",
  marginTop: 50,
  marginBottom: 20
};

// Menu with one ticketbar for each ticket
// Contains the button to buy the selected tickets
const TicketMenu = (props: { tickets: ITicket[]; canceled: boolean }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState(
    new Array(props.tickets.length).fill(0)
  );
  const [displayDialog, setDisplayDialog] = useState(false);

  const incrementQuantityOfTicket = (index: number, num: number) => {
    setQuantities(
      quantities.map((val, i) => (i === index ? Math.max(val + num, 0) : val))
    );
  };

  useEffect(() => {
    setTotalPrice(
      props.tickets.reduce(
        (sum, ticket, i) => sum + ticket.price * quantities[i],
        0
      )
    );
  }, [props.tickets, quantities]);

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const buyTickets = () => {
    setDisplayDialog(true);
    props.tickets.map((ticket, i) =>
      quantities[i] > 0
        ? ticketService.decreaseAvailableOfTicket(
            ticket.ticket_id,
            quantities[i]
          )
        : ""
    );
    setQuantities(quantities.map(q => 0));
  };

  const getTotalTickets = () => {
    return quantities.length > 0
      ? quantities.reduce((sum, val) => sum + val)
      : 0;
  };

  return (
    <div>
      <h3>Billetter</h3>
      {props.tickets.length > 0 ? (
        <>
          {props.tickets.map((ticket, index) => (
            <TicketBar
              quantities={quantities}
              ticketIndex={index}
              type={ticket.type}
              price={ticket.price}
              incrementFunction={incrementQuantityOfTicket}
              unavailable={ticket.available <= 0}
              eventCanceled={props.canceled}
              key={ticket.type}
            />
          ))}
          {getTotalTickets() > 0 ? (
            <>
              <TicketSummary
                tickets={props.tickets}
                quantities={quantities}
                totalPrice={totalPrice}
              />
              <TotalSumText>
                Total pris:{" "}
                <TotalSumValueText>{totalPrice + ",-"}</TotalSumValueText>
              </TotalSumText>
            </>
          ) : (
            <></>
          )}

          <BuyButtonWrapper>
            <Button
              backgroundColor={getTotalTickets() > 0 ? "#47BD29" : "grey"}
              dropShadow={true}
              onClick={buyTickets}
              disabled={!(getTotalTickets() > 0)}
            >
              Kjøp
            </Button>
          </BuyButtonWrapper>
          {displayDialog && (
            <InfoDialog width="300px" height="270px" closeDialog={closeDialog}>
              <FaCheckCircle style={checkCircleStyle} />
              <Button onClick={closeDialog}>Tilbake</Button>
            </InfoDialog>
          )}
        </>
      ) : (
        <NoTicketsAvailableText>
          Ingen billetter er tilgjengelig
        </NoTicketsAvailableText>
      )}
    </div>
  );
};

export default TicketMenu;

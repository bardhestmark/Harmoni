/**
 * Ticket card component used to display ticket info
 */

import React from "react";
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 10%;
  align-items: center;
  justify-items: center;
  padding: 10px;
`;

const Name = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 0 15px;
  justify-self: start;
`;

const Text = styled.p`
  font-size: 16px;
  margin: 0 0 0 15px;
  justify-self: start;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 12px;
`;

interface IProps {
  ticket: any;
  remove?: Function;
  disabled?: boolean;
}

const TicketCard = (props: IProps) => (
  <ListGroup.Item>
    <Wrapper>
      <Name>{props.ticket.type}</Name>
      <Text>{props.ticket.price}kr</Text>
      <Text>{props.ticket.available} stk</Text>

      {props.remove && !props.disabled && (
        <DelBtn
          src="/icons/cross.svg"
          onClick={() => props.remove(props.ticket)}
        />
      )}
    </Wrapper>
  </ListGroup.Item>
);

export default TicketCard;

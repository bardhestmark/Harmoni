import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ListGroup } from 'react-bootstrap';
import TicketCard from './ticketCard';
import Btn from '../../Button/button';

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 15px;
`;
const UnderTitle = styled.h3`
  font-size: 24px;
  margin: 50px 0 20px 0;
`;
const inputStyle = {
  width: '100%',
  marginBottom: '25px'
};

const Text = styled.p`
  margin: 45px 0;
  font-size: 16px;
  font-weight: 400;
  color: #777777;
`;

interface ITicket {
  ticket_id: number;
  event_id: number;
  price: number;
  type: string;
  available: number;
}
var tempId = 1;
const TicketForm = (props: any) => {
  const [type, setType] = useState('');
  const [price, setPrice] = useState();
  const [available, setAvailable] = useState();

  function handleChange(newInt: any, setFunc: Function) {
    if (newInt < 0) setFunc(0);
    else setFunc(newInt);
  }

  const addTicket = () => {
    let s: ITicket = {
      ticket_id: tempId,
      event_id: tempId,
      price: -1,
      type: '',
      available: -1
    };

    if (s !== null) {
      tempId = tempId + 1;
      s.type = type;
      s.price = price;
      s.available = available;
      props.setListOfTickets(array => [...array, s]);
    }
    setType('');
    setPrice('');
    setAvailable('');
  };

  const deleteTicket = ticket => {
    if (ticket != null) {
      props.setListOfTickets(
        props.listOfTickets.filter(u => u.ticket_id !== ticket.ticket_id)
      );
    }
  };

  return (
    <>
      <Title>Billetter</Title>
      <Text>
        Du kan legge til og endre billetter senere ved å redigere arrangementet
        i min side.
      </Text>

      <h5>Billett-type</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="(Sitteplass, ståplass, VIP, etc.)"
        value={type}
        helperText="Maks 45 karakterer"
        onChange={e =>
          e.target.value.length <= 45
            ? handleChange(e.target.value, setType)
            : null
        }
      />

      <h5>Pris per billett</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        placeholder="Pris for kategori"
        value={price}
        onChange={e =>
          e.target.value === ''
            ? handleChange(e.target.value, setPrice)
            : Number.parseInt(e.target.value) <= 2147483647
            ? handleChange(e.target.value, setPrice)
            : null
        }
      />

      <h5>Total antall</h5>
      <TextField
        style={inputStyle}
        variant="outlined"
        type="number"
        placeholder="Antall tilgjengelige plasser i kategori"
        value={available}
        onChange={e =>
          e.target.value === ''
            ? handleChange(e.target.value, setAvailable)
            : Number.parseInt(e.target.value) <= 2147483647
            ? handleChange(e.target.value, setAvailable)
            : null
        }
      />

      <Btn onClick={() => addTicket()}>Legg til</Btn>

      {props.listOfTickets && props.listOfTickets.length !== 0 && (
        <UnderTitle>Billettliste:</UnderTitle>
      )}

      <ListGroup>
        {props.listOfTickets &&
          props.listOfTickets.map(u => (
            <TicketCard ticket={u} remove={deleteTicket} />
          ))}
      </ListGroup>
    </>
  );
};

export default TicketForm;

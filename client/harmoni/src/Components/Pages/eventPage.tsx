import React, { useState } from 'react';
import styled from 'styled-components';

import TicketBar from '../Event/TicketBar';

let data = {
  id: 1234,
  category: 'Konsert',
  title: 'Rihanna i Oslo Spektrum',
  summary:
    'Kom og se rihanna live i Januar 2020. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris nunc congue nisi vitae suscipit tellus mauris a. Aliquet sagittis id consectetur purus. Nulla pharetra diam sit amet nisl suscipit. Iaculis eu non diam phasellus vestibulum lorem',
  img: '/icons/test.jpg'
};

let tickets = [
  {
    name: 'Premium VIP Circle',
    price: 19000
  },
  {
    name: 'Meet & Greet & Hamburger',
    price: 2000
  },
  {
    name: 'Ståplass',
    price: 10
  }
];

const Wrapper = styled.div`
  justify-content: center;
  display: grid;
`;

const EventImage = styled.img`
  border-radius: 10px;
  height: 60vh;
  object-fit: cover;
`;

const DoubleColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const DateText = styled.p`
  color: grey;
`;

const AddressText = styled.p`
  color: grey;
`;

const Title = styled.h1``;

const ContentText = styled.p`
  font-size: 20px;
  width: 50vw;
  color: #535353;
`;

const Event = (props: any) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <Wrapper>
      <EventImage src="https://i.imgur.com/Glo8oxy.jpg"></EventImage>
      <DoubleColumnGrid>
        <DateText>Mandag, 10.februar 2020, 20:00</DateText>
        <AddressText>Oslo Spektrum</AddressText>
      </DoubleColumnGrid>
      <Title>Jahn Teigen sine siste hits</Title>
      <ContentText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Mauris nunc congue
        nisi vitae suscipit tellus mauris a. Aliquet sagittis id consectetur
        purus. Nulla pharetra diam sit amet nisl suscipit. Iaculis eu non diam
        phasellus vestibulum lorem
      </ContentText>
      <h3>Billetter</h3>
      {tickets.map(ticket => (
        <TicketBar name={ticket.name} price={ticket.price} />
      ))}
    </Wrapper>
  );
};

export default Event;

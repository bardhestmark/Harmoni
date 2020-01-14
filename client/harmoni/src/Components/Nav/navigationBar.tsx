import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import OutlineButton from "../Button/outlineButton";
import LoginBtn from "../Button/loginBtn";
import SmallProfileNav from "../Profile/smallProfileNav";
import { LinkContainer } from "react-router-bootstrap";

const StyledLink = styled(props => <Link {...props} />)`
  color: #7f7f7f;
  text-decoration: none;

  :visited {
    color: #7f7f7f;
  }

  :hover {
    text-decoration: none;
  }
  margin: 0;
  margin-right: 20px;
`;

const Icon = styled.img`
  height: 25px;
  margin-right: 20px;
  margin: 30px 20px 30px 0;
`;

const LinkWrapper = styled.div`
  margin: 10px 0;
`;

const NavigationBar = (props: any) => (
  <Navbar
    bg="white"
    expand="lg"
    sticky="top"
    style={{ boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.25)" }}
  >
    <Navbar.Brand>
      <Link to="/">
        <img
          src="/icons/icon.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          style={{ margin: "25px" }}
          onClick={() => handleIconClick("/")}
        />
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkWrapper>
          <LinkContainer to="/events/konsert">
            <Nav.Link>Konsert</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          <LinkContainer to="/events/teater">
            <Nav.Link>Teater</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          <LinkContainer to="/events/standup">
            <Nav.Link>Standup</Nav.Link>
          </LinkContainer>
        </LinkWrapper>

        <LinkWrapper>
          <NavDropdown title="Annet" id="basic-nav-dropdown">
            <LinkContainer to="/events/festival">
              <NavDropdown.Item>Festival</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/events/show">
              <NavDropdown.Item>Show</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/events/annet">
              <NavDropdown.Item>Annet</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </LinkWrapper>
      </Nav>

      <StyledLink to="/search">
        <Icon src="/icons/search.svg" />
      </StyledLink>

      {props.userData ? (
        <>
          <SmallProfileNav
            picture={props.userData.picture}
            name={props.userData.name}
          />
          <OutlineButton onClick={() => props.logOut()}>Logg ut</OutlineButton>
        </>
      ) : (
        <>
          <OutlineButton to="/registrer">Registrer</OutlineButton>
          <LoginBtn logIn={props.logIn} />
        </>
      )}
    </Navbar.Collapse>
  </Navbar>
);

const handleIconClick = (path: any) => {
  //Smooth scroll to top if already on the home page
  if (window.location.pathname === path)
    window.scrollTo({ top: 0, behavior: "smooth" });
  else window.scrollTo(0, 0);
};

export default NavigationBar;

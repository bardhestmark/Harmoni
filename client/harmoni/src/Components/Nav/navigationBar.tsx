import React from 'react'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from '../Button/button';
import LoginBtn from '../Button/loginBtn';

const NavigationBar = (props:any) => (
    <Navbar bg="light" expand="lg" sticky='top'>
    <Navbar.Brand href="#home">
      <img
          src="/icons/icon.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Konsert</Nav.Link>
        <Nav.Link href="#link">Teater</Nav.Link>
        <Nav.Link href="#link">Standup</Nav.Link>
        <NavDropdown title="Annet" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>

      {props.isLoggedIn 
        ? (<Button>Logg ut</Button>)
        : (<>
            <Button>Reigstrer</Button> 
            <LoginBtn />
          </>)
      }
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
    </Navbar.Collapse>

  </Navbar>
);

export default NavigationBar;
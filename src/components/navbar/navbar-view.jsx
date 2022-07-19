import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Navbar, Container, Nav } from 'react-bootstrap';

export function Navbar() {
    let user = localStorage.getItem('user');

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    const isAuth = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } else {
            return false;
        }
    };
                    //test out sticky to see if header stays at top
    
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to={"/"} href="#home">MyFlix-App</Navbar.Brand>

          <Nav className="me-auto navbar-elements__style">

            {isAuth() && (
              <Nav.Link as={Link} to={`/`}>Movies</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
            )}


          </Nav>

        </Container>
      </Navbar>
    </Container>

  )
}
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Navbar, Container, Nav } from 'react-bootstrap';
//import e from 'express';

export function Menubar() {
    let user = localStorage.getItem('user');

    const handleLogOut = () => {
      //e.preventDefault();
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
        <>
      <Navbar className="main-nav" sticky="top" bg="dark" expand="xl" variant="dark">
      <Container>
      <Navbar.Brand href="/">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {isAuth() && (
                <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
              )}
              {isAuth() && (
                <Button variant="link" onClick={handleLogOut}>Logout</Button>
              )}
              {!isAuth() && (
                <Nav.Link href="/">Login</Nav.Link>
              )}
              {!isAuth() && (
                <Nav.Link href="/register">Register</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
  )
  }
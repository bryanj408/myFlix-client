import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { PromiseProvider } from 'mongoose';

export function Menubar() {
    let user = localStorage.getItem('user');

    const handleLougOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.open('/', '_self');
        PromiseProvider.onLoggedOut(user);
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
        <Navbar className='main-view' sticky='top' bg='dark' expand='lg' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>Movies</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                        <Navbar.Collapse id='responsive-navbar-nav' />
        <Nav className='ml-auto'>
            {isAuth() && (
                <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
            )}
            {isAuth() && (
                <Button variant='link' onClick={handleLogOut}>Logout</Button>
            )}
            {!isAuth() && (
                <Nav.Link href='/'>Login</Nav.Link>
            )}
            {!isAuth() && (
                <Nav.Link href='/register'>Register</Nav.Link>
            )}
            </Nav>
            </Container>
        </Navbar>
        </>
    )
}
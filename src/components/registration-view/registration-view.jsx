import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';



export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflixnetflix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
    })
       .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');   // the second argument '_self' is necessary so that the page will open in the current tab
       })
       .catch(e => {
        console.log('error registering the user');
        alert('Something wasn\'t entered correctly');
       });
    };
    

   return (

    <Container>
        <Row>
            <Col>
                <CardGroup>
                         <Card>
                            <Card.Body>
                            <Card.Title>Registration Page</Card.Title>
                         <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        required 
                        placeholder="Enter a username"
                        />
                </Form.Group>

                <Form.Group>
                <Form.Label>Password:</Form.Label>
                        <Form.Control 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        placeholder="Your password must be 8 or more characters"
                        minLength="8"
                        />
                </Form.Group>

                <Form.Group>
                <Form.Label>Email:</Form.Label>
                        <Form.Control 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        placeholder="Enter your email address"
                        />
                </Form.Group>

                <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                        <Form.Control 
                        type="birthdate" 
                        value={birthday} 
                        onChange={e => setBirthday(e.target.value)} 
                        required 
                        placeholder="Enter your birthday"
                        />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
                            </Card.Body>
                           
                         </Card>
                </CardGroup>
            
            </Col>
        </Row>
    </Container>
   );
}

//Just added
RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired
};
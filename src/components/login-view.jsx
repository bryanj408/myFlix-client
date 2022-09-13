import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> gh-pages


//Took out export function... to match code in book. add in '}' at end of login-view if returning from commented out
  export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //Declare a hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters or more long');
      isReq = false;
    }
    if(!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters or more long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
    //sends a request to the server for authentication
    axios.post('https://myflixnetflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
  };

<<<<<<< HEAD
  return (
    <Form className="login-form__style">
      <Form.Group className="mb-3 form-group" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button variant="warning" type="submit" onClick={handleSubmit}>
        Log In
      </Button>
    </Form>
  );
=======
return (
    <Form>
        <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
    );
>>>>>>> gh-pages
}


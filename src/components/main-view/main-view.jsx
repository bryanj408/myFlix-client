//NOTES
//Registration does not work but loggin in with real user does. commented out ln 69 !register until later.

import React from 'react';
import axios from 'axios'; //allows us to use ajax to import our api
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Row, Col, Container } from 'react-bootstrap';
import { response } from 'express';


export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          register: null
        };
      }
    
      componentDidMount(){
        axios.get('https://myflixnetflix.herokuapp.com/movies')

            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
      }

      /*When a movie is clicked, this function is invoked and updates the state of the 
      `selectedMovie` *property to that movie*/

      setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
      }

      //Added auth to store data in the user's browsers so they don't have to log in again.
      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      onRegistration(register) {
        this.setState({
            register,
        });
      }

      getMovies(token) {
        axios.get('https://myflixnetflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`} //There should be no space in front of “Bearer” or after “...token}”. Otherwise, you'll get an error.
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
      }

      render() {
        const { movies, selectedMovie, user, register } = this.state;

           /* If there is no user, the LoginView is rendered. 
           If there is a user logged in, the user details are 
           *passed as a prop to the LoginView*/

        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; 

        //if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

        //before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;
    
        return (
            <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                )
                : movies.map(movie => (
                  <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                ))
              }
            </Row>
          );
            }
        }

//add more proptypes (requirements from your api) as you build the user experience.
MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };

  //export default MainView;
import React from 'react';
import axios from 'axios'; //allows us to use ajax to import our api
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null
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

      onLoggedIn(user) {
        this.setState({
            user
        });
      }

      onRegistration(register) {
        this.setState({
            register,
        })
      }

      render() {
        const { movies, selectedMovie, user } = this.state;

           /* If there is no user, the LoginView is rendered. 
           If there is a user logged in, the user details are 
           *passed as a prop to the LoginView*/

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    
        //before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              ))
            }
          </div>
        );
      }
    
    }


//This is in place of { MainView } with curly braces in index.jsx.
export default MainView;


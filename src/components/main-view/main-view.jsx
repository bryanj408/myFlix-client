// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import { setMovies, setUser } from '../../actions/actions';

/* #1 The rest of components import statements but without the MovieCard's 
because it will be imported and used in the MoviesList component rather
than in here. 
*/

import { LoginView } from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Menubar } from '../navbar/navbar';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// #2 removed 'export' from MainView
class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      // #3
      //movies state removed from here
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixnetflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
      if (!this.state) return <>loading...</>
      const { movies, user } = this.state;
      // const { movies, user } = this.props;
      console.log('logged in: ', user);

      return (
          <Router>
              <Menubar user={user} />
              <Container >
                  <Row className="main-view justify-content-md-center">
                  
                      <Route exact path="/" render={() => {
                          if (!user && !localStorage.getItem('user')) return <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                          return <MoviesList movies={movies}/>
                      }} />
                  
                      <Route path="/register" render={() => {
                          if(user) {
                              <Redirect to="/" />
                          }
                          return (
                              <Col lg={8} md={8}>
                                  <RegistrationView />
                              </Col>
                          )
                      }} />
              
                      <Route path="/movies/:movieId" render={({ match, history }) => {
                          if (!user) return <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>

                          return <Col md={8}>
                              <MovieView user={this.state?.fullUser} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                          </Col>
                      }} />
              
                      <Route path="/directors/:name" render={( { match, history }) => {

                          if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

                          return ( 
                              <Col md={8} >
                                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name)?.Director} onBackClick={() => history.goBack()} />
                              </Col>
                          )
                      }} />
                  
                      <Route path="/genres/:name" render={({ match, history }) => {
                          if (!user) return <Col>
                              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                          </Col>
                          return <Col md={8}>
                              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)?.Genre} onBackClick={() => history.goBack()} />
                          </Col>
                      }} />
                  
                      <Route path={`/users/${user}`} render={({ history }) => {
                          return <Col>
                              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                          </Col>
                      }} />
                      
                  </Row>
              </Container>
          </Router>
      );
  }
}
// #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

const mapDispatchToProps = dispatch => {
  return {
      setUser: (user) => {
          dispatch(setUser(user))
      },
      setMovies: (movies) => {
          dispatch(setMovies(movies))
      }
  }
}

export default connect(mapStateToProps, { setMovies })(MainView);
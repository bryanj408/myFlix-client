export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const REMOVE_FAVMOVIE = 'REMOVE_FAVMOVIE';
export const ADD_FAVMOVIE = 'ADD_FAVMOVIE';
export const SET_USER = 'SET_USER';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(user) {
  return {
      type: SET_USER,
      user: user?.Username
  };
}

export function addFavMovie(value) {
  return {
      type: ADD_FAVMOVIE,
      value
  }
}

export function removeFavMovie(value) {
  return {
      type: REMOVE_FAVMOVIE,
      value
  };
}
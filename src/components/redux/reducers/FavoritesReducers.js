
import { SET_FAVORITE_SHOWS_LOCAL_STORAGE } from '../actions/FavoritesActions';

const initialState = {
  favoriteShows: [], // Initial state for favoriteShows
};

const FavoritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE_SHOWS_LOCAL_STORAGE:
      return {
        ...state,
        favoriteShows: action.payload, // Update favoriteShows with the data from local storage
      };
    default:
      return state;
  }
};

export default FavoritesReducers;

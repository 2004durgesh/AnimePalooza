import { configureStore } from '@reduxjs/toolkit';
import FavoritesReducers  from './reducers/FavoritesReducers';
// store.js
const Store = configureStore({
  reducer: {
    favoriteShows: FavoritesReducers,
  },
});

export default Store;


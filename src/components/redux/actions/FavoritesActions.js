
export const SET_FAVORITE_SHOWS_LOCAL_STORAGE = 'SET_FAVORITE_SHOWS_LOCAL_STORAGE';

export const setFavoriteShowsLocalStorage = (favoriteShowsArray) => ({
  type: SET_FAVORITE_SHOWS_LOCAL_STORAGE,
  payload: favoriteShowsArray,
});

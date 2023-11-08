// In AnimeFavorites.js
import FavoriteList from './FavoriteList';

const AnimeFavorites = ({ navigation }) => {
  return <FavoriteList navigation={navigation} favoriteType="anime" />;
};


const MoviesFavorites = ({ navigation }) => {
  return <FavoriteList navigation={navigation} favoriteType="movies" />;
};

const MangaFavorites = ({ navigation }) => {
  return <FavoriteList navigation={navigation} favoriteType="manga" />;
};

export {AnimeFavorites,MoviesFavorites,MangaFavorites} ;

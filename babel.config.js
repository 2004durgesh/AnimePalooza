<<<<<<< HEAD
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module:react-native-dotenv"]
    ,'react-native-reanimated/plugin'],
=======
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
>>>>>>> ce9f7fb7083a0007a46109cf2a859d954eacc4f3
};

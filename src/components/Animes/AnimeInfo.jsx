import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from "axios";
import tw from 'twrnc';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import GenresAndEpisodes from './GenresAndEpisodes';

const AnimeInfo = ({ route, navigation }) => {
  // Extracting 'id' from the 'route.params' or using an empty object if not available
  const { id } = route.params ?? {};

  // State variables to store anime data
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');
  const [genres, setGenres] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [animeUrl, setAnimeUrl] = useState('');
  const [showDescription, setShowDescription] = useState(false); // State to control the animation

  // API URL to fetch anime data
  const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      // Set anime data to state variables
      setImage(data.image);
      setTitle(data.title);
      setStatus(data.status);
      setDesc(data.description);
      setName(data.otherName);
      setAnimeUrl(data.url);
      setGenres(data.genres);
      setEpisodes(data.episodes);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Function to handle the icon click
  const handleIconClick = () => {
    // Toggle the description display state on icon click
    setShowDescription(!showDescription);
  };

  // Fetch data on component mount
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <ScrollView>
        <View style={tw`bg-black`}>
          {/* Top Image Section */}
          <ImageBackground source={{ uri: image }} style={tw`h-72`}>
            {/* Image Overlay */}
            <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']} style={{ height: '100%', width: '100%' }}>
              {/* Header with Back Button and Share Button */}
              <View style={tw`flex-1 flex-row justify-between`}>
                <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={tw`p-6`} onPress={() => { navigation.goBack() }} />
                <Ionicons name="share-social-outline" size={35} color="white" style={tw`p-6`} />
              </View>
              {/* Anime Details */}
              <View style={tw`flex flex-row mx-2`}>
                {/* Anime Image */}
                <Image source={{ uri: image }} style={tw`w-32 h-44 rounded-md`} />
                <View style={tw`px-4 flex-1`}>
                  {/* Anime Title */}
                  <Text style={tw`text-white text-xl font-md`} selectable={true}>{title}</Text>
                  {/* Status (Ongoing or Completed) */}
                  <View style={tw`flex-row items-center`}>
                    {status === 'Ongoing' ? (
                      <Feather name="clock" size={18} color="#D3D3D3" />
                    ) : (
                      <Ionicons name="checkmark-done" size={18} color="#D3D3D3" />
                    )}
                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{status}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
          {/* Anime Description and Other Names */}
          <View style={tw`mt-4`}>
            {/* Anime Description */}
            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify`]}>{desc}</Text>
            {/* Other Names */}
            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify`]}>Other name(s): {name}</Text>
          </View>
          <View style={tw`h-full`}>
            {/* Animated description view */}
            <MotiView
              from={{
                translateY: -220,
              }}
              animate={{
                translateY: showDescription ? 0 : -220,
              }}
              transition={{
                type: 'timing',
                duration: 500
              }}
              style={{ overflow: 'hidden', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            >
              <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']} style={{ height: '100%', width: '100%' }}>
                <TouchableOpacity onPress={handleIconClick}>
                  {/* Animated icon rotation */}
                  <MotiView
                    from={{
                      rotate: '180deg',
                    }}
                    animate={{
                      rotate: showDescription ? '180deg' : '0deg',
                    }}
                    transition={{
                      type: 'timing',
                      duration: 500
                    }}
                  >
                    <AntDesign name="down" size={24} color="white" style={tw`text-center pt-3`} />
                  </MotiView>
                </TouchableOpacity>
                {/* Render Genres and Episodes */}
                <GenresAndEpisodes genres={genres} episodes={episodes} />
              </LinearGradient>
            </MotiView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimeInfo;

import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView,Share } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { Fontisto, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import GenresAndEpisodes from './GenresAndEpisodes';

const MangaInfo = ({ route, navigation }) => {
  const { id, provider } = route.params ?? {};

  // State variables to store manga data
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState({});
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState([]);
  const [genres, setGenres] = useState([]);
  const [themes, setThemes] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [showDescription, setShowDescription] = useState(false); // State to control the animation

  const url = `https://consumet-api-pied.vercel.app/manga/${provider}/info/${id}`;

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setImage(data.image);
      setTitle(data.title);
      setDesc(data.description);
      setDate(data.releaseDate);
      setName(data.altTitles);
      setStatus(data.status);
      setGenres(data.genres);
      setThemes(data.themes);
      setChapters(data.chapters);
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
  

  //sharing
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this manga: ${title}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`bg-black`}>
          {/* Top Image Section */}
          <ImageBackground source={{ uri: image }} style={tw`h-96`}>
            {/* Image Overlay */}
            <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']} style={tw`h-full w-full`}>
              {/* Header with Back Button and Share Button */}
              <View style={tw`flex-row justify-between`}>
                <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={tw`m-6`} onPress={() => { navigation.goBack() }} />
                <Ionicons name="share-social-outline" size={35} color="white" style={tw`m-6`}  onPress={onShare}/>
              </View>
              {/* movies or series Details */}
              <View style={tw`flex flex-row mx-2`}>
                {/* movies or series Image */}
                <Image source={{ uri: image }} style={tw`w-32 h-44 rounded-md`} />
                <View style={tw`px-4 flex-1`}>
                  {/* movies or series Title */}
                  <Text style={tw`text-white text-xl font-md`} selectable={true}>{title}</Text>
                  {/* Release Year */}
                  <View style={tw`flex-row items-center`}>
                    <Fontisto name="date" size={18} color="#D3D3D3" />
                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{date}</Text>
                  </View>
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
          {/* movies or series Description and Other Names */}
          <View style={tw`mt-4`}>
            {/* Movie or series Description */}
            <Text style={tw`text-white text-lg p-2 pt-4 font-semibold`}>Description</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row`}>
              {Object.entries(desc).map(([lang, descText]) => (
                <View key={lang} style={tw`bg-gray-700 p-4 m-2 rounded-md w-72`}>
                  <Text selectable style={tw`text-white text-justify px-2`}>{descText}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Other Names */}
            <Text style={tw`text-white text-lg p-2 pt-4 font-semibold`}>Other Name(s):</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row mt-2`}>
              {name.map((nameObj, index) => {
                const languageCode = Object.keys(nameObj)[0];
                const title = nameObj[languageCode];
                return (
                  <View key={index} style={tw`bg-gray-700 p-2 m-1 rounded-md`}>
                    <Text selectable style={[tw`text-[#D3D3D3] leading-5 text-justify`]}>
                      {title}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={tw`h-full`}>
            {/* Animated description view */}
            <MotiView
              from={{ translateY: -220 }}
              animate={{ translateY: showDescription ? 0 : -220 }}
              transition={{ type: 'timing', duration: 500 }}
              style={{ overflow: 'hidden', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            >
              <LinearGradient colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']} style={{ height: '100%', width: '100%' }}>
                <TouchableOpacity onPress={handleIconClick}>
                  {/* Animated icon rotation */}
                  <MotiView
                    from={{ rotate: '180deg' }}
                    animate={{ rotate: showDescription ? '180deg' : '0deg' }}
                    transition={{ type: 'timing', duration: 500 }}
                  >
                    <AntDesign name="down" size={24} color="white" style={tw`text-center pt-3`} />
                  </MotiView>
                </TouchableOpacity>
                {/* Render Genres, Themes, and Chapters */}
                <GenresAndEpisodes genres={genres} themes={themes} chapters={chapters} provider={provider} />
              </LinearGradient>
            </MotiView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MangaInfo;

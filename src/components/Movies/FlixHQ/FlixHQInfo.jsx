import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Share } from 'react-native';
import axios from "axios";
import tw from 'twrnc';
import Config from "../../constants/env.config";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'react-native-linear-gradient';
import { MotiView } from 'moti';
import GenresAndEpisodes from "./GenresAndEpisodes";
import Recommendations from './Recommendations';
import ActivityLoader from '../../ActivityLoader';
import FavoritesButton from '../../FavoritesButton';

const FlixHQInfo = ({ route, navigation }) => {
    // Extracting 'id' from the 'route.params' or using an empty object if not available
    const { id } = route.params ?? {};

    // State variables to store movies or series data
    const [image, setImage] = useState('');
    const [flixhqUrl, setUrl] = useState('')
    const [type, setType] = useState(''); // Added type state
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [production, setProduction] = useState('');
    const [rating, setRating] = useState();
    const [genres, setGenres] = useState([]);
    const [casts, setCasts] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showDescription, setShowDescription] = useState(false); // State to control the animation
    const [isLoading, setIsLoading] = useState(true)
    // API URL to fetch movies or series data
    const url = `${Config.API_BASE_URL}/movies/flixhq/info?id=${id}`;

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const { data } = await axios.get(url,{
                headers:{'x-api-key': Config.API_KEY}
            });
            // Set movies or series data to state variables
            setImage(data.image);
            setUrl(data.url);
            setType(data.type); // Set type
            setTitle(data.title);
            setDesc(data.description);
            setDate(data.releaseDate);
            setRating(data.rating);
            setGenres(data.genres);
            setProduction(data.production);
            setCountry(data.country);
            setCasts(data.casts);
            setEpisodes(data.episodes);
            setRecommendations(data.recommendations);
            setIsLoading(false)
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
                message: `Check out this : ${title}\n\n${flixhqUrl}`,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            {isLoading ?
                <ActivityLoader />
                :
                <ScrollView style={tw`h-full`} showsVerticalScrollIndicator={false}>
                    <View style={tw`bg-black`}>
                        {/* Top Image Section */}
                        <ImageBackground source={{ uri: image }} style={tw`h-96`}>
                            {/* Image Overlay */}
                            <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']} style={{ height: '100%', width: '100%' }}>
                                {/* Header with Back Button and Share Button */}
                                <View style={tw`flex-row justify-between m-6`}>
                                    {/* Back Button */}
                                    <Ionicons name="arrow-back-circle-sharp" size={40} color="white" onPress={() => { navigation.goBack() }} />
                                    {/* Share Button */}
                                    <Ionicons name="share-social-outline" size={35} color="white" onPress={onShare} />
                                </View>
                                {/* movies or series Details */}
                                <View style={tw`flex flex-row mx-2`}>
                                    {/* movies or series Image */}
                                    <Image source={{ uri: image }} style={tw`w-32 h-44 rounded-md`} />
                                    <View style={tw`px-4 flex-1`}>
                                        {/* movies or series Title */}
                                        <Text style={tw`text-white text-xl font-md`} selectable={true}>{title}</Text>
                                        {/* Release Year and Rating */}
                                        <View>
                                            <View style={tw`flex-row items-center gap-4`}>
                                                {/* Release Date */}
                                                <View style={tw`flex-row items-center`}>
                                                    <Fontisto name="date" size={18} color="#D3D3D3" />
                                                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{date}</Text>
                                                </View>
                                                {/* Rating */}
                                                <View style={tw`flex-row items-center`}>
                                                    <AntDesign name="staro" size={24} color="#D3D3D3" />
                                                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{rating}</Text>
                                                </View>
                                            </View>
                                            {/* Country and Production */}
                                            <View style={tw``}>
                                                <View style={tw`flex-row items-center`}>
                                                    {/* Country */}
                                                    <Ionicons name="earth" size={24} color="#D3D3D3" />
                                                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{country}</Text>
                                                </View>
                                                <View style={tw`flex-row items-center`}>
                                                    {/* Production */}
                                                    <Ionicons name="film" size={24} color="#D3D3D3" />
                                                    <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{production}</Text>
                                                </View>
                                                <FavoritesButton type="movies" id={id} title={title} image={image}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                        {/* movies or series Description and Casts */}
                        <View style={tw`mt-4`}>
                            {/* Movie or series Description */}
                            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify mb-4`]}>Description: {desc}</Text>
                            {/* Casts */}
                            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify`]}>Cast(s): {casts.map((cast) => `${cast} ,  `)}</Text>
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
                                    {/* Render Recommendations */}
                                    <Recommendations recommendations={recommendations} />
                                    {/* Render Genres and Episodes */}
                                    <GenresAndEpisodes genres={genres} episodes={episodes} mediaId={id} type={type} />
                                </LinearGradient>
                            </MotiView>
                        </View>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    );
}

export default FlixHQInfo;

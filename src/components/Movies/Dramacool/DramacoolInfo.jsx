import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from "axios";
import tw from 'twrnc';
import { Fontisto, Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import Episodes from "./Episodes";

const DramacoolInfo = ({ route, navigation }) => {
    const { id } = route.params ?? {}; // Extracting 'id' from the 'route.params' or using an empty object if not available

    // State variables to store movies or series data
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [showDescription, setShowDescription] = useState(false); // State to control the animation

    // API URL to fetch movies or series data
    const url = `https://consumet-api-pied.vercel.app/movies/dramacool/info?id=${id}`;

    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            // Set movies or series data to state variables
            setImage(data.image);
            setTitle(data.title);
            setDesc(data.description);
            setDate(data.releaseDate);
            setName(data.otherNames);
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`bg-black`}>
                    {/* Top Image Section */}
                    <ImageBackground source={{ uri: image }} style={tw`h-96`}>
                        {/* Image Overlay */}
                        <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']} style={{ height: '100%', width: '100%' }}>
                            {/* Header with Back Button and Share Button */}
                            <View style={tw`flex-row justify-between`}>
                                <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={tw`m-6`} onPress={() => { navigation.goBack() }} />
                                <Ionicons name="share-social-outline" size={35} color="white" style={tw`m-6`} />
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
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                    {/* movies or series Description and Other Names */}
                    <View style={tw`mt-4`}>
                        {/* Movie or series Description */}
                        <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify mb-4`]}>Description: {desc}</Text>
                        {/* Other Names */}
                        <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify`]}>Other name(s): {name.map((name) => { return `${name} ,  ` })}</Text>
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
                                {/* Render Episodes */}
                                <Episodes episodes={episodes} mediaId={id} />
                            </LinearGradient>
                        </MotiView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DramacoolInfo
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Share, Alert } from 'react-native';
import axios from "axios";
import tw from 'twrnc';
import Config from "../../constants/env.config";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { MotiView } from 'moti';
import Episodes from "./Episodes";
import ActivityLoader from '../../ActivityLoader';
import FavoritesButton from '../../FavoritesButton';

const DramacoolInfo = ({ route, navigation }) => {
    const { id } = route.params ?? {};

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const url = `${Config.API_BASE_URL}/movies/dramacool/info?id=${id}`;

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url,{
                headers:{'x-api-key': Config.API_KEY}
            });
            setImage(data.image);
            setTitle(data.title);
            setDesc(data.description);
            setDate(data.releaseDate);
            setName(data.otherNames);
            setEpisodes(data.episodes);
            setIsLoading(false);
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    
    const handleIconClick = () => {
        setShowDescription(!showDescription);
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);


    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this: ${title} \n\n${episodes[0].url}`,
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={tw`bg-black`}>
                        <ImageBackground source={{ uri: image }} style={tw`h-96`}>
                            <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']} style={{ height: '100%', width: '100%' }}>
                                <View style={tw`flex-row justify-between m-6`}>
                                    <Ionicons name="arrow-back-circle-sharp" size={40} color="white" onPress={() => { navigation.goBack() }} />
                                    <Ionicons name="share-social-outline" size={35} color="white" onPress={onShare} />
                                </View>
                                <View style={tw`flex flex-row mx-2`}>
                                    <Image source={{ uri: image }} style={tw`w-32 h-44 rounded-md`} />
                                    <View style={tw`px-4 flex-1`}>
                                        <Text style={tw`text-white text-xl font-md`} selectable={true}>{title}</Text>
                                        <View style={tw`flex-row items-center`}>
                                            <Fontisto name="date" size={18} color="#D3D3D3" />
                                            <Text style={tw`text-[#D3D3D3] text-lg px-2 font-md`}>{date}</Text>
                                           <FavoritesButton type="movies" id={id} title={title} image={image}/>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                        <View style={tw`mt-4`}>
                            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify mb-4`]}>Description: {desc}</Text>
                            <Text style={[tw`text-[#D3D3D3] px-2 leading-5 text-justify`]}>Other name(s): {name.map((name) => { return `${name} ,  ` })}</Text>
                        </View>
                        <View style={tw`h-full`}>
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
                                    <Episodes episodes={episodes} mediaId={id} />
                                </LinearGradient>
                            </MotiView>
                        </View>
                    </View>
                </ScrollView>}
        </SafeAreaView>
    )
}

export default DramacoolInfo;

import { View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const imageBackgroundWidth = screenWidth * .3;

const RenderItemCards = ({ item, index, handleItemPress,route }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('favoriteShows').then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        setFavorites(parsedData);
      }
    }
    );
  }, []);
  
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
  return (
    <>
      <Animated.View entering={FadeInDown.delay(200 * index)}>
        <TouchableOpacity onPress={() => { handleItemPress(item.url, item.id) }} style={tw`mx-auto`}>
          <View style={tw`flex-row items-center relative mx-2 my-2`}>
            {/* Background image */}
            <AnimatedImageBackground sharedTransitionTag="sharedTag" source={{ uri: item.image }} style={[tw`h-44`, { width: imageBackgroundWidth }]}>
              {/* Text and episode number */}
              {!route?(favorites
                .filter((favItem) => favItem.id === item.id)
                .map((favItem) => (
                  <View key={favItem.id} style={tw`absolute top-2 left-2`}>
                    <MaterialIcons name="favorite" size={20} color="#DB202C" style={tw``} />
                  </View>
                ))):null}

              <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={{ height: '100%', width: '100%' }}>
                <View style={tw`absolute w-28 h-44 pl-3 -bottom-32`}>
                  <Text style={tw`font-bold text-white`} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </LinearGradient>
            </AnimatedImageBackground>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

export default RenderItemCards
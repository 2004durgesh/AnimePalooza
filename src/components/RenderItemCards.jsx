import { View, Text,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { LinearGradient } from 'react-native-linear-gradient';
import Animated,{FadeInDown} from 'react-native-reanimated';
const screenWidth = Dimensions.get('window').width;
const imageBackgroundWidth = screenWidth * .3;

const RenderItemCards = ({item,index,handleItemPress}) => {
  const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
  return (
    <>
      <Animated.View entering={FadeInDown.delay(200*index)}>
        <TouchableOpacity onPress={() => { handleItemPress(item.url, item.id)}} style={tw`mx-auto`}>
          <View style={tw`flex-row items-center relative mx-2 my-2`}>
            {/* Background image */}
            <AnimatedImageBackground sharedTransitionTag="sharedTag" source={{ uri: item.image }} style={[tw`h-44`, { width: imageBackgroundWidth }]}>
              {/* Text and episode number */}
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
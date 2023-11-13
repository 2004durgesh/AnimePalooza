import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Animated,{FadeInLeft, FadeOutRight} from 'react-native-reanimated';

const Recommendations = ({ recommendations }) => {
    const navigation = useNavigation();

    return (
        <View>
            {/* Title */}
            <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}> You may also Like </Text>
            {/* Horizontal ScrollView */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw``}>
                <View style={tw`h-50`}>
                    <View style={tw`flex-row`}>
                        {recommendations.map((ele, index) => (
                            // Recommendation Item
                            <Animated.View entering={FadeInLeft.delay(200*index)} exiting={FadeOutRight.delay(200*index)} key={index} style={tw`border p-2 py-3 my-1 h-16`}>
                                <TouchableOpacity onPress={() => navigation.navigate('FlixHQInfo', { id: ele.id })}>
                                    <Image source={{ uri: ele.image }} style={tw`w-32 h-44 rounded-lg`} />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Recommendations;

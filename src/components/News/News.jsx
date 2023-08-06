import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';


const News = () => {
  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex justify-center h-full`}>
        <Text style={tw`text-center text-lg text-red-500 my-4 mx-2`}>"Breaking news! Our news page is in the making, assembling the hottest headlines and latest stories. Extra! Extra! Read all about it! Our news page is cooking up a frenzy of information to keep you updated and informed, coming soon to a screen near you!"</Text>
      </View>
    </SafeAreaView>
  )
}

export default News
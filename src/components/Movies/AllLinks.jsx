import { View, Text } from 'react-native'
import tw from 'twrnc';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';


const AllLinks = () => {
  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex justify-center h-full`}>
        <Text style={tw`text-center text-lg text-blue-500 my-4 mx-2`}>"Lights, camera, action! Our movies page is in the editing room, polishing an extraordinary cinematic journey. Don't touch that popcorn just yet! Our movies page is in the final cut, soon to bring you a blockbuster entertainment experience!"</Text>
      </View>
    </SafeAreaView>
  )
}

export default AllLinks
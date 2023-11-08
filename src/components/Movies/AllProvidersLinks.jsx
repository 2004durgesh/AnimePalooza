import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import React from 'react'


const AllProvidersLinks = (props) => {
  return (
    <>
      <View style={tw`flex-row items-center px-2`}>
        <Image source={props.image} style={tw`w-15 h-15`} />
        <View style={tw`px-4 flex-1`}>
          <Text style={tw`text-white font-bold text-xl`}>{props.provider}</Text>
          <Text style={tw`text-white font-semibold`}>{props.providerDesc}</Text>
        </View>
      </View>
        <View style={tw`border-b border-gray-500 mx-3 mt-4`}></View>
    </>

  )
}

export default AllProvidersLinks
import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';


const AllServer = () => {
  return (
    <SafeAreaView style={tw`bg-black`}>
      <View style={tw`flex justify-center h-full`}>
        <Text  style={tw`text-center text-lg text-yellow-500 my-4 mx-2`}>"Hold your manga cravings! Our manga page is under construction, brewing the ultimate manga experience. Oops, looks like our manga realm is currently being summoned. Prepare yourself for epic adventures and captivating stories, coming soon!"</Text>
      </View>
    </SafeAreaView>
  )
}

export default AllServer
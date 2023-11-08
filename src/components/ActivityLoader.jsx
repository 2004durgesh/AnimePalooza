import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const ActivityLoader = ({style}) => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <ActivityIndicator size="large" color="#DB202C" style={style}/>
    </View>
  )
}

export default ActivityLoader
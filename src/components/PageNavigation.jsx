import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ToastMessage } from './ToastMessage';


const PageNavigation = ({currentPage,handlePrevPage,handleNextPage,isLoaded,error}) => {
    return (

        <>
            {isLoaded?<ToastMessage type="error" text1="Error fetching data" text2={error}/>:<View style={tw`flex flex-row justify-between items-center mx-4 my-4`}>
                <TouchableOpacity onPress={handlePrevPage} style={tw`bg-white pr-1 rounded-full w-12 h-12 justify-center items-center`}>
                    <FontAwesome name="chevron-left" size={30} color="#DB202C" />
                </TouchableOpacity>
                <Text style={tw`text-white font-bold pl-2`}>Page: {currentPage}</Text>
                <TouchableOpacity onPress={handleNextPage} style={tw`bg-white pl-1 rounded-full w-12 h-12 justify-center items-center`}>
                    <FontAwesome name="chevron-right" size={30} color="#DB202C" />
                </TouchableOpacity>
            </View>}
            {/*  */}
        </>

    )
}

export default PageNavigation
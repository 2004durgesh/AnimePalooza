import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import axios from "axios";
import { SafeAreaView} from 'react-native-safe-area-context';


const AnimeInfo = ({ route, navigation }) => {
  const { id } = route.params??{};


  const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <SafeAreaView>
      <View>
        <Text>AnimeInfo :{id}</Text>
      </View>
    </SafeAreaView>
  )
}

export default AnimeInfo
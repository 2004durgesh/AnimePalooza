import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const GenresAndEpisodes = ({ genres, themes, chapters, provider }) => {
  const navigation = useNavigation();

  // Render genre tags in horizontal scroll view
  const renderGenres = () => {
    return (
      <View>
        <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>Genres</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row`}>
            {genres.map((ele, index) => (
              <View key={index} style={tw`border p-2 h-10 rounded-md mx-1 bg-gray-700`}>
                <Text style={tw`text-white`}>{ele}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render themes tags in horizontal scroll view
  const renderThemes = () => {
    return (
      <View>
        <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>Themes</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row`}>
            {themes.map((ele, index) => (
              <View key={index} style={tw`border p-2 h-10 rounded-md mx-1 bg-gray-700`}>
                <Text style={tw`text-white`}>{ele}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render chapters list in vertical scroll view
  const renderChapters = () => {
    return (
      <ScrollView>
        <View>
          <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>{chapters.length} Chapters</Text>
          {chapters.map((ele, index) => (
            <View key={index} style={tw`border-b border-gray-800 p-2 h-18 `}>
              <TouchableOpacity onPress={() => navigation.navigate('MangaChapterPages', { chaptersId: ele.id, provider: provider })}>
                <Text style={tw`text-white text-lg`} numberOfLines={1} ellipsizeMode="tail">{ele.title}</Text>
                <Text style={tw`text-white text-xs text-[#D3D3D3]`}>Chapter Number {ele.chapterNumber} Volume Number{ele.volumeNumber}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {/* Render genre tags */}
      <View>
        {renderGenres()}
      </View>

      {/* Render themes tags */}
      <View>
        {renderThemes()}
      </View>

      {/* Render chapters */}
      <View>
        {renderChapters()}
      </View>
    </>
  );
};

export default GenresAndEpisodes;

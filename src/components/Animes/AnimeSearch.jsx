import { View, Text } from 'react-native'
import React from 'react'
import SearchBar from '../SearchBar'

const AnimeSearch = () => {
  return (
      <SearchBar type="anime" provider="gogoanime" />
  )
}

export default AnimeSearch

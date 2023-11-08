import { View, Text } from 'react-native'
import React from 'react'
import SearchBar from '../../SearchBar'

const FlixHQSearch = () => {
  return (
    <SearchBar type="movies" provider="flixhq" />
  )
}

export default FlixHQSearch
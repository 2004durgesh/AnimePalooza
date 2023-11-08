import { View, Text } from 'react-native'
import React from 'react'
import SearchBar from '../../SearchBar'

const DramacoolSearch = () => {
  return (
    <SearchBar type="movies" provider="dramacool" />
  )
}

export default DramacoolSearch
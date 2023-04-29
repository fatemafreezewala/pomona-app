import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'

const FlatlistComp = ({DATA,renderItem,style}) => {
  return (
    <FlatList
    style={style}
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
  )
}

export default FlatlistComp

const styles = StyleSheet.create({})
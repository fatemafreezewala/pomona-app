import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'
import colors from '../constant/colors'

const Loader = ({loading}) => {
  return (
    <View style={{alignSelf:'center'}}>
     {loading && (<ActivityIndicator color={colors.primary} size="small"></ActivityIndicator>)}
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})
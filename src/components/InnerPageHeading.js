import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fontFamily from '../constant/fontFamily'
import globalStyle from '../styles/globalStyle'
import colors from '../constant/colors'

const InnerPageHeading = ({title,subtitle}) => {
  return (
    <View style={globalStyle.mt10}>
      
      <Text style={[{fontFamily:fontFamily.AltaRegular,fontSize:32,color:colors.black}]}>{title}</Text>
      <Text style={[{fontFamily:fontFamily.Regular,color:colors.black},globalStyle.fs10]}>{subtitle}</Text>
    </View>
  )
}

export default InnerPageHeading

const styles = StyleSheet.create({})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalStyle from '../styles/globalStyle'
import Arrow from '../assets/img/Login/ChevronRight.svg'
import colors from '../constant/colors'
import fontFamily from '../constant/fontFamily'
const Header = ({title,showSkip=false,style,onPress,onSkip}) => {
  return (
    <View style={[globalStyle.rowSpaceBetween,style]}>
      <TouchableOpacity onPress={onPress} style={globalStyle.rowCenter}>
        <Arrow></Arrow>
        <Text style={[globalStyle.ml10,globalStyle.paragraph]}>back</Text>
      </TouchableOpacity>
      <Text style={{color:colors.black,fontFamily:fontFamily.Medium,fontSize:16}}>{title}</Text>
      <View style={{width:'20%'}}>
        {showSkip && <TouchableOpacity onPress={onSkip}><Text style={[globalStyle.ml10,globalStyle.paragraph]}>Skip</Text></TouchableOpacity>}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
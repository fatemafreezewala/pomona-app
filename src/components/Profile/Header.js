import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Arrow from '../../assets/img/Login/ChevronRight.svg'
import globalStyle from '../../styles/globalStyle'
import fontFamily from '../../constant/fontFamily'

const Header = ({onPress,title}) => {
  return (
    <View style={{backgroundColor:'#fff',alignItems:'center',height:80,padding:15,flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={onPress} style={globalStyle.rowCenter}>
        <Arrow></Arrow>
        <Text style={{fontFamily:fontFamily.Regular,marginLeft:10}}>Back</Text>
    </TouchableOpacity>
      <Text style={{color:'#000',fontFamily:fontFamily.Medium}}>{title}</Text>
      <View style={{width:'10%'}}></View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
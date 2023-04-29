import { Pressable, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import BlogImg from '../../assets/img/Restaurant/img.svg'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import imageApi from '../../constant/imageApi'

const Card = ({onPress,item}) => {
  return (
    <TouchableOpacity onPress={onPress}>

      <View style={[globalStyle.rowSpaceBetween,globalStyle.mt5,{backgroundColor:colors.white,borderRadius:5,padding:10}]}>

      {item.restaurant_LogoUrl != '' ? (<Image style={{width:60,height:60}} source={{uri:imageApi+item.restaurant_LogoUrl}}></Image>) : 
      (<Image style={{width:60,height:60}} source={require('../../assets/img/logo.png')}></Image>) } 

      <View style={{width:'75%'}}>
     <Text style={{fontFamily:fontFamily.Medium,color:'#000',fontSize:16}}>{item.restaurant_name}</Text>
     <Text style={{fontFamily:fontFamily.Regular,color:'#565555',fontSize:12,marginTop:5}}>{item.restaurant_Description}</Text>
     </View>
    </View>
    </TouchableOpacity>
    
  )
}

export default Card

const styles = StyleSheet.create({})
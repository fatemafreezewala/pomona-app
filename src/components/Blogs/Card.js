import { Pressable, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import BlogImg from '../../assets/img/Blogs/blog.svg'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import imageApi from '../../constant/imageApi'

const Card = ({item,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
<View  style={[globalStyle.rowSpaceBetween,globalStyle.mt5,{backgroundColor:colors.white,borderRadius:5,padding:10}]}>
    <Image style={{width:100,height:100,borderRadius:10}} source={{uri:imageApi+item.blog_img}}></Image>
      <Text style={{width:'65%',fontFamily:fontFamily.Regular,color:'#000',marginLeft:10}}>{item.blog_title}</Text>
    </View>
    </TouchableOpacity>
    
  )
}

export default Card

const styles = StyleSheet.create({})
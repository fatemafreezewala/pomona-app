import { Pressable, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import imageApi from '../../constant/imageApi'

const Card = ({onPress,item}) => {

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[{backgroundColor:'#fff',borderRadius:10,padding:10},globalStyle.mt5]}>
        <View style={[globalStyle.rowSpaceBetween]}>

{item.noti_img == '' ? (<Image style={{width:'22%',height:70,borderRadius:10,marginRight:10}} source={require('../../assets/img/logo.png')}></Image>) 
   : (<Image style={{width:'22%',height:70,borderRadius:10,marginRight:10}} source={{uri:imageApi+item.noti_img}}></Image>)}

        <Text style={{width:'75%',fontFamily:fontFamily.Regular,color:'#000'}}>{item.noti_title}</Text>
        </View>
        {/* <Text style={{color:colors.secondry,alignSelf:'flex-end'}}>{item.noti_desp}</Text> */}
    </View>
    
    </TouchableOpacity>
    
  )
}

export default Card

const styles = StyleSheet.create({})
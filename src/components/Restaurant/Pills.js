import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Arrow from '../../assets/img/Restaurant/arrow.svg'
import globalStyle from '../../styles/globalStyle'
import fontFamily from '../../constant/fontFamily'
const Pills = ({item,index}) => {
  return (
    <Pressable onPress={item.onPress} style={[{backgroundColor:'#fff',padding:15,flexDirection:'row',height:50,
    marginLeft:index == 0? 0 :10,borderRadius:30,
    minWidth:140,
    justifyContent:'space-between',
    alignItems:'center'
    }]}>
      {item.img}
      <Text style={{color:'#000',fontFamily:fontFamily.Medium}}>{item.title}</Text>
      <Arrow></Arrow>
    </Pressable>
  )
}

export default Pills

const styles = StyleSheet.create({})
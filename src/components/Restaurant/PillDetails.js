import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Arrow from '../../assets/img/Restaurant/arrow.svg'
import globalStyle from '../../styles/globalStyle'
import fontFamily from '../../constant/fontFamily'

const Pills = ({item,index}) => {
  return (
    <View style={[{backgroundColor:'#fff',padding:15,flexDirection:'row',height:50,
    marginLeft:index % 2 == 0 ? 0 :10,borderRadius:30,
    minWidth:150,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
    }]}>
        {item.img}
      <Text style={{color:'#000',fontFamily:fontFamily.Medium,marginLeft:10}}>{item.title}</Text>
      
    </View>
  )
}

export default Pills

const styles = StyleSheet.create({})
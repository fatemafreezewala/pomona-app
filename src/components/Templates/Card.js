import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import Arrow from '../../assets/img/Templates/arrow.svg'
import fontFamily from '../../constant/fontFamily'
import colors from '../../constant/colors'
const Card = ({item,onPress}) => {

const list = item.user_template_items.split(',')
  return (
    <TouchableOpacity key={item.user_template_id} 
    onPress={onPress} 
    style={[{backgroundColor:item.user_allergy_temp_color == '' ? '#fff' : 
    item.user_allergy_temp_color,padding:8,width:'50%',borderWidth:5,
    borderColor:'#e6eae1',borderRadius:20,flexDirection:'column'},globalStyle.mt5]}>
      
      <Text style={{fontFamily:fontFamily.Medium,color:colors.black,fontSize:13}}>{item.user_template_title}</Text>
      <View style={[globalStyle.mt10]}></View>

      {list && list.slice(0,5).map(litem=>(<Text style={{fontFamily:fontFamily.Regular,color:colors.black,fontSize:13}}>{litem}</Text>))}
      
      <View style={[globalStyle.mt10]}></View>
      <View style={[globalStyle.rowSpaceBetween]}>
        <Text style={{color:'#000'}}>+ {list.length > 5 ? list.length - 5 : 0} more</Text>
        <Arrow></Arrow>
      </View>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({})
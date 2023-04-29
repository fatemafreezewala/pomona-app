import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import Arrow from '../../assets/img/Home/white-arrow.svg'
import globalStyle from '../../styles/globalStyle'
import fontFamily from '../../constant/fontFamily'

const TemplateList = ({item,onPress}) => {

  const list = item.user_template_items.split(',')
  return (
    <Pressable key={item.user_template_id} onPress={onPress}>
      <View style={{marginHorizontal:15,backgroundColor:item.user_allergy_temp_color,padding:20,marginTop:10,borderRadius:15}}>
    <View style={globalStyle.rowSpaceBetween}>
        <Text style={{color:'#000',fontFamily:fontFamily.Medium,fontSize:16}}>{item.user_template_title}</Text>
        <Arrow></Arrow>
    </View>
      <Text style={{color:'#000',fontFamily:fontFamily.Regular,fontSize:14}}>      
      {list && list.slice(0,5).map(litem=>(<Text>{litem},</Text>))}
      <Text>+ {list.length > 5 ? list.length - 5 : 0} more</Text>
</Text>
    </View>
    </Pressable>
  )
}

export default TemplateList

const styles = StyleSheet.create({})
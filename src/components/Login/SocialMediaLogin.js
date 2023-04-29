import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'

const SocialMediaLogin = ({loading,title,onPress,style,background,icon,txtcolor}) => {
  return (
    <TouchableOpacity 
    onPress={onPress} style={{width:'100%'}}>
        <View style={[{
          paddingHorizontal:'15%',
      width:'100%',height:50,borderRadius:8,
      flexDirection:'row',justifyContent:'space-between',alignItems:'center',alignSelf:'center',
      backgroundColor:background
      },style]}>
          {icon}
          {loading ? (<ActivityIndicator size="small" color={colors.black}></ActivityIndicator>) : (        <Text style={[{color:'#fff',fontSize:15,fontFamily:fontFamily.Regular},txtcolor]}>{title}</Text>
)}
        </View>
     
    </TouchableOpacity>
  )
}

export default SocialMediaLogin

const styles = StyleSheet.create({})


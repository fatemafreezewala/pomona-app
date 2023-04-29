import { StyleSheet, Text, View,TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import colors from '../constant/colors'
import fontFamily from '../constant/fontFamily'

const Button = ({title,onPress,style,loading=false,disabled=false}) => {
  return (
   <>
  <TouchableOpacity onPress={onPress} style={[{
      width:'100%',height:50,borderRadius:8,
      flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center',
      backgroundColor:colors.primary
      },style]}>
    {loading ? (<ActivityIndicator size="small" color={colors.white}></ActivityIndicator>) : (
          <Text style={{color:'#fff',fontSize:15,fontFamily:fontFamily.Regular}}>{title}</Text>
        )} 
      
    </TouchableOpacity>
   </>
  )
}

export default Button

const styles = StyleSheet.create({})
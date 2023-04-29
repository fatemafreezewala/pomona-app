import { StyleSheet, Text, View ,TextInput, TouchableOpacity,ActivityIndicator} from 'react-native'
import React from 'react'
import fontFamily from '../../constant/fontFamily'
import colors from '../../constant/colors'

const Selector = ({placeholder,onPress,loading}) => {
  return (
    
      <TouchableOpacity
      onPress={onPress} 
      style={{
        height:50,backgroundColor:'#fff',
        paddingHorizontal:15,
        borderWidth:1,borderRadius:8,color:'#000',
        fontFamily:fontFamily.Regular,width:'100%',alignSelf:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
      }}>
        <Text style={{color:'#000',fontFamily:fontFamily.Regular}}>{placeholder}</Text>
        {loading && (<ActivityIndicator size="small" color={colors.primary}></ActivityIndicator>)}
      </TouchableOpacity>
    
  )
}

export default Selector

const styles = StyleSheet.create({})
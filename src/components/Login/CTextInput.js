import { StyleSheet, Text, View ,TextInput} from 'react-native'
import React from 'react'
import fontFamily from '../../constant/fontFamily'

const CTextInput = ({defaultValue='',security=false,placeholder="Enter Email",onChange,keyboard="default"}) => {
  return (
    
      <TextInput defaultValue={defaultValue} secureTextEntry={security} keyboardType={keyboard} onChangeText={onChange} 
      style={{
        height:50,backgroundColor:'#fff',
        paddingLeft:15,
        borderWidth:1,borderRadius:8,color:'#000',
        fontFamily:fontFamily.Regular,width:'100%',alignSelf:'center'
      }} placeholderTextColor="#000" placeholder={placeholder}></TextInput>
    
  )
}

export default CTextInput

const styles = StyleSheet.create({})
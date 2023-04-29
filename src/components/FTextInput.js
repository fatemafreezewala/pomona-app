import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';

const FTextInput = ({placeholder,onchange,style}) => {

  return (
      <>
    <TextInput
      mode="flat"
      label={placeholder}
      placeholder=""
      onChangeText={onchange}
    style={[{backgroundColor:'transparent',marginTop:20},style]}
    />
      </>
  )
}

export default FTextInput

const styles = StyleSheet.create({

})
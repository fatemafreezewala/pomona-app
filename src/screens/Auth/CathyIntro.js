import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../styles/globalStyle'
import fontFamily from '../../constant/fontFamily'
import Button from '../../components/Button'
const CathyIntro = ({navigation}) => {
  return (
    <>
    <ImageBackground source={require('../../assets/img/Login/back.png')} style={[globalStyle.container,globalStyle.justifyCenter]}>
      <Text style={globalStyle.heading}>Welcome to the Pomona App</Text>
      <Text style={[globalStyle.paragraph,globalStyle.mt5]}>At Pomona, we know what it’s like to miss dining out confidently, and we want to help.  We believe with the right tools to communicate your needs, you can feel confident dining out with less risk and more enjoyment. We can even help you find great restaurants along the way.</Text>
      <Text style={[globalStyle.paragraph,globalStyle.mt10]}>Thanks for choosing us to support your healing journey</Text>
      <Text style={[{fontSize:13,fontFamily:fontFamily.SemiBold,color:'#1E1E1D'},globalStyle.mt10]}>Wishing You Abundant Health and Joy, </Text>
      <Text style={[{fontSize:13,fontFamily:fontFamily.PacificaRegular,color:'#1E1E1D'}]}>Cathy</Text>
      <Text style={[globalStyle.paragraph,globalStyle.mt5]}>Founder and Creator of the Pomona App</Text>
    </ImageBackground>
    <Button onPress={()=>{
        navigation.navigate('OnboardingIntro')
    }} title="Next" style={[globalStyle.alignSelf,globalStyle.w95,globalStyle.mb5]}></Button>
    </>
  )
}

export default CathyIntro

const styles = StyleSheet.create({})
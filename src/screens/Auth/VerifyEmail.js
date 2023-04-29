import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'

const VerifyEmail = ({route,navigation}) => {
  const {otp,email} = route.params;
  const [otpE, setotpE] = React.useState('')
  const checkOtp = () =>{
    console.log(otp)
    if(otp == parseInt(otpE)){
      navigation.navigate('SetPassword',{email:email})
    }else{
      Alert.alert('','Invalid OTP. Try Again.')
    }
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Verify your email"></Header>
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        <View style={[globalStyle.mt10]}></View>
        <Text style={[globalStyle.paragraph,globalStyle.mb10]}>
        We have sent a confirmation to your email address, john@emailme.com. In case you don’t see it, check your spam folder.
        </Text>
        <CTextInput keyboard="numeric" onChange={setotpE} placeholder="Enter verification code"></CTextInput>
        <Text style={[globalStyle.paragraph,globalStyle.mt10]}>
        If you don’t receive the code, contact us at support@pomonawellness.co
        </Text>
        </View>
    </View>
    <Button onPress={()=>{
      checkOtp()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Next"></Button>
 </>
  )
}

export default VerifyEmail

const styles = StyleSheet.create({})
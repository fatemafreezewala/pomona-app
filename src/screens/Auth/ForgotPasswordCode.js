import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'

const VerifyEmail = ({route,navigation}) => {
  const {email,code} = route.params
  const [otpE, setotpE] = React.useState('')

  const checkOtp = () =>{
    console.log(code)
    if(code == parseInt(otpE)){
     
      navigation.navigate('ForgotPasswordSet',{email:email})
    }else{
      Alert.alert('','Invalid OTP. Try Again.')
    }
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Forgot Password"></Header>
        <View style={globalStyle.innerContainer}>
        
        <View style={[globalStyle.mt10]}></View>
        <Text style={[globalStyle.sectionHead,globalStyle.mb10,globalStyle.textLeft]}>
        Verify your email
        </Text>
        <Text style={[globalStyle.paragraph,globalStyle.mb10]}>
        We have sent a confirmation to your email address, john@emailme.com. In case you don’t see it, check your spam folder.
        </Text>
        <CTextInput onChange={setotpE} keyboard="numeric" placeholder="Enter Verification Code"></CTextInput>
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
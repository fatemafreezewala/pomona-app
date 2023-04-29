import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import { ProgressBar,  } from 'react-native-paper';
import colors from '../../constant/colors'
import { useToast } from 'react-native-toast-notifications'

const VerifyEmail = ({route,navigation}) => {
  const {email} = route.params;
  const [password, SetPassword] = React.useState('')
  const [cpassword, SetCPassword] = React.useState('')
  const toast = useToast()
  const checkOtp = () =>{
    if(password == cpassword){
      navigation.navigate('CreateAccount',{email:email,password:password,pname:'',
      formalName:'',type:'normal'})
    }else{
      toast.show('Password does not match.',{type:"warning"})
    }
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:0},globalStyle.dullBackground]}>
        <Header title="Set Password"></Header>
        <ProgressBar progress={0.1} style={[{height: 8},globalStyle.mt5]} color={colors.secondry} />
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        
        <Text style={[globalStyle.sectionHead,globalStyle.mb10]}>
        Welcome to the Pomona App. We are so happy you are here.
        </Text>
        <CTextInput security={true} onChange={SetPassword} placeholder="Set new password"></CTextInput>
        <View style={[globalStyle.mt5]}></View>
        <CTextInput security={true} onChange={SetCPassword} placeholder="Re-enter password"></CTextInput>
       
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
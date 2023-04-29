import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import api from '../../constant/api'
import {useToast} from 'react-native-toast-notifications'

const EnterEmail = ({navigation}) => {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const toast = useToast()
  const OnLogin = () =>{
   if(email == ''){
    toast.show('Please enter registered email.',{type:"warning"})
   }else{
    setLoading(true)
    var val = Math.floor(1000 + Math.random() * 9000);
    api.post('?action=sendForgetCode',{email:email,otp:val}).then(res=>{
      console.log(res.data)
      if(res.data.status == '200'){
        navigation.navigate('ForgotPasswordCode',{email:email,code:val})
      }else{
        toast.show('Account does not exist',{type:"danger"})
      }

    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
   }
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Forgot Password"></Header>
        <View style={globalStyle.innerContainer}>
        <Text style={[globalStyle.sectionHead,globalStyle.mt10,globalStyle.textLeft]}>
        Enter the email used to create your account
        </Text>
       
        <View style={[globalStyle.mt10]}></View>
        <CTextInput onChange={setEmail}></CTextInput>
        </View>
       
    </View>
    <Button loading={loading} onPress={()=>{
       OnLogin()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Next"></Button>
 </>
  )
}

export default EnterEmail

const styles = StyleSheet.create({})
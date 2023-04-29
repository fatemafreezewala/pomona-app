import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import api from '../../constant/api'

const EnterEmail = ({navigation}) => {
  const [loading, setLoading] = React.useState(false) 
  const [email, setEmail] = React.useState('')

  const OnLogin = () =>{
    setLoading(true)
    var val = Math.floor(1000 + Math.random() * 9000);
    api.post('?action=login',{email:email,otp:val}).then(res=>{
      if(res.data.status == '200'){
        navigation.navigate('AddPassword',{user:res.data.data})
      }else{
        navigation.navigate('VerifyEmail',{otp:val,email:email})
      }
      setLoading(false)
    }).catch(err=>{
      setLoading(false)
    })
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Enter Email"></Header>
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        <View style={[globalStyle.mt10]}></View>
        <CTextInput onChange={setEmail}></CTextInput>
        </View>
       
    </View>
    <Button  loading={loading} onPress={()=>{
        OnLogin()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Next"></Button>
 </>
  )
}

export default EnterEmail

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import {useToast} from 'react-native-toast-notifications'
import api from '../../constant/api'

const ForgotPasswordSet = ({route,navigation}) => {
  const {email} = route.params

  const [password, SetPassword] = React.useState('')
  const [cpassword, SetCPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const toast = useToast() 
  const checkOtp = () =>{
    if(password != '' &&  cpassword != ''){
      if(password == cpassword){
        setLoading(true)
        api.post('?action=updatePassword',{u_email:email,u_password:password}).then(res=>{
          if(res.data.status == '200'){
            toast.show("Password Reset successfully.")
             navigation.navigate('EnterEmail')
          }else{
            toast.show("Unable to reset password.",{type:'danger'})
          }
    
        }).catch(err=>{
          
        }).finally(()=>{
          setLoading(false)
        })
  
      }else{
        toast.show('Password does not match.',{type:"warning"})
      }
    }else{
      toast.show('Kindly Enter password.',{type:"warning"})
    }
  }
  return (
 <>  
    <View style={[globalStyle.container,{paddingHorizontal:0},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Set Password"></Header>
      
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        
        <Text style={[globalStyle.sectionHead,globalStyle.mb10,globalStyle.textLeft]}>
        Create new password
        </Text>
        <CTextInput security={true} onChange={SetPassword} placeholder="Enter new password"></CTextInput>
        <View style={[globalStyle.mt5]}></View>
        <CTextInput security={true} onChange={SetCPassword} placeholder="Re-enter password"></CTextInput>
       
        </View>
    </View>
    <Button loading={loading} onPress={()=>{
    checkOtp()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Next"></Button>
 </>
  )
}

export default ForgotPasswordSet

const styles = StyleSheet.create({})
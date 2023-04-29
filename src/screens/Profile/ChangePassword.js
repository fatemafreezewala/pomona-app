import { StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native'
import React,{useContext} from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import colors from '../../constant/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../navigation/Auth";
import api from '../../constant/api'
import {useToast} from 'react-native-toast-notifications'

const AddPassword = ({route,navigation}) => {
    const {user} = route.params
    const toast = useToast()

    const [password, setPassword] = React.useState('')
    const [Cpassword, setCPassword] = React.useState('')
    const [Oassword, setOassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const onSubmit = async() =>{
        if(Oassword == user.u_password){
           if(password != '' && Cpassword != ''){
            if(password == Cpassword){
                user.u_password = password
                setLoading(true)
                var fdata = new FormData()
                fdata.append('u_email',user.u_email)
                fdata.append('u_fullname',user.u_fullname)
                fdata.append('u_profile',user.u_profile)
                fdata.append('u_profilename',user.u_profilename)
                fdata.append('u_country_code',user.u_country_code)
                fdata.append('u_cca',user.cca2)
                fdata.append('u_phone',user.u_phone)
                fdata.append('u_password',user.u_password)
                fdata.append('u_id',user.u_id)
            
                api.post('?action=updateAccount',fdata,{headers:{
                  'Content-type':'multipart/form-data'
                }}).then(async(res)=>{
                  if(res.data.status == '200'){
                    toast.show('Password Updated.')
                    await AsyncStorage.setItem('USER_TOKEN',res.data.data.u_id)
                    await AsyncStorage.setItem('USER',JSON.stringify(res.data.data))
                    navigation.navigate('Homes')
                  }else{
                    toast.show('Error While updating Paasword.',{type:"danger"})
                  }
              
                }).catch(err=>{
                 
                }).finally(()=>{
                  setLoading(false)
                })  
               }else{
                toast.show('New password does not match.',{type:"warning"})
               }
           }else{
            toast.show('Please enter new password.',{type:"warning"})
           }
          }else{
            toast.show('Incorrect old password.',{type:"warning"})
          }
    }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header title="Change Password"></Header>
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        <View style={[globalStyle.mt10]}></View>
        <CTextInput security={true} onChange={setOassword} placeholder='Set old password'></CTextInput>
        <View style={[globalStyle.mt5]}></View>
        <CTextInput security={true} onChange={setPassword} placeholder='Set new password'></CTextInput>
        <View style={[globalStyle.mt5]}></View>
        <CTextInput security={true} onChange={setCPassword} placeholder='Re-enter password'></CTextInput>

       
        </View>
       
    </View>
    <Button loading={loading} onPress={()=>{
       onSubmit()
    }} style={[globalStyle.w95,globalStyle.mb10,{backgroundColor:colors.secondry}]} title="Update Password"></Button>
 </>
  )
}

export default AddPassword

const styles = StyleSheet.create({})
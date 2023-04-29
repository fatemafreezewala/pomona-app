import { StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native'
import React,{useContext} from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import colors from '../../constant/colors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../navigation/Auth";
import AppContext from '../../context/AppContext'
const AddPassword = ({route,navigation}) => {
    const {user} = route.params
    const { signIn } = useContext(AuthContext)
    const { setUser } = useContext(AppContext)
    const [password, setPassword] = React.useState('')
    const onSubmit = async() =>{
        if(password == user.u_password){
          setUser(user)
            signIn('124')
            await AsyncStorage.setItem('USER_TOKEN',user.u_id)
            await AsyncStorage.setItem('USER',JSON.stringify(user))
            
          }else{
            Alert.alert('','Incorrect password.')
          }
    }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Enter Password"></Header>
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
        <View style={[globalStyle.mt10]}></View>
        <CTextInput security={true} onChange={setPassword} placeholder='Enter Password'></CTextInput>
        <TouchableOpacity onPress={()=>{
        navigation.navigate('ForgotPassword')
    }}>
        <Text style={[globalStyle.paragraph,{color:colors.linkBlue,textAlign:'right'},globalStyle.mt10]}>Forgot your password?</Text>

        </TouchableOpacity>
        </View>
       
    </View>
    <Button disabled={password} onPress={()=>{
       onSubmit()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Sign in"></Button>
 </>
  )
}

export default AddPassword

const styles = StyleSheet.create({})
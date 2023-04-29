import { StyleSheet, Text, View,Alert } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import CTextInput from '../../components/Login/CTextInput'
import { ProgressBar,  } from 'react-native-paper';
import colors from '../../constant/colors'
import CountryPicker from '../../components/Login/CountryPicker'
const CreateAccount = ({route,navigation}) => { 
  const {email,password,formalName,pname,type} = route.params;
  const [name, setName] = React.useState('')
  const [Profilename, setProfilename] = React.useState('') 
  const [phone, setPhone] = React.useState('') 
  const [country, setCountry] = React.useState({"callingCode": ["1"], "cca2": "US", "currency": ["USD"], "flag": "flag-us", "name": "United States", "region": "Americas", "subregion": "North America"})
  React.useEffect(() => {
   if(type != 'normal'){
    setName(formalName)
    setProfilename(pname)
   }
  }, [])
  
  const onSubmit = () =>{
   
    if(name != '' && Profilename != '' && phone != ''){
      navigation.navigate('AddPhoto',{email:email,
        password:password,
        name:name,
        profile:Profilename,
        country:country,
        phone:phone,type:type})
    }else{
      Alert.alert('','All Fields are required.')
    }
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:0},globalStyle.dullBackground]}>
        <Header onPress={()=>navigation.goBack()} title="Create Account"></Header>
        <ProgressBar progress={0.3} style={[{height: 8},globalStyle.mt5]} color={colors.secondry} />
        <View style={globalStyle.innerContainer}>
        <View style={[globalStyle.mt10]}></View>
       
        <Text style={[globalStyle.sectionHead,globalStyle.mb10,globalStyle.textLeft]}>
        Tell us more about you
        </Text>
        <CTextInput defaultValue={name} onChange={setName} placeholder="Full name"></CTextInput>
        <View style={[globalStyle.mt5]}></View>
        <CTextInput defaultValue={Profilename} onChange={setProfilename} placeholder="Profile name"></CTextInput>
        <View style={[globalStyle.mt5]}></View>
       <CountryPicker country={country} setCountry={setCountry} setPhone={setPhone}></CountryPicker>
        </View>
    </View>
    
    <Button onPress={()=>{
      onSubmit()
      //navigation.navigate('AddPhoto')
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Next"></Button>
 </>
  )
}

export default CreateAccount

const styles = StyleSheet.create({})
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import CountryPicker from 'react-native-country-picker-modal'
import fontFamily from '../../constant/fontFamily'

const CountryPickerp = ({setPhone,country, setCountry,defaultValue}) => {
    const [visible, setVisible] = React.useState(false)
    const handleSelection = (e) => {
     
        setCountry(e)
    }
  return (
  <>
    <View style={{
        height:50,backgroundColor:'#fff',
        flexDirection:'row',
        borderWidth:1,borderRadius:8,color:'#000',width:'100%',alignSelf:'center'
      }}>
      <View style={{minWidth:'30%'}}>
      <CountryPicker
            containerButtonStyle={{
            height:'100%',
            flexDirection:'row',
            justifyContent:'center',alignItems:'center',padding:0}}
            withFilter
            withCallingCode
            withCallingCodeButton
            withFlagButton
            withEmoji
            
            countryCode={country && country.cca2}
           
            visible={visible}
            onClose={() => {
                setVisible(false)
            }}
            onSelect={handleSelection}
        />
      </View>
      <View style={{width:'70%'}}>
        <TextInput defaultValue={defaultValue} onChangeText={setPhone} keyboardType="number-pad"  style={{
        height:50,
        borderRadius:8,color:'#000',fontFamily:fontFamily.Regular
      }} placeholderTextColor="#000" placeholder='Enter phone'></TextInput>
      </View>
    </View>

  </>
  )
}

export default CountryPickerp

const styles = StyleSheet.create({})
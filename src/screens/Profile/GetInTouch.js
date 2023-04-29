import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Email from '../../assets/img/Restaurant/email.svg'
import globalStyle from '../../styles/globalStyle'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import Header from '../../components/Profile/Header'
const GetInTouch = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Header onPress={()=>navigation.goBack()} title="Get in Touch"></Header>
      <View style={[{backgroundColor:'#fff',width:'95%',padding:15,alignSelf:'center',borderRadius:15},globalStyle.mt10]}>
      <Text style={globalStyle.paragraph}>We are committed to serving our customers and supporting them to live more enjoyable lives with less stress about managing their food allergies. We would love to hear how we are doing and if there is anything we can do to improve the Pomona App experience. Our founder and CEO reads every single email and takes your feedback seriously.  Let us know what you have to say!</Text>
      <View style={[globalStyle.rowSpaceBetween,globalStyle.mt5]}>
      <View style={globalStyle.rowCenter}>
            <Email></Email>
            <Text style={[styles.desp,globalStyle.ml5]}>Email</Text>
          </View>
        <Text onPress={() => {
                Linking.openURL('mailto:support@pomonawellness.co');
              }} style={[styles.desp]}>support@pomonawellness.co</Text>
      </View>
      </View>
    </View>
  )
}

export default GetInTouch

const styles = StyleSheet.create({
  desp:{
    color:colors.black,
    fontFamily:fontFamily.Medium,
    fontSize:13,
    lineHeight:18,
    marginTop:10
  }
})
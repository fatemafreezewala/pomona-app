import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from '../styles/globalStyle'
import colors from '../constant/colors'
import fontFamily from '../constant/fontFamily'
import Header from '../components/Profile/Header'
const About = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <Header onPress={()=>navigation.goBack()} title="Terms & Conditions"></Header>
      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={[{backgroundColor:'#fff',width:'95%',padding:15,alignSelf:'center',borderRadius:15},globalStyle.mt10]}>
      <Text style={globalStyle.paragraph}>
      <Text style={styles.heading}>About Pomona APP</Text>{'\n'}

      As someone who suffers from autoimmune disease and chronic illness, diet is 90% of my health, but as a former self-proclaimed foodie, walking away foods I loved in name of health was hard. For a while, I thought I would have to give it all up, but I just couldn’t do it, so I started creating allergy cards to communicate to restaurants what I could and couldn’t have. That’s how the idea for the Pomona Wellness app was born. I created this app to help myself, and others like me, navigate dining out safely, while still enjoying that foodie life. With the Pomona Wellness app, today you can create custom allergy cards, use our template library of pre-existing healing diets, and find allergy friendly restaurants. There is so much more to come and we are so glad you are here with us on the journey. 
      {'\n'}{'\n'}
      Cathy, Founder and CEO of Pomona Wellness 
      </Text>
      
      </View>
      </ScrollView>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  desp:{
    color:colors.black,
    fontFamily:fontFamily.Medium,
    fontSize:13,
    lineHeight:18,
    marginTop:10
  },
  heading:{
    fontFamily:fontFamily.Medium
  }
})
import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import Intro1 from '../../assets/img/intro/intro1.svg'
import Intro2 from '../../assets/img/intro/intro2.svg'

import Intro3 from '../../assets/img/intro/intro3.svg'
import Button from '../../components/Button';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';

const SelectLanguage = ({navigation}) => {
  const slides = [
    {
      key: 1,
      title: 'What you receive',
      text: 'UNLIMITED ALLERGY TEMPLATES',
      text3:'Communicate your needs with ease',
      image: <Intro1></Intro1>
    },
    {
      key: 2,
      title: 'What you receive',
      text: 'ALLERGY FRIENDLY RESTAURANT RECOMMENDATIONS',
      text3:'Find allergy friendly restaurants',
      image: <Intro2></Intro2>
    },
    {
      key: 3,
      title: 'Upgrade your experience',
      text: 'PREMIUM UNLIMITED CUSTOMIZED TEMPLATES',
      text3:'Create custom templates',
      image:<Image source={require('../../assets/img/intro/intro3.png')}></Image>
    }
  ];
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
         {item.image}
        <Text style={[styles.title,{marginTop:40}]}>{item.title}</Text>
         
        <Text style={styles.middle}>{item.text}</Text>
        <Text style={[styles.title,{color:colors.black,fontSize:15}]}>{item.text3}</Text>
      </View>
    );
  }
  const _onDone = () => {
    return (
      <View style={[{
        width:'100%',height:50,borderRadius:8,
        flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center',
        backgroundColor:colors.primary
        }]}>
        <Text style={{color:'#fff',fontSize:15,fontFamily:fontFamily.Regular}}>Complete</Text>
      </View>
    );
  }
 const _renderNextButton = () => {
    return (
      <View style={[{
        width:'100%',height:50,borderRadius:8,
        flexDirection:'row',justifyContent:'center',alignItems:'center',alignSelf:'center',
        backgroundColor:colors.primary
        }]}>
        <Text style={{color:'#fff',fontSize:15,fontFamily:fontFamily.Regular}}>Next</Text>
      </View>
    );
  };
  const _onDoneGoto = () =>{
    
      navigation.navigate('Login')
  
  }
  return (
    <View style={{flex:1,backgroundColor:colors.white}}> 
        <AppIntroSlider dotStyle={{backgroundColor:colors.verylightyellow}} activeDotStyle={{
          backgroundColor:colors.secondry,width:15,height:15,borderRadius:15}} 
          renderNextButton={_renderNextButton} 
          bottomButton={true} renderDoneButton={_onDone} 
          renderItem={_renderItem} data={slides} onDone={_onDoneGoto}/>

    </View>
  )
}

export default SelectLanguage

const styles = StyleSheet.create({
  slide:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  middle:{
    fontFamily:fontFamily.AltaRegular,
    fontSize:25,
    color:colors.darkBrown,
    textAlign:'center'
  },
  title:{
    fontFamily:fontFamily.Regular,
    fontSize:20,
    color:colors.secondry,
    textAlign:'center'
  }
})
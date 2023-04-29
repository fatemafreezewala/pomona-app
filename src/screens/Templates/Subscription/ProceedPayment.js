import { StyleSheet, Text, View,ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import globalStyle from '../../../styles/globalStyle'
import Sub1 from '../../../assets/img/Templates/sub1.svg'
import Sub2 from '../../../assets/img/Templates/sub2.svg'
import Sub3 from '../../../assets/img/Templates/sub3.svg'
import Subs from '../../../assets/img/Templates/subs.svg'
import fontFamily from '../../../constant/fontFamily'
import colors from '../../../constant/colors'

const ProceedPayment = ({navigation}) => {
  return (
    <ImageBackground 
    source={require('../../../assets/img/Login/back.png')} 
    style={[globalStyle.container,globalStyle.justifyCenter,{padding:0}]}>
    {/* <Subs></Subs> */}
    <View style={{backgroundColor:'#fff',padding:10}}>
        <Text style={{fontSize:20,textAlign:'center',
        fontFamily:fontFamily.SemiBold,color:'#000'}}>Subscribe for <Text style={{color:colors.secondry}}>Pomona+</Text></Text>
        <Text style={[globalStyle.paragraph,{fontSize:11},globalStyle.textCenter]}>Subscribe for unlimited features and access to upcoming Pomona+ tools, to support your healing journey</Text>
        <View style={styles.row}>
            <Sub1></Sub1>
            <View style={{width:'90%'}}>
                <Text style={styles.head}>Unlimited Custom Templates</Text>
                <Text style={[globalStyle.paragraph,{fontSize:11}]}>Create your own custom templates</Text>
            </View>
        </View>
        <View style={styles.row}>
            <Sub2></Sub2>
            <View style={{width:'90%'}}>
                <Text style={styles.head}>Pomona+ Member Badge</Text>
                <Text style={[globalStyle.paragraph,{fontSize:11}]}>Show your commitment to your health & wellness</Text>
            </View>
        </View>
        <View style={styles.row}>
            <Sub3></Sub3>
            <View style={{width:'90%'}}>
                <Text style={styles.head}>Access to Upcoming Features</Text>
                <Text style={[globalStyle.paragraph,{fontSize:11}]}>Don’t miss out on new Pomona+ releases to accelerate your healing journey with our Pomona Wellness tools</Text>
            </View>
        </View>
        <TouchableOpacity 
        style={{backgroundColor:colors.primary,padding:15,
        justifyContent:'center',borderRadius:5}} onPress={()=>navigation.navigate('CreateFromScratch')}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontFamily:fontFamily.Regular}}>unlock now</Text>
                <View>
                    <Text style={{color:'#fff',fontFamily:fontFamily.Regular}}>$1.99 per mont</Text>
                </View>
            </View>
        </TouchableOpacity>
        <Text style={[globalStyle.paragraph,{fontSize:11},globalStyle.textCenter]}>Unlock now and enjoy a 7 day money back guarantee</Text>
    </View>
    </ImageBackground>
  )
}

export default ProceedPayment

const styles = StyleSheet.create({
    head:{
        color:'#000',
        fontFamily:fontFamily.Medium
    },
    row:{
        flexDirection:'row',
        marginTop:'5%',
        padding:10
    }
})
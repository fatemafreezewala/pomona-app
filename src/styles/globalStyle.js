import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constant/colors";
import fontFamily from "../constant/fontFamily";
const globalStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white,
      padding:15
    },
    heading:{
        fontFamily:fontFamily.AltaRegular,
        fontSize:30,
        color:colors.darkBrown,
        
    },
    paragraph:{
        fontFamily:fontFamily.Regular,
        fontSize:14,
        color:colors.midGrey,
        lineHeight:20
    },
    sectionHead:{
        fontFamily:fontFamily.Medium,
        fontSize:16,
        color:colors.midGrey,
        textAlign:'center'
    },
    mt10:{
        marginTop:'10%'
    },
    mt5:{
        marginTop:'5%'
    },

    w95:{
        width:'95%'
    },
    alignSelf:{
        alignSelf:'center'
    },
    mb5:{
        marginBottom:'5%'
    },
    mb10:{
        marginBottom:'10%'
    },
    justifyCenter:{
        justifyContent:'center',
        
    },
    textSecondary:{
        color:colors.secondry
    },
    textCenter:{
        textAlign:'center'
    },
    fs15:{
        fontSize:15
    },
    rowCenter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    alignItemCenter:{
        alignItems:'center'
    },
    rowSpaceBetween:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    ml5:{
        marginLeft:'5%'
    },
    ml10:{
        marginLeft:'10%'
    },
    dullBackground:{
        backgroundColor:'#e6eae1'
    },
    innerContainer:{
        width:'100%',
        padding:15
    },
    textLeft:{
        textAlign:'left'
    }
  });

  
  export default globalStyle;
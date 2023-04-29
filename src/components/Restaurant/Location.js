import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Loc from '../../assets/img/Restaurant/loc.svg'
import colors from '../../constant/colors'
import globalStyle from '../../styles/globalStyle'

const Location = ({address,onPress}) => {

  // console.log(address)
  return (
    <View style={[globalStyle.rowSpaceBetween,{backgroundColor:'#fff',padding:15,borderRadius:10}]}>
        <Loc></Loc>
      <Text style={{width:'85%',fontSize:10,color:'#000',marginLeft:10}}> {address} </Text>
      {/* <TouchableOpacity onPress={onPress} style={{backgroundColor:colors.primary,borderRadius:10,padding:10,paddingVertical:15}}>
        <Text style={{fontSize:10,color:'#fff'}}>Change Location</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default Location

const styles = StyleSheet.create({})
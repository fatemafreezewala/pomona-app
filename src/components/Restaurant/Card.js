import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';
import imageApi from '../../constant/imageApi';

const Card = ({item, onPress, type}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          globalStyle.rowSpaceBetween,
          globalStyle.mt5,
          {backgroundColor: colors.white, borderRadius: 5, padding: 10},
        ]}>
        {item.restaurant_type && item.restaurant_type.includes('Gluten Free') 
        && (<View style={{width:30,height:30,borderRadius:5,backgroundColor:'orange',
        position:'absolute',top:0,right:0,justifyContent:'center'}}>
          <Text style={{color:'#fff',textAlign:'center',fontSize:12}}>GF</Text></View>)}

        {item.restaurant_LogoUrl == '' ? (
          <Image
            style={{width: 60, height: 60}}
            source={require('../../assets/img/logo.png')}></Image>
        ) : (
          <Image
            style={{
              width: '22%',
              height: 70,
              borderRadius: 10,
              marginRight: 10,
            }}
            source={{uri: imageApi + item.restaurant_LogoUrl}}></Image>
        )}
        <View style={{width: '75%'}}>
          <Text
            style={{
              fontFamily: fontFamily.Medium,
              color: '#000',
              fontSize: 16,
            }}>
            {item.restaurant_name}{' '}
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.Regular,
              color: '#565555',
              fontSize: 12,
              marginTop: 5,
            }}>
            {item.restaurant_address},{item.restaurant_address_city},
            {item.restaurant_address_state},{item.restaurant_country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({});

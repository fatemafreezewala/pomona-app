import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import fontFamily from '../../constant/fontFamily';

const CreateNew = ({navigation}) => {
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <View style={[{height: 50, flexDirection: 'row', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.ml10, globalStyle.paragraph]}>
              Templates
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
            fontFamily: fontFamily.Medium,
          }}>
          Create New
        </Text>
        <View></View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateFromScratchNew')}
        style={[
          globalStyle.rowSpaceBetween,
          globalStyle.mt10,
          {backgroundColor: colors.white, padding: 15, borderRadius: 5},
        ]}>
        <Text style={globalStyle.paragraph}>Create from Scratch</Text>
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: colors.white,
              textDecorationLine: 'line-through',
            }}>
            Premium
          </Text>
          <Text style={{fontSize: 12, color: colors.white}}>Free</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChooseTemp')}
        style={[
          globalStyle.rowSpaceBetween,
          globalStyle.mt5,
          {
            backgroundColor: colors.white,
            padding: 15,
            borderRadius: 5,
            paddingVertical: 20,
          },
        ]}>
        <Text style={globalStyle.paragraph}>Choose from Template</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNew;

const styles = StyleSheet.create({});

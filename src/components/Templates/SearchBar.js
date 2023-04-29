import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import ANT from 'react-native-vector-icons/AntDesign';
import globalStyle from '../../styles/globalStyle';
import fontFamily from '../../constant/fontFamily';
const SearchBar = ({onChangeText}) => {
  return (
    <View
      style={[
        globalStyle.rowSpaceBetween,
        {
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        },
      ]}>
      <TextInput
        onChangeText={onChangeText}
        style={{fontFamily: fontFamily.Regular, color: '#000'}}
        placeholder="Search  Items or Categories" placeholderTextColor={'grey'}></TextInput>
      <ANT size={25} name="search1"></ANT>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});

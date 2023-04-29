import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import fontFamily from '../../constant/fontFamily';
import CTextInput from '../../components/Login/CTextInput';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constant/api';
import {useToast} from 'react-native-toast-notifications';

const TitleDesp = ({route, navigation}) => {
  const {items} = route.params;
  const toast = useToast();
  const [title, setTitle] = React.useState('');
  const [desp, setDesp] = React.useState('');
  const [color, setColor] = React.useState('#F4A060');
  const [loading, setLoading] = React.useState(false);
  const addAllegryTemplate = async () => {
    console.log(title);
    if (title != '' && desp != '') {
      let usera = await AsyncStorage.getItem('USER');
      usera = JSON.parse(usera);
      setLoading(true);
      api
        .post('?action=addAllergyTemplate', {
          user_id: usera.u_id,
          user_template_title: title,
          user_template_desp: desp,
          user_selected_temp_id: '0',
          user_template_items: items.toString(),
          user_allergy_temp_color: color,
        })
        .then(res => {
          if (res.data.status == '200') {
            toast.show('Template Added Successfully.');
            navigation.navigate('Templates', {user: res.data.data});
          } else {
            toast.show('Unable to add template.', {type: 'danger'});
          }
        })
        .catch(err => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.show('All fields are required.', {type: 'warning'});
    }
  };
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <View style={[{height: 50, flexDirection: 'row', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.ml10, globalStyle.paragraph]}>back</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
            fontFamily: fontFamily.Medium,
          }}>
          Create new template
        </Text>
        <View></View>
      </View>
      <View style={{flex: 1}}>
        <View style={globalStyle.mt10}></View>
        <CTextInput
          onChange={setTitle}
          placeholder="Enter template title"></CTextInput>
        <TextInput
          onChangeText={setDesp}
          textAlignVertical="top"
          style={{
            height: 50,
            backgroundColor: '#fff',
            marginTop: 10,
            paddingLeft: 15,
            minHeight: 150,
            borderWidth: 1,
            borderRadius: 8,
            color: '#000',
            fontFamily: fontFamily.Regular,
            width: '100%',
            alignSelf: 'center',
          }}
          multiline
          placeholderTextColor="#000"
          numberOfLines={5}
          placeholder="Enter description or personel note"></TextInput>
        <Text
          style={[
            {fontSize: 15, color: colors.black, fontFamily: fontFamily.Medium},
            globalStyle.mt5,
          ]}>
          Choose a color for your template
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <FlatList
            horizontal
            data={[
              {color: '#F4A060'},
              {color: '#E4E1D7'},
              {color: '#DFD2BF'},
              {color: '#E08A63'},
              {color: '#A6AD5F'},
            ]}
            keyExtractor={item => item.color}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setColor(item.color);
                }}
                style={{
                  width: 35,
                  marginLeft: 15,
                  height: 35,
                  borderRadius: 35,
                  backgroundColor: item.color,
                  borderWidth: item.color == color ? 3 : 0,
                }}></TouchableOpacity>
            )}></FlatList>
        </View>
      </View>
      <Button
        loading={loading}
        onPress={() => {
          addAllegryTemplate();
        }}
        title="Create Template"></Button>
    </View>
  );
};

export default TitleDesp;

const styles = StyleSheet.create({});

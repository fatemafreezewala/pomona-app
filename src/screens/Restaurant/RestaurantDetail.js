import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import Phone from '../../assets/img/Restaurant/phone.svg';
import Email from '../../assets/img/Restaurant/email.svg';
import Loc from '../../assets/img/Restaurant/loc.svg';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import ShareA from '../../assets/img/Restaurant/share.svg';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';
import {Divider} from 'react-native-paper';
import Pills from '../../components/Restaurant/PillDetails';
import Home from '../../assets/img/Restaurant/home.svg';
import Salad from '../../assets/img/Restaurant/salad.svg';
import Pin from '../../assets/img/Restaurant/pin.svg';
import imageApi from '../../constant/imageApi';
import Share from 'react-native-share';
import Location from './Location';
const RestaurantDetail = ({route, navigation}) => {
  const {item} = route.params;
  const [modalVisible, setModalVisible] = React.useState(false);

  const pillData = [
    {
      id: 1,
      img: <Home></Home>,
      title: item.restaurant_type ? item.restaurant_type.toString() : 'Type',
    },
    {
      id: 2,
      img: <Salad></Salad>,
      title: item.restaurant_Cuisine
        ? item.restaurant_Cuisine.toString()
        : 'Cuisine',
    },
    // {id:3,img:<Pin></Pin>,title:'Location'}
  ];
  const onShareRestro = () => {
    Share.open({
      url: item.restaurant_website,
      title: item.restaurant_name,
      message: item.restaurant_name + '\n' + item.restaurant_Description + '\n',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  return (
    <View
      style={[globalStyle.container, globalStyle.dullBackground, {padding: 0}]}>
      <View
        style={[
          globalStyle.rowSpaceBetween,
          {height: 50, paddingRight: 10, backgroundColor: '#fff'},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.ml10, globalStyle.paragraph]}>back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onShareRestro();
          }}>
          <ShareA></ShareA>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {item.restaurant_LogoUrl != '' ? (
          <Image
            style={{width: '100%', height: 180}}
            source={{uri: imageApi + item.restaurant_LogoUrl}}></Image>
        ) : (
          <Image
            style={{alignSelf: 'center'}}
            source={require('../../assets/img/logo.png')}></Image>
        )}

        <Text style={[styles.boxhead, {fontSize: 18, margin: '3%'}]}>
          {item.restaurant_name}
        </Text>
        <View style={{flexDirection: 'row', width: '95%', alignSelf: 'center'}}>
          <FlatList
            horizontal
            data={pillData}
            renderItem={({item, index}) => (
              <Pills index={index} item={item}></Pills>
            )}
            keyExtractor={item => item.id}></FlatList>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxhead}>Restaurant Description</Text>
          <Text style={styles.desp}>{item.restaurant_Description}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxhead}>Contact Information</Text>
          <View style={[globalStyle.rowSpaceBetween, globalStyle.mt5]}>
            <View style={globalStyle.rowCenter}>
              <Phone></Phone>
              <Text style={[styles.desp, globalStyle.ml5]}>Phone</Text>
            </View>
            <Text style={styles.desp}>{item.restaurant_phone}</Text>
          </View>
          {item.restaurant_website && (
            <View style={[globalStyle.rowSpaceBetween, globalStyle.mt5]}>
              <View style={globalStyle.rowCenter}>
                <Email></Email>
                <Text style={[styles.desp, globalStyle.ml5]}>Website</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Website', {url: item.restaurant_website})
                }>
                <Text
                  style={[
                    styles.desp,
                    {color: colors.linkBlue, textDecorationLine: 'underline'},
                  ]}>
                  {item.restaurant_website}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.box}>
          <View style={globalStyle.rowCenter}>
            <Loc></Loc>
            <Text
              style={{
                color: colors.linkBlue,
                fontFamily: fontFamily.Medium,
                width: '90%',
                marginLeft: 15,
              }}>
              {item.restaurant_address},{item.restaurant_address_city},
              {item.restaurant_address_state},{item.restaurant_country}
            </Text>
          </View>
          <View>
            <Divider style={[globalStyle.mt5, globalStyle.mb5]}></Divider>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Location', {
                  lat: item.restaurant_location_coordinates_Lat,
                  long: item.restaurant_location_coordinates_Long,
                  title: item.restaurant_name,
                  desp: item.restaurant_Description,
                })
              }>
              <Text
                style={{
                  color: colors.linkBlue,
                  fontFamily: fontFamily.Regular,
                  marginLeft: 15,
                  textAlign: 'center',
                }}>
                View on map
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.box, globalStyle.mb5]}>
          <Text style={[styles.boxhead, {fontSize: 14}]}>Posted By - </Text>
          {item.restaurant_created_by == 'admin' ? (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 60, height: 60}}
                  source={require('../../assets/img/logo.png')}></Image>
                <Text style={[styles.boxhead, globalStyle.ml5, {fontSize: 14}]}>
                  Pomona App Admin
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 60, height: 60, borderRadius: 60}}
                  source={{uri: imageApi + item.u_profile}}></Image>
                <Text style={[styles.boxhead, globalStyle.ml5, {fontSize: 14}]}>
                  {item.u_profilename}
                </Text>
              </View>
              <Divider style={[globalStyle.mt5, globalStyle.mb5]}></Divider>
              <Text style={styles.boxhead}>Author Note - </Text>
              <Text style={styles.desp}>
                {item.restaurant_allergyCommitmentMessage}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    width: '95%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  boxhead: {
    color: colors.black,
    fontFamily: fontFamily.SemiBold,
    fontSize: 16,
  },
  desp: {
    color: colors.black,
    fontFamily: fontFamily.Regular,
    fontSize: 14,
    lineHeight: 18,
    marginTop: 10,
  },
});

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext} from 'react';
import globalStyle from '../styles/globalStyle';
import Bell from '../assets/img/Home/Bell.svg';
import Insight from '../assets/img/Home/insight.svg';
import Arrow from '../assets/img/Home/arrow.svg';
import fontFamily from '../constant/fontFamily';
import Button from '../components/Button';
import FlatlistComp from '../components/FlatlistComp';
import TemplateList from '../components/Home/TemplateList';
import colors from '../constant/colors';
import api from '../constant/api';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageApi from '../constant/imageApi';
import AppContext from '../context/AppContext';
import moment from 'moment';
const Home = ({navigation}) => {
  const [getTemplate, setGetTemplate] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const user = React.useState();
  const {puser, setUser} = useContext(AppContext);
  const [IfMarked, setIfMarked] = React.useState('');
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTemplateData(puser && puser.u_id);
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (puser) {
      getTemplateData(puser.u_id);
      return () => {
        getTemplateData(puser.u_id);
      };
    }
  }, [puser]);

  const getTemplateData = async id => {
    if (id) {
      setLoading(true);
      api
        .post('?action=getAllergyTempByID', {
          user_id: id,
        })
        .then(res => {
          setGetTemplate(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        })
        
      api
        .post('?action=getTodaysMood', {
          user_id: id,
          mt_date: moment().format('DD-MM-YYYY'),
        })
        .then(res => {
          setIfMarked(res.data.status);
        })
        .catch(err => {})
    }
  };

  const items = ({item}) => {
    return (
      <TemplateList
        key={item.user_template_id}
        onPress={() =>
          navigation.navigate('TemplateDetails', {item: item, user: user})
        }
        item={item}></TemplateList>
    );
  };

  return (
    <View
      style={[globalStyle.container, globalStyle.dullBackground, {padding: 0}]}>
      <View style={[globalStyle.rowSpaceBetween, {padding: 15}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Options')}
          style={[globalStyle.rowSpaceBetween]}>
          {!puser?.u_profile || puser?.u_profile == '' ? (
            <Image
              style={{width: 50, height: 50, borderRadius: 10}}
              source={require('../assets/img/logo.png')}></Image>
          ) : (
            <Image
              style={{width: 50, height: 50, borderRadius: 10}}
              source={{uri: imageApi + puser?.u_profile}}></Image>
          )}
          <Text style={[globalStyle.heading, {fontSize: 20}, globalStyle.ml5]}>
            Hi {puser && puser.u_fullname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Bell></Bell>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#e6eae1'}}>
          {IfMarked == '200' ? (
            <View
              //source={require('../assets/img/Home/frame.png')}
              style={{
                width: '96%',
                height: 200,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: colors.secondry,
                borderRadius: 15,
              }}>
              <View>
                <Text
                  style={[
                    {
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: 20,
                      fontFamily: fontFamily.Regular,
                    },
                  ]}>
                  Greetings
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 20,
                    fontFamily: fontFamily.Regular,
                  }}>
                  Have a good day.
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[
                {
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 15,
                  marginHorizontal: 15,
                },
                globalStyle.mt5,
              ]}>
              <Text
                style={[
                  {
                    fontSize: 22,
                    color: '#000',
                    fontFamily: fontFamily.Medium,
                    textAlign: 'center',
                  },
                  globalStyle.mt5,
                ]}>
                Good afternoon
              </Text>
              <Text
                style={[
                  {
                    fontSize: 16,
                    color: '#000',
                    fontFamily: fontFamily.Regular,
                    textAlign: 'center',
                  },
                  globalStyle.mt5,
                ]}>
                How do you feel right now?
              </Text>
              <Button
                onPress={() => navigation.navigate('Feelings')}
                style={[globalStyle.mt5, globalStyle.mb5]}
                title="Record your Feeling"></Button>
            </View>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Insights')}>
            <View
              style={[
                globalStyle.rowSpaceBetween,
                globalStyle.mt5,
                {
                  marginHorizontal: 15,
                  marginBottom: 15,
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 15,
                },
              ]}>
              <Insight></Insight>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    fontFamily: fontFamily.Medium,
                  }}>
                  Your Insights
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.Regular,
                    color: 'grey',
                  }}>
                  Check your last 7 day insight
                </Text>
              </View>
              <Arrow></Arrow>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            {
              backgroundColor: '#fff',
              borderTopStartRadius: 30,
              borderTopRightRadius: 30,
            },
            globalStyle.mt5,
          ]}>
          <Text
            style={[
              {
                fontSize: 18,
                fontFamily: fontFamily.Medium,
                color: colors.black,
                marginHorizontal: 15,
                marginTop: 20,
              },
              globalStyle.mb5,
            ]}>
            Allergy Templates
          </Text>
          <Loader loading={loading}></Loader>
          {getTemplate.length != 0 ? (
            <FlatlistComp 
              style={{backgroundColor: '#fff', flex: 1}}
              DATA={getTemplate}
              renderItem={items}></FlatlistComp>
          ) : (
            <Text style={{color: colors.primary, margin: 15,fontFamily:fontFamily.Medium}}>
              No Allergy Templates Found
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import React, {useContext} from 'react';
import Photo from '../../assets/img/Login/photo.svg';
import globalStyle from '../../styles/globalStyle';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constant/colors';
import ICON3 from '../../assets/img/Profile/share.svg';
import ICON4 from '../../assets/img/Profile/feedback.svg';
import ICON5 from '../../assets/img/Profile/customer.svg';
import ICON6 from '../../assets/img/Profile/comment.svg';
import ICON7 from '../../assets/img/Profile/restaurant.svg';
import ICON8 from '../../assets/img/Profile/instagram.svg';

import {Divider} from 'react-native-paper';
import fontFamily from '../../constant/fontFamily';
import Button from '../../components/Button';
import AuthContext from '../../navigation/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import imageApi from '../../constant/imageApi';
import Share from 'react-native-share';

const Options = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const menus = [
    //{id:1,name:'Manage Plan',icon:<ICON1></ICON1>,page:''},
    //{id:2,name:'View Subscription History',icon:<ICON2></ICON2>,page:''},
    {
      id: 3,
      name: 'My Restaurants',
      icon: <ICON7></ICON7>,
      page: 'MyRestaurant',
    },
    {id: 4, name: 'FAQ', icon: <ICON4></ICON4>, page: 'Faq'},
    {
      id: 5,
      name: 'Submit Feedback',
      icon: <ICON6></ICON6>,
      page: 'SubmitFeedback',
    },
    {id: 6, name: 'Share App', icon: <ICON3></ICON3>, page: ''},
    {id: 7, name: 'Get in Touch', icon: <ICON5></ICON5>, page: 'GetInTouch'},
    {id: 8, name: 'Terms & Conditions', icon: <ICON5></ICON5>, page: 'Terms'},
    {id: 7, name: 'Privacy Policy', icon: <ICON5></ICON5>, page: 'Policy'},
  ];
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let usera = await AsyncStorage.getItem('USER');
    usera = JSON.parse(usera);
    setUser(usera);
  };
  const logOut = async () => {
    signOut();
    await AsyncStorage.clear();
  };
  const onShare = async () => {
    var link = '';
    if (Platform.OS == 'ios') {
      link =
        'https://play.google.com/store/apps/details?id=com.pomona.wellness&hl=en';
    } else {
      link =
        'https://play.google.com/store/apps/details?id=com.pomona.wellness&hl=en';
    }
    try {
      const result = await Share.open({
        title: 'App link',
        message:
          'Please install Pomona app from store and get your customized allergy template.',
        url: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {}
  };
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <View
        style={[{flexDirection: 'row', alignItems: 'center',flex:1}, globalStyle.mt5]}>
        {user?.u_profile == '' ? (
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
            source={require('../../assets/img/logo.png')}></Image>
        ) : (
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              resizeMode: 'contain',
            }}
            source={{uri: imageApi + user?.u_profile}}></Image>
        )}
        <View style={{width:'80%'}}>
          <Text style={[globalStyle.heading, {fontSize: 18}, globalStyle.ml5]}>
            {user?.u_fullname}
          </Text>
          <View
            style={[
              {flexDirection: 'row', alignItems: 'center'},
              globalStyle.ml5,
            ]}>
            <Text style={[globalStyle.paragraph, {width: '80%'}]}>
              {user?.u_email}
            </Text>
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => navigation.navigate('EditProfile', {user: user})}>
              <FA5
                size={15}
                color={colors.secondry}
                style={{marginLeft: 5}}
                name="edit"></FA5>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyle.mt10}>
          <FlatList
            style={{borderRadius: 15}}
            data={menus}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.page == '') {
                    onShare();
                  } else {
                    navigation.navigate(item.page);
                  }
                }}
                style={styles.item}>
                {item.icon}
                <Text style={styles.label}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={props => {
              return <Divider></Divider>;
            }}></FlatList>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.instagram.com/pomonawellness/');
          }}
          style={[
            {flexDirection: 'row', alignItems: 'center'},
            globalStyle.mt10,
            globalStyle.mb10,
          ]}>
          <ICON8></ICON8>
          <Text style={styles.label}>Connect with Pomona</Text>
        </TouchableOpacity>
        <Button
          onPress={() => {
            Alert.alert('', 'Are you sure you want to logout?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  logOut();
                },
              },
            ]);
          }}
          title="Logout"></Button>
      </ScrollView>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#1E1E1D',
    fontFamily: fontFamily.Regular,
    marginLeft: 10,
  },
});

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import fontFamily from '../../constant/fontFamily';
import Photo from '../../assets/img/Login/photo.svg';
import CTextInput from '../../components/Login/CTextInput';
import CountryPicker from '../../components/Login/CountryPicker';
import Button from '../../components/Button';
import imageApi from '../../constant/imageApi';
import api from '../../constant/api';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import AppContext from '../../context/AppContext';

const EditProfile = ({route, navigation}) => {
  const {user} = route.params;
  const [userDetails, setUserDetails] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const {setUser} = React.useContext(AppContext);

  const [country, setCountry] = React.useState({
    cca2: user.u_cca,
    callingCode: [user.u_country_code],
  });
  const [error, setError] = React.useState('')
  const [image, setImage] = React.useState('');
  React.useEffect(() => {
    setUserDetails(user);
  }, []);

  const handleInput = (key, val) => {
    setUserDetails({...userDetails, [key]: val});
  };
  const onSuubmit = async () => {
    if (
      userDetails.u_email != '' &&
      userDetails.u_fullname != '' &&
      country.cca2 != '' &&
      userDetails.u_phone != '' &&
      userDetails.u_password != '' &&
      userDetails.u_profilename != ''
    ) {
      setLoading(true);
      var fdata = new FormData();
      fdata.append('u_email', userDetails.u_email);
      fdata.append('u_fullname', userDetails.u_fullname);
      fdata.append('u_profile', userDetails.u_profile);
      fdata.append('u_profilename', userDetails.u_profilename);
      fdata.append('u_country_code', country.callingCode[0]);
      fdata.append('u_cca', country.cca2);
      fdata.append('u_phone', userDetails.u_phone);
      fdata.append('u_password', userDetails.u_password);
      fdata.append('u_id', userDetails.u_id);
      if (image != '') {
        fdata.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: 'img.jpg',
        });
      } else {
        fdata.append('image', '');
      }
      api
        .post('?action=updateAccount', fdata, {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        .then(async res => {
          if (res.data.status == '200') {
            toast.show('Profile Updated.');
            setUser(res.data.data);
            await AsyncStorage.setItem('USER_TOKEN', res.data.data.u_id);
            await AsyncStorage.setItem('USER', JSON.stringify(res.data.data));
            navigation.navigate('Homes');
          } else {
            toast.show('Error While updating Account.', {type: 'danger'});
          }
        })
        .catch(err => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.show('Please fill all required fields.', {type: 'warning'});
    }
  };
  const UploadPic = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setError("Email is Not Correct");
      //handleInput('u_fullname', user.u_email);
      return false;
    }
    else {
      setError('')
      handleInput('u_email', text);
    }
  }
  return (
    <>
      <View
        style={[
          {height: 50, flexDirection: 'row', alignItems: 'center'},
          globalStyle.dullBackground,
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.ml10, globalStyle.paragraph]}>Back</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
            fontFamily: fontFamily.Medium,
          }}>
          Edit Profile
        </Text>
      </View>
      <View style={[globalStyle.container, globalStyle.dullBackground]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: 'center'}}>
            {image != '' && (
              <Image
                style={{width: 130, height: 120, borderRadius: 10}}
                source={{uri: image}}></Image>
            )}
            {image == '' && (
              <>
                {user.u_profile != '' ? (
                  <Image
                    style={{width: 130, height: 120, borderRadius: 10}}
                    source={{uri: imageApi + user?.u_profile}}></Image>
                ) : (
                  <Image source={require('../../assets/img/logo.png')}></Image>
                )}
              </>
            )}
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => {
                UploadPic();
              }}>
              <FA5
                size={15}
                color={colors.secondry}
                style={{
                  borderRadius: 15,
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#fff',
                  padding: 10,
                }}
                name="edit"></FA5>
            </TouchableOpacity>
          </View>

          <View
            style={[
              globalStyle.container,
              {paddingHorizontal: 0},
              globalStyle.dullBackground,
            ]}>
            <View style={globalStyle.innerContainer}>
              <View style={[globalStyle.mt10]}></View>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: fontFamily.Regular,
                  color: colors.black,
                }}>
                Full Name
              </Text>
              <CTextInput
                onChange={e => {
                  handleInput('u_fullname',e)
                }}
                defaultValue={user.u_fullname}
                placeholder="Full name"></CTextInput>
                
              <View style={[globalStyle.mt5]}></View>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: fontFamily.Regular,
                  color: colors.black,
                }}>
                Profile Name
              </Text>
              <CTextInput
                onChange={e => {
                  handleInput('u_profilename', e);
                }}
                defaultValue={user.u_profilename}
                placeholder="Profile name"></CTextInput>
              <View style={[globalStyle.mt5]}></View>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: fontFamily.Regular,
                  color: colors.black,
                }}>
                Email
              </Text>
              <CTextInput
                onChange={e => {
                  validate(e)
                }}
                defaultValue={user.u_email}></CTextInput>
                <Text style={{fontSize:12,color:'red'}}>{error}</Text>
              <View style={[globalStyle.mt5]}></View>
              <Text
                style={{
                  marginBottom: 5,
                  fontFamily: fontFamily.Regular,
                  color: colors.black,
                }}>
                Phone
              </Text>
              <CountryPicker
                country={country}
                setCountry={e => {
                  setCountry(e);
                  handleInput('u_country_code', e.callingCode[0]);
                }}
                setPhone={e => {
                  handleInput('u_phone', e);
                }}
                defaultValue={user.u_phone}></CountryPicker>
            </View>
          </View>

          <View style={{marginHorizontal: 15, marginTop: 10, borderRadius: 15}}>
            <View style={globalStyle.rowSpaceBetween}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: fontFamily.Medium,
                  fontSize: 16,
                }}>
                password & Security
              </Text>
              <Arrow></Arrow>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChangePassword', {user: userDetails});
              }}>
              <Text
                style={[
                  globalStyle.paragraph,
                  {color: colors.secondry},
                  globalStyle.mt5,
                ]}>
                Click here to update password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[globalStyle.mt5]}></View>

          <View style={{marginHorizontal: 15, marginTop: 10, borderRadius: 15}}>
            <View style={globalStyle.rowSpaceBetween}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: fontFamily.Medium,
                  fontSize: 16,
                }}>
                Close Account
              </Text>
            </View>

            <Text
              style={[
                globalStyle.paragraph,
                {color: colors.black},
                globalStyle.mt5,
              ]}>
              Do you need to close your account? Click here.
            </Text>
          </View>

          <View style={[globalStyle.mt5]}></View>
            {error == '' && ( <Button
            loading={loading}
            onPress={() => {
              onSuubmit();
            }}
            style={[
              globalStyle.w95,
              globalStyle.mt10,
              {backgroundColor: colors.secondry},
            ]}
            title="Save Changes"></Button>)}
         
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});

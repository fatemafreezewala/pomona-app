import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import Prof from '../../assets/img/Profile/resImg.svg';
import fontFamily from '../../constant/fontFamily';
import CTextInput from '../../components/Login/CTextInput';
import Button from '../../components/Button';
import Header from '../../components/Profile/Header';
import Home from '../../assets/img/Restaurant/home.svg';
import Salad from '../../assets/img/Restaurant/salad.svg';
import Pin from '../../assets/img/Restaurant/pin.svg';
import ImagePicker from 'react-native-image-crop-picker';
import Selector from '../../components/Restaurant/Selector';
import api from '../../constant/api';
import CityStateModal from '../../components/Restaurant/CityStateModal';
import {useToast} from 'react-native-toast-notifications';
import LocationModal from './LocationModal';
import CuisineSelector from '../../components/Restaurant/CuisineSelector';
import TypeSelector from '../../components/Restaurant/TypeSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';

const TitleDesp = ({navigation}) => {
  const [image, setimage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [type, setType] = React.useState('');
  const [mdata, setMdata] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [locationModal, setlocationModal] = React.useState(false);
  const [latlong, setLatLong] = React.useState();
  const [locationObj, setLocationObj] = React.useState();
  const [cuisineModal, setcuisineModal] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState(false);

  const [restaurantDetail, setRestaurantDetail] = React.useState({
    restaurant_name: '',
    restaurant_LogoUrl: '',
    restaurant_address: 'Pick Location from Google Maps',
    restaurant_address_city: 'City',
    restaurant_address_state: 'State',
    restaurant_address_postalCode: '',
    restaurant_country: 'Country',
    restaurant_phone: '',
    restaurant_website: '',
    restaurant_type: 'Select Type',
    restaurant_Cuisine: 'Cuisine',
    restaurant_Description: '',
    restaurant_badge: '',
    restaurant_allergyCommitmentMessage: '',
    restaurant_location_coordinates_Lat: '',
    restaurant_location_coordinates_Long: '',
    restaurant_overallrating: '',
  });
  const [StateLoader, setStateLoader] = React.useState(false);
  const [CityLoader, setCityLoader] = React.useState(false);

  const toast = useToast();
  React.useEffect(() => {
    Geocoder.init('AIzaSyBqGZecCZJXWPQM3YIe6p9wZCMIo88bEJc');
    getCountry();
  }, []);
  const getCountry = () => {
    setLoading(true);
    api
      .get('?action=getCountries')
      .then(res => {
        setCountries(res.data.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getState = id => {
    setStateLoader(true);
    api
      .post('?action=getState', {country_id: id})
      .then(res => {
        setState(res.data.data);
      })
      .catch(err => {})
      .finally(() => {
        setStateLoader(false);
      });
  };
  const getCities = id => {
    setCityLoader(true);
    api
      .post('?action=getCities', {state_id: id})
      .then(res => {
        setCities(res.data.data);
      })
      .catch(err => {})
      .finally(() => {
        setCityLoader(false);
      });
  };
  const validationRestro = () => {
    if (restaurantDetail.restaurant_name == '') {
      toast.show('Restro Name is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_Description == '') {
      toast.show('Restro Description is required', {type: 'warning'});
      return false;
    }
    if (
      restaurantDetail.restaurant_address == 'Pick Location from Google Maps'
    ) {
      toast.show('Restro Address is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_Cuisine == 'Cuisine') {
      toast.show('Restro Cuisine is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_allergyCommitmentMessage == '') {
      toast.show('Restro Message is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_type == 'Select Type') {
      toast.show('Restro Type is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_country == 'Country') {
      toast.show('Restro Country is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_address_state == 'State') {
      toast.show('Restro State is required', {type: 'warning'});
      return false;
    }
    if (restaurantDetail.restaurant_address_city == 'City') {
      toast.show('Restro City is required', {type: 'warning'});
      return false;
    }
    return true;
  };
  const addRestaurant = async () => {
    let usera = await AsyncStorage.getItem('USER');
    usera = JSON.parse(usera);

    if (validationRestro() == true) {
      setLoading(true);
      let formData = new FormData();
      formData.append('restaurant_name', restaurantDetail.restaurant_name);
      if(image != ''){
        formData.append('restaurant_LogoUrl', {
          uri: image,
          type: 'image/jpeg',
          name: 'img.jpg',
        });
      }
      
      formData.append('restaurant_address', locationObj.address);
      formData.append(
        'restaurant_address_city',
        restaurantDetail.restaurant_address_city,
      );
      formData.append(
        'restaurant_address_state',
        restaurantDetail.restaurant_address_state,
      );
      formData.append(
        'restaurant_address_postalCode',
        restaurantDetail.restaurant_address_postalCode,
      );
      formData.append(
        'restaurant_country',
        restaurantDetail.restaurant_country,
      );
      formData.append('restaurant_phone', restaurantDetail.restaurant_phone);
      formData.append(
        'restaurant_website',
        restaurantDetail.restaurant_website,
      );
      formData.append('restaurant_type', restaurantDetail.restaurant_type);
      formData.append(
        'restaurant_Cuisine',
        restaurantDetail.restaurant_Cuisine,
      );
      formData.append(
        'restaurant_Description',
        restaurantDetail.restaurant_Description,
      );
      formData.append('restaurant_badge', restaurantDetail.restaurant_badge);
      formData.append(
        'restaurant_allergyCommitmentMessage',
        restaurantDetail.restaurant_allergyCommitmentMessage,
      );
      formData.append('restaurant_location_coordinates_Lat', locationObj.lat);
      formData.append('restaurant_location_coordinates_Long', locationObj.lon);
      formData.append(
        'restaurant_overallrating',
        restaurantDetail.restaurant_overallrating,
      );
      formData.append('restaurant_created_by', usera.u_id);
      try {
        const res = await fetch(
          `https://bestdeveloping.com/pomona/api.php?action=addRestaurant`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setLoading(false);
        const json = await res.json();
        if (json.status == '200') {
          toast.show('Restaurant Added Susscessfully');
          navigation.goBack();
        } else {
          toast.show('Unable to Add Restaurant', {type: 'danger'});
        }
      } catch (error) {
        toast.show('Unable to Adf Restaurant', {type: 'danger'});
      } finally {
        setLoading(false);
      }
    }
  };
  const handleInput = (key, val) => {
    setRestaurantDetail({...restaurantDetail, [key]: val});
  };
  const UploadPic = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setimage(image.path);
    });
  };
  const onSelect = item => {
    if (type == 'country') {
      handleInput('restaurant_country', item.name);
      getState(item.id);
    } else if (type == 'state') {
      handleInput('restaurant_address_state', item.name);
      getCities(item.id);
    } else {
      handleInput('restaurant_address_city', item.name);
      Geocoder.from(item.name)
        .then(json => {
          var location = json.results[0].geometry.location;
          console.log(location);
          setLatLong(location);
        })
        .catch(error => {
          toast.show('Cannot decode location for this city',{type:'warning'})
        });
    }
  };
  const onLocation = locObj => {
    setLocationObj(locObj);
    handleInput('restaurant_address', locObj.address);
  };
  const multipleCuisineLogic = text => {
    if (restaurantDetail.restaurant_Cuisine == 'Cuisine') {
      if (text == 'ALL') {
        handleInput('restaurant_Cuisine', 'ALL');
      } else {
        handleInput('restaurant_Cuisine', text);
      }
    } else {
      if (text == 'ALL') {
        handleInput('restaurant_Cuisine', 'ALL');
      } else {
        if (restaurantDetail.restaurant_Cuisine == 'ALL') {
          handleInput('restaurant_Cuisine', text);
        } else {
          var cuisineArray = restaurantDetail.restaurant_Cuisine.split(',');
          if (cuisineArray.includes(text)) {
            const index = cuisineArray.indexOf(text);
            if (index > -1) {
              cuisineArray.splice(index, 1);
            }
            handleInput('restaurant_Cuisine', cuisineArray.toString());
          } else {
            if (restaurantDetail.restaurant_Cuisine == '') {
              handleInput('restaurant_Cuisine', text);
            } else {
              text = restaurantDetail.restaurant_Cuisine + ',' + text;
              handleInput('restaurant_Cuisine', text);
            }
          }
        }
      }
    }

    setcuisineModal(false);
  };
  const multipleTypeLogic = text => {
    if (restaurantDetail.restaurant_type == 'Select Type') {
      if (text == 'ALL') {
        handleInput('restaurant_type', 'ALL');
      } else {
        handleInput('restaurant_type', text);
      }
    } else {
      if (text == 'ALL') {
        handleInput('restaurant_type', 'ALL');
      } else {
        if (restaurantDetail.restaurant_type == 'ALL') {
          handleInput('restaurant_type', text);
        }else
        {
          var cuisineArray = restaurantDetail.restaurant_type.split(',');
          if (cuisineArray.includes(text)) {
            const index = cuisineArray.indexOf(text);
            if (index > -1) {
              cuisineArray.splice(index, 1);
            }
            handleInput('restaurant_type', cuisineArray.toString());
          } else {
            if (restaurantDetail.restaurant_type == '') {
              handleInput('restaurant_type', text);
            } else {
              text = restaurantDetail.restaurant_type + ',' + text;
              handleInput('restaurant_type', text);
            }
          }
        }
      }
    }
    setTypeModal(false);
  };
  return (
    <>
      <Header
        onPress={() => navigation.goBack()}
        title="Add new restaurant"></Header>

      <View style={[globalStyle.container, {padding: 0}]}>
        <View style={[globalStyle.container]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                UploadPic();
              }}>
              {image ? (
                <Image
                  style={{width: 150, height: 150, borderRadius: 20}}
                  source={{uri: image}}></Image>
              ) : (
                <Prof width={120} height={120}></Prof>
              )}
            </TouchableOpacity>
            <View style={{marginTop: 10}}></View>
            <CTextInput
              onChange={e => {
                handleInput('restaurant_name', e);
              }}
              placeholder="Name"></CTextInput>
            <View style={{marginTop: 5}}></View>
            <CTextInput
              onChange={e => {
                handleInput('restaurant_website', e);
              }}
              placeholder="Website (optional)"></CTextInput>
            <View style={{marginTop: 5}}></View>
            <CTextInput
              onChange={e => {
                handleInput('restaurant_phone', e);
              }}
              placeholder="Phone (optional)"></CTextInput>
            <View style={{marginTop: 5}}></View>
            <Selector
              onPress={() => {
                setType('country');
                setMdata(countries);
                setModalVisible(true);
              }}
              placeholder={restaurantDetail.restaurant_country}></Selector>

            <View style={{marginTop: 5}}></View>
            <Selector
              loading={StateLoader}
              onPress={() => {
                if (restaurantDetail.restaurant_country == 'Country') {
                  toast.show('Please select country', {type: 'warning'});
                } else {
                  setType('state');
                  setMdata(state);
                  setModalVisible(true);
                }
              }}
              placeholder={
                restaurantDetail.restaurant_address_state
              }></Selector>

            <View style={{marginTop: 5}}></View>
            <Selector
              loading={CityLoader}
              onPress={() => {
                if (restaurantDetail.restaurant_address_state == 'State') {
                  toast.show('Please select state', {type: 'warning'});
                } else {
                  setType('city');
                  setMdata(cities);
                  setModalVisible(true);
                }
              }}
              placeholder={restaurantDetail.restaurant_address_city}></Selector>

            <TextInput
              onChangeText={e => {
                handleInput('restaurant_Description', e);
              }}
              textAlignVertical="top"
              style={styles.despBox}
              multiline
              placeholderTextColor="#000"
              numberOfLines={5}
              placeholder="Description"></TextInput>

            <TouchableOpacity
              onPress={() => {
                setTypeModal(true);
              }}
              style={styles.pillRow}>
              <Home></Home>
              <Text
                style={{
                  color: '#000',
                  fontFamily: fontFamily.Regular,
                  marginLeft: 5,
                }}>
                {restaurantDetail.restaurant_type}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setcuisineModal(true);
              }}
              style={styles.pillRow}>
              <Salad></Salad>
              <Text
                style={{
                  color: '#000',
                  fontFamily: fontFamily.Regular,
                  marginLeft: 5,
                }}>
                {restaurantDetail.restaurant_Cuisine}
              </Text>
            </TouchableOpacity>
            {latlong && (
              <TouchableOpacity
                onPress={() => {
                  setlocationModal(true);
                }}
                style={styles.pillRow}>
                <Pin></Pin>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: fontFamily.Regular,
                    marginLeft: 5,
                  }}>
                  {restaurantDetail.restaurant_address}
                </Text>
              </TouchableOpacity>
            )}
            <TextInput
              onChangeText={e => {
                handleInput('restaurant_allergyCommitmentMessage', e);
              }}
              textAlignVertical="top"
              style={styles.despBox}
              multiline
              placeholderTextColor="#000"
              numberOfLines={5}
              placeholder="Short Message About Restro"></TextInput>
            <View style={globalStyle.mt5}></View>
          </ScrollView>
          <Button
            loading={loading}
            onPress={() => {
              addRestaurant();
            }}
            title="Add Place"></Button>
        </View>
        {latlong && (
          <LocationModal
            onLocation={onLocation}
            lat={latlong.lat}
            lon={latlong.lng}
            locationModal={locationModal}
            setlocationModal={setlocationModal}></LocationModal>
        )}
        <CuisineSelector 
          onCusineSelect={text => {
            multipleCuisineLogic(text);
          }}
          modalVisible={cuisineModal}
          Cuisine={restaurantDetail.restaurant_Cuisine}
          setModalVisible={setcuisineModal}></CuisineSelector>
        <TypeSelector
          onCusineSelect={text => {
            multipleTypeLogic(text);
          }}
          typeModal={typeModal}
          setTypeModal={setTypeModal}></TypeSelector>
        <CityStateModal
          onSelect={onSelect}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          data={mdata}></CityStateModal>
      </View>
    </>
  );
};

export default TitleDesp;

const styles = StyleSheet.create({
  despBox: {
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
  },
  pillRow: {
    minHeight: 50,
    backgroundColor: '#fff',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 8,
    color: '#000',
    fontFamily: fontFamily.Regular,
    width: '100%',
    alignSelf: 'center',
  },
});

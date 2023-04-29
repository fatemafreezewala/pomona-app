import {
  FlatList,
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  Text
} from 'react-native';
import React, {useEffect} from 'react';
import InnerPageHeading from '../../components/InnerPageHeading';
import globalStyle from '../../styles/globalStyle';
import Card from '../../components/Restaurant/Card';
import Location from '../../components/Restaurant/Location';
import Pin from '../../assets/img/Restaurant/pin.svg';
import Home from '../../assets/img/Restaurant/home.svg';
import Salad from '../../assets/img/Restaurant/salad.svg';
import Pills from '../../components/Restaurant/Pills';
import api from '../../constant/api';
import Loader from '../../components/Loader';
import Geolocation from 'react-native-geolocation-service';
import {Searchbar} from 'react-native-paper';
import fontFamily from '../../constant/fontFamily';
import CuisineSelector from '../../components/Restaurant/CuisineSelector';
import TypeSelector from '../../components/Restaurant/TypeSelector';
import colors from '../../constant/colors';
import CityStateModal from '../../components/Restaurant/CityStateModal';
import {useToast} from 'react-native-toast-notifications';

const Index = ({route, navigation}) => {
  const {lat, lon, address} = route.params;
  const [getRestaurants, setGetRestaurants] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [caddress, setAddress] = React.useState({
    address:'Fetching Address...'
  });
  const [cusineModal, setCusineModal] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [state, setState] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [StateLoader, setStateLoader] = React.useState(false);
  const [CityLoader, setCityLoader] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [mdata, setMdata] = React.useState([]);
  const [type, setType] = React.useState('');
  const toast = useToast();
  const [filter, setFilter] = React.useState({
    type: [],
    cuisine: [],
    term: '',
    state: '',
    country: '',
    city: '',
  });

  const pillData = [
    {
      id: 1,
      img: <Home></Home>,
      title: filter.type.length == 0 ? 'Type' : filter.type.toString(),
      onPress: () => {
        setTypeModal(true);
      },
    },
    {
      id: 2,
      img: <Salad></Salad>,
      title: filter.cuisine.length == 0  ? 'Cuisine' : filter.cuisine.toString(),
      onPress: () => {
        setCusineModal(true);
      },
    },
    {
      id: 3,
      img: <Pin></Pin>,
      title: filter.country,
      onPress: () => {
        setType('country');
        setMdata(countries);
        setModalVisible(true);
      },
    },
    {
      id: 4,
      img: <Pin></Pin>,
      title: filter.state == '' ? 'States' : filter.state,
      onPress: () => {
        setType('state');
        setMdata(state);
        setModalVisible(true);
      },
    },
    {
      id: 5,
      img: <Pin></Pin>,
      title: filter.city == '' ? 'City' : filter.city,
      onPress: () => {
        setType('city');
        setMdata(cities);
        setModalVisible(true);
      },
    },
  ];

  const items = ({item, index}) => {
    if (filter.type.length) {
     
      if (
        item.restaurant_type.length >= filter.type.length &&
        filter.type.every(elem => item.restaurant_type.indexOf(elem) > -1)
      ) {
        if(filter.cuisine.length){
          if (
            item.restaurant_Cuisine.length >= filter.cuisine.length &&
            item.restaurant_Cuisine.every(elem => filter.cuisine.indexOf(elem) > -1)
          ){
            return (
              <Card
              type={item.restaurant_type}
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {item: item})
                }
                item={item}></Card>
            );
          }
          
        }else{
          return (
            <Card
              type={item.restaurant_type}
              onPress={() =>
                navigation.navigate('RestaurantDetail', {item: item})
              }
              item={item}></Card>
          );
        }
        
      }
    } else {
      
      if(filter.cuisine.length){
        if (
          item.restaurant_Cuisine.length >= filter.cuisine.length &&
          item.restaurant_Cuisine.every(elem => filter.cuisine.indexOf(elem) > -1)
        ){
          return (
            <Card
            type={item.restaurant_type}
              onPress={() =>
                navigation.navigate('RestaurantDetail', {item: item})
              }
              item={item}></Card>
          );
        }
        
      }else{
        return (
          <Card
          type={item.restaurant_type}
            onPress={() =>
              navigation.navigate('RestaurantDetail', {item: item})
            }
            item={item}></Card>
        );
      }
    }
  };

  useEffect(() => {
    getCurrent();
    getCountry();
  }, []);
  const getResto = item => {
    setLoading(true);
    api
      .post('?action=getRestaurants', {
        offset: 0,
        state: item.state,
        country: item.country,
        city: item.city,
        type: item.type,
        cuisine: item.cuisine,
        term: item.term,
      })
      .then(res => {
        setGetRestaurants(res.data.data);
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
        setLoading(false)
      })
     
  };
  //Location Functions
  const getCurrent = () => {
    Geolocation.getCurrentPosition(
      position => {
        getCityCountry(position.coords.latitude, position.coords.longitude);
      },
      error => {
        requestPermission();
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        forceRequestLocation: true,
      },
    );
  };
  const getCityCountry = (lat, lng) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        lat +
        ',' +
        lng +
        '&key=' +
        'AIzaSyA-hBc-fIpA-k0SeDXpyr1SVjU2cvkK3NY',
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.results[0].address_components)
        getState('','country_name',responseJson.results[0].address_components[6].long_name);
        getCities('','state_name',responseJson.results[0].address_components[5].long_name);
        setAddress({
          streetAddress:
            responseJson.results[0].address_components[1].long_name,
          city: responseJson.results[0].address_components[3].long_name,
          state: responseJson.results[0].address_components[5].long_name,
          country: responseJson.results[0].address_components[6].long_name,
          landmark: responseJson.results[0].address_components[1].long_name,
          postalCode: responseJson.results[0].address_components[6].long_name,
          lat: lat,
          lng: lng,
          address: responseJson.results[0].formatted_address,
        });
        getResto({
          type: '',
          cuisine: '',
          term: '',
          city: responseJson.results[0].address_components[3].long_name,
          state: responseJson.results[0].address_components[5].long_name,
          country: responseJson.results[0].address_components[6].long_name,
        });
        setFilter({
          type: [],
          cuisine: [],
          term: '',
          city: responseJson.results[0].address_components[3].long_name,
          state: responseJson.results[0].address_components[5].long_name,
          country: responseJson.results[0].address_components[6].long_name,
        });
      });
  };
  const requestPermission = async () => {
    if (Platform.OS == 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      getCurrent();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrent();
        } else {
          requestPermission();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleInputs = (key, val) => {
    setFilter({...filter, [key]: val});
    getResto({...filter, [key]: val});
  };
  const getCountry = () => {
    setLoading(true);
    api
      .get('?action=getCountries')
      .then(res => {
        setCountries(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  };
  const getState = (id,types,country_name) => {
    // if(types == ''){
    //   handleInputs('state','')
    // }
    setStateLoader(true);
    api
      .post('?action=getState', {country_id: id,type:types,country_name:country_name})
      .then(res => {
        setState(res.data.data);
        setStateLoader(false);
      })
      .catch(err => {
        setStateLoader(false);
      })
  };
  const getCities = (id,types,state_name) => {
    console.log({state_id: id,types:types,state_name:state_name})
    setCityLoader(true);
    api
      .post('?action=getCities', {state_id: id,types:types,state_name:state_name})
      .then(res => {
        setCities(res.data.data);
        setCityLoader(false);
      })
      .catch(err => {
        setCityLoader(false);
      })
    
  };
  const onSelect = item => {
    let formalFilter = filter
    if (type == 'country') {
      //handleInputs('country', item.name);
      formalFilter.country =  item.name
      formalFilter.state = '';
      formalFilter.city = '';
      setFilter(formalFilter)
      toast.show("Select State and City",{type:"warning"})
      getState(item.id,'','');
      getResto(formalFilter)
    } else if (type == 'state') {
      formalFilter.state = item.name;
      formalFilter.city = '';
      setFilter(formalFilter)
      toast.show("Please Select City",{type:"warning"})
      getCities(item.id,'','');
      getResto(formalFilter)
    } else {
      handleInputs('city', item.name);
    }
  };
  const ontypeSelect = text => {
    setTypeModal(false)
    if(text == 'ALL'){
      handleInputs('type', []);
    }else{
      if (filter.type.includes(text)) {
        const index = filter.type.indexOf(text);
        if (index > -1) {
          filter.type.splice(index, 1);
        }
        handleInputs('type', filter.type);
      } else {
        let newArr = filter.type;
        newArr.push(text);
        handleInputs('type', newArr);
      }
    }
  };
  const onCusineSelect = (text) =>{
    setCusineModal(false)
    if(text == 'ALL'){
      handleInputs('cuisine', []);
    }else{
      if (filter.cuisine.includes(text)) {
        const index = filter.cuisine.indexOf(text);
        if (index > -1) {
          filter.cuisine.splice(index, 1);
        }
        handleInputs('cuisine', filter.cuisine);
      } else {
        let newArr = filter.cuisine;
        newArr.push(text);
        handleInputs('cuisine', newArr);
      }
    }
  }
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <InnerPageHeading
        title="Restaurants"
        subtitle="Explore place near you"></InnerPageHeading>
      <View style={globalStyle.mt5}></View>
      <Location
        onPress={() =>
          navigation.navigate('ChangeLocation', {
            address: caddress.address,
            lat: caddress.lat,
            lon: caddress.lng,
          })
        }
        address={caddress.address}></Location>
      <Searchbar
        iconColor="#000"
        onChangeText={text => {
          console.log(text);
          handleInputs('term', text);
        }}
        style={[
          globalStyle.mt5,
          {
            fontSize: 10,
            fontFamily: fontFamily.Regular,
            backgroundColor: colors.white,
          },
        ]}
        placeholder="Search Restaurants.."
        placeholderTextColor="#000"></Searchbar>
      <View style={globalStyle.mt5}></View>
      <View>
        <FlatList
          horizontal
          data={pillData}
          //extraData={pillData}
          renderItem={({item, index}) => (
            <Pills index={index} item={item}></Pills>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}></FlatList>
      </View>
      <Loader loading={loading}></Loader>
      <FlatList
      ListEmptyComponent={(<View>
        <Text style={{color:'#000',fontFamily:fontFamily.SemiBold,marginTop:'10%'}}>
          No Restaurant Found. Use filter to find restaurant of your choice</Text>
      </View>)}
        showsVerticalScrollIndicator={false}
        data={getRestaurants}
        renderItem={items}
        keyExtractor={item => item.id}
      />
      {/* <FlatlistComp  DATA={getRestaurants} renderItem={items}></FlatlistComp> */}
      <CuisineSelector
        onCusineSelect={onCusineSelect}
        modalVisible={cusineModal}
        Cuisine={filter.cuisine}
        setModalVisible={setCusineModal}></CuisineSelector>
      <TypeSelector
        onCusineSelect={ontypeSelect}
        typeModal={typeModal}
        Type={filter.type}
        setTypeModal={setTypeModal}></TypeSelector>
      <CityStateModal
        onSelect={onSelect}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={mdata}></CityStateModal>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});

import { StyleSheet,View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import Loc from '../../assets/img/Restaurant/loc.svg'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import colors from '../../constant/colors'
import Geocoder from 'react-native-geocoding';

const ChangeLocation = ({route,navigation}) => {
  const {address,lat,lon} = route.params;
  const [changedAddress, setAddress] = React.useState(address)
  React.useEffect(() => {
    console.log(lat)
    Geocoder.init("AIzaSyA-hBc-fIpA-k0SeDXpyr1SVjU2cvkK3NY");
  }, [])
  
  const decodeAddress = (e) =>{
    Geocoder.from(e.latitude, e.longitude)
    .then(json => {
      var addressComponent = json.results[0].formatted_address;
      setAddress(addressComponent)
    })
    .catch(error => {
      setAddress('')
    });
  }
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:5,flex:1}]}>
        <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        minZoomLevel={0}
        maxZoomLevel={20}
        >
            {lat != ''&& (<Marker
        draggable
        onDragEnd={(e)=>{
          decodeAddress(e.nativeEvent.coordinate)
        }}
        coordinate={{latitude:parseFloat(lat),longitude:parseFloat(lon)}}
        title=""
        description="Press and move marker to change location" 
        />)}
        </MapView>
        <Header 
        onPress={()=>navigation.goBack()}
         title="Change Location" style={{backgroundColor:"#fff",paddingVertical:20,
         width:'100%',position:'absolute'}}></Header>
        <View style={{width:'90%', alignSelf:'center',position:'absolute',bottom:0}}>
          <View style={{backgroundColor:'#fff',padding:15,marginBottom:10,
          borderRadius:8,flexDirection:'row',alignItems:'center'}}>
              <Loc></Loc> 
              <Text style={{width:'75%',fontSize:12,color:colors.linkBlue,marginLeft:10}}> 
              {changedAddress} </Text>
          </View> 
        <Button onPress={()=>{
            navigation.navigate('Home')
        }} style={[globalStyle.mb10]} title="Confirm Location"></Button>
        </View>
    </View>
 </>
  )
}

export default ChangeLocation

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
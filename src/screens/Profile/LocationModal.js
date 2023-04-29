import { StyleSheet,View, TouchableOpacity, Text, Modal,Dimensions } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import Loc from '../../assets/img/Restaurant/loc.svg'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import colors from '../../constant/colors'
import Geocoder from 'react-native-geocoding';
const ChangeLocation = ({locationModal,setlocationModal,lat,lon,onLocation}) => {
  const [changedAddress, setAddress] = React.useState({
    address:'',
    lat:0,
    lon:0,
    postalCode:0,
    latDelta:0,
    lngDelta:0
  })
  React.useEffect(() => {
    Geocoder.init("AIzaSyA-hBc-fIpA-k0SeDXpyr1SVjU2cvkK3NY");
    console.log(lat)
    console.log(lon)
    decodeAddress({
      latitude:lat,
      longitude:lon
    })
  }, [locationModal])
  
  const decodeAddress = (e) =>{
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    Geocoder.from(e.latitude, e.longitude)
    .then(json => {
      
      var addressComponent = json.results[0].formatted_address;
      const northeastLat = parseFloat(json.results[0].geometry.viewport.northeast.lat);
    const southwestLat = parseFloat(json.results[0].geometry.viewport.southwest.lat);
    const latDelta = northeastLat - southwestLat;
    const lngDelta = latDelta * ASPECT_RATIO;
      setAddress({
        address:addressComponent,
        lat:e.latitude,
        lon:e.longitude,
        postalCode:'',
        latDelta:latDelta ? latDelta : 0.50,
        lngDelta:lngDelta ? lngDelta : 0.50
      })
    })
    .catch(error => {
      setAddress({
        address:changedAddress.address,
        lat:lat,
        lon:lon,
        postalCode:''
      })
    });
  }
  return (
 <>
   <Modal  animationType="fade"
          transparent={true}
          visible={locationModal}
          onRequestClose={() => {

            setlocationModal(!locationModal);
          }}>
   <View style={[globalStyle.container,{paddingHorizontal:5,flex:1}]}>
        <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={{
            latitude: parseFloat(changedAddress.lat),
            longitude: parseFloat(changedAddress.lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        
        // minZoomLevel={0}
        // maxZoomLevel={20}
        >
            {lat != ''&& (<Marker
        draggable
        onDragEnd={(e)=>{
          decodeAddress(e.nativeEvent.coordinate)
        }}
        coordinate={{
          latitude:parseFloat(changedAddress.lat),
          longitude:parseFloat(changedAddress.lon)
        }}
        title=""
        description="Press and move marker to change location" 
        />)}
        </MapView>
        <Header 
        onPress={()=>{setlocationModal(false)}}
         title="" style={{backgroundColor:"#fff",paddingVertical:20,
         width:'100%',position:'absolute'}}></Header>
        <View style={{width:'90%', alignSelf:'center',position:'absolute',bottom:0}}>
          <View style={{backgroundColor:'#fff',padding:15,marginBottom:10,
          borderRadius:8,flexDirection:'row',alignItems:'center'}}>
              <Loc></Loc> 
              <Text style={{width:'75%',fontSize:12,color:colors.linkBlue,marginLeft:10}}> 
              {changedAddress.address} </Text>
          </View> 
        <Button onPress={()=>{
            onLocation(changedAddress)
            setlocationModal(false)
        }} style={[globalStyle.mb10]} title="Confirm Location"></Button>
        </View>
    </View>
   </Modal>
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
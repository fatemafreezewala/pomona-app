// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
// const Location = ({route,navigation}) => {
//     const {lat,long,title,desp} = route.params
//   return (
//     <>
//     <View style={styles.container}>
//     <View style={{height:50,backgroundColor:'#fff',flexDirection:'row',alignItems:'center'}}> 
//     <TouchableOpacity onPress={()=>navigation.goBack()}>
//       <Text style={{color:'black',marginLeft:20}}>Back</Text>
//     </TouchableOpacity>
//     </View>
//     <MapView
//       provider={PROVIDER_GOOGLE}
//       style={styles.map}
//       region={{
//         latitude: parseFloat(long),
//         longitude: parseFloat(lat),
//         latitudeDelta: 0.015,
//         longitudeDelta: 0.0121,
//       }}
//     >
//         <Marker
//       coordinate={{latitude:parseFloat(long),longitude:parseFloat(lat)}}
      
//     />
//     </MapView>
//   </View></>
//   )
// }

// export default Location

// const styles = StyleSheet.create({
//     container: { 
     
//     flex:1
//     },
//     map: {
//      width:'100%',
//      height:'100%'
//     },
//    });
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from 'react-native';

//import WebView
import {WebView} from 'react-native-webview';
import colors from '../../constant/colors';

const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color={colors.primary}
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};

const App = ({route,navigation}) => {
  const {lat,long,title,desp} = route.params
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height:50,backgroundColor:colors.primary,flexDirection:'row',alignItems:'center'}}> 
     <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Text style={{color:colors.white,marginLeft:20}}>Back</Text>
     </TouchableOpacity>
     </View>
      <View style={styles.container}>
        <WebView
          //Loading URL
          source={{uri: `https://www.google.com/maps/search/?api=1&query=${lat},${long}`}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={ActivityIndicatorElement}
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
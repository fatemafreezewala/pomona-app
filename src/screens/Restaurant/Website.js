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
  const {url} = route.params
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
          source={{uri: url}}
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
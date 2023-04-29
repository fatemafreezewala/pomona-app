import { StyleSheet, Text, View,SafeAreaView,LogBox } from 'react-native'
import React from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import { Provider as PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications'
import colors from './src/constant/colors';
import {AppProvider} from './src/context/AppContext';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen

LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."])
const App = () => { 
  // useEffect(() => {
  //   BackgroundColor.setColor('#FFFFFF');
  // }, [])
  React.useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>
      <AppProvider > 
      <PaperProvider>
       <ToastProvider placement="top" dangerColor='#fb6200' normalColor={colors.primary}>
      <MainNavigator></MainNavigator>
      </ToastProvider>
      </PaperProvider>
      </AppProvider>
      
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})
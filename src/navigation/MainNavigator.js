import {View, Text} from 'react-native';
import React from 'react';
import Login from '../screens/Auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Tab from './Tab';
import About from '../screens/About';
import AuthContext, {defaultState, reducer, restoreToken} from './Auth';
import OnboardingIntro from '../screens/Auth/Onboarding';
import CathyIntro from '../screens/Auth/CathyIntro';
import EnterEmail from '../screens/Auth/EnterEmail';
import VerifyEmail from '../screens/Auth/VerifyEmail';
import SetPassword from '../screens/Auth/SetPassword';
import CreateAccount from '../screens/Auth/CreateAccount';
import AddPhoto from '../screens/Auth/AddPhoto';
import AddPassword from '../screens/Auth/AddPassword';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import ForgotPasswordCode from '../screens/Auth/ForgotPasswordCode';
import ForgotPasswordSet from '../screens/Auth/ForgotPasswordSet';
import BlogDetail from '../screens/Blogs/BlogDetail';
import SubmitFeedback from '../screens/Profile/SubmitFeedback';
import Terms from '../screens/Profile/Terms';
import Policy from '../screens/Profile/Policy';
import AddProducts from '../screens/Templates/AddProducts';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  React.useEffect(() => {
    restoreToken(dispatch);
  }, []);
  const authContext = React.useMemo(
    () => ({
      signIn: data => {
        dispatch({type: 'SIGN_IN', token: data});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: data => {
        dispatch({type: 'SIGN_IN', token: data});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
            {state.userToken == null ? (
              <>
                <Stack.Screen
                  options={screenOptions}
                  name="CathyIntro"
                  component={CathyIntro}></Stack.Screen>

                <Stack.Screen
                  options={screenOptions}
                  name="OnboardingIntro"
                  component={OnboardingIntro}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="Login"
                  component={Login}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="EnterEmail"
                  component={EnterEmail}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="VerifyEmail"
                  component={VerifyEmail}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="SetPassword"
                  component={SetPassword}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="CreateAccount"
                  component={CreateAccount}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="AddPhoto"
                  component={AddPhoto}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="AddPassword"
                  component={AddPassword}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="ForgotPassword"
                  component={ForgotPassword}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="ForgotPasswordCode"
                  component={ForgotPasswordCode}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="ForgotPasswordSet"
                  component={ForgotPasswordSet}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="Terms"
                  component={Terms}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="Policy"
                  component={Policy}></Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen
                  options={screenOptions}
                  name="Home"
                  component={Tab}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="BlogDetail"
                  component={BlogDetail}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="SubmitFeedback"
                  component={SubmitFeedback}></Stack.Screen>
                <Stack.Screen
                  options={screenOptions}
                  name="about"
                  component={About}></Stack.Screen>
                 
                  
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </>
  );
};

export default App;

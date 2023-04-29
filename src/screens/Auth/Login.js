import { StyleSheet, Text, View,Platform, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import globalStyle from '../../styles/globalStyle'
import SocialMediaLogin from '../../components/Login/SocialMediaLogin'
import colors from '../../constant/colors'
import Fb from '../../assets/img/Login/fb.svg'
import Google from '../../assets/img/Login/google.svg'
import Apple from '../../assets/img/Login/apple.svg' 
import Or from '../../assets/img/Login/or.svg'
import Button from '../../components/Button'
import Logo from '../../assets/img/Login/logo.svg'
import LogoText from '../../assets/img/Login/logo-text.svg'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AppContext from '../../context/AppContext'
import AuthContext from "../../navigation/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../constant/api'
import { useToast } from 'react-native-toast-notifications'
import {
  LoginButton, 
  AccessToken,
  GraphRequest,
  GraphRequestManager,Settings,LoginManager
} from 'react-native-fbsdk-next';
const Login = ({navigation}) => { 
  const { signIn } = useContext(AuthContext)
  const { setUser } = useContext(AppContext)
  const [loading, setLoading] = React.useState(false) 
  const toast = useToast()
  Settings.initializeSDK();

 const configureGoogle = () =>{
  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ], 
    webClientId: "236673300323-e4s2moqaehmjakduhutgcotf4g3o20o9.apps.googleusercontent.com",
    forceCodeForRefreshToken: true, 
  });
  googleSignIn()
 }
  const googleSignIn = async () => {
   
    const isSignedIn = await GoogleSignin.isSignedIn();
    if(isSignedIn == true){
      await GoogleSignin.signOut();
    }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSubmit(userInfo.user.email,userInfo.user,'google')
    } catch (error) {
      toast.show('Unable to signin',{type:"warning"})
    }
    
  }; 
  const onSubmit = async(email,userObj,type) =>{
    setLoading(true)
    api.post('?action=socialLogin',{email:email}).then(async(res)=>{
      if(res.data.status == '200'){
        let user = res.data.data
        setUser(user)
        signIn('124')
        await AsyncStorage.setItem('USER_TOKEN',user.u_id)
        await AsyncStorage.setItem('USER',JSON.stringify(user))
      }else{
        navigation.navigate('CreateAccount',{
          email:email,
          password:userObj.id,
          pname:userObj.givenName+' '+userObj.familyName,
        formalName:userObj.name,type:type})
      }

    }).catch(err=>{
      toast.show('Network Connection Error',{type:"warning"})
    }).finally(()=>{
      setLoading(false)
    })
    
}


const onLogout = () => {

};
const onFacebookLogin = () => {
  LoginManager.setLoginBehavior('native_with_fallback');
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    (result) => {
      if (result.isCancelled) {
        toast.show('Login cancelled');
      } else {
        fetchUserToken();
      }
    },
    (error) => toast.show('Login fail'),
  );
};
const fetchUserToken = () => {
  AccessToken.getCurrentAccessToken()
    .then((data) => {
     
      if (data.accessToken !== undefined)
        fetchUserFaceBookProfile(data.accessToken);
     
    })
    .catch((error) => {
      toast.show('Error while login');
    });
};
const fetchUserFaceBookProfile = (accessToken) => {
  const responseCallback = (error, result) => {
  
    if (error) {
      toast.show('Error while logging with facebook.')
    } else {
      if (
        result.email != undefined &&
        result.email != null &&
        result.email != ''
      ) {
        onSubmit(result.email,{
          id:result.id,
          givenName:result.first_name,
          familyName:result.last_name,
          name:result.name
        },'facebook');
      } else {
       console.log('err')
      }
    }
  };

  const profileRequestParams = {
    fields: {
      string: 'id, name, email, first_name, last_name, gender, picture',
    },
  };

  const profileRequestConfig = {
    httpMethod: 'GET',
    version: 'v2.5',
    parameters: profileRequestParams,
    accessToken: accessToken.toString(),
  };

  const profileRequest = new GraphRequest(
    '/me',
    profileRequestConfig,
    responseCallback,
  );

  // Start the graph request.
  new GraphRequestManager().addRequest(profileRequest).start();
};
  return (
    <View style={[globalStyle.container,globalStyle.justifyCenter]}>
      <View style={globalStyle.rowCenter}> 
        <Logo></Logo>
        <LogoText></LogoText>
      </View>
      <Text style={[globalStyle.paragraph,globalStyle.textCenter,globalStyle.mt10,globalStyle.mb10,globalStyle.fs15,{color:'#000'}]}>
      Create an account and start reclaiming your foodie life
      </Text>
      
      <SocialMediaLogin onPress={()=>{
        onFacebookLogin()
      }} style={globalStyle.mt5} icon={<Fb></Fb>} background="#1877F2" title="Continue with facebook"></SocialMediaLogin>
      {Platform.OS == 'ios' && (
      <SocialMediaLogin style={globalStyle.mt5} icon={<Apple></Apple>}  background={colors.black} title="Continue with Apple       "></SocialMediaLogin>

      )}
      <SocialMediaLogin loading={loading} onPress={()=>{
        configureGoogle()
      }} style={[{ elevation: 5,shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  },globalStyle.mt5]} txtcolor={{color:colors.black}} icon={<Google></Google>} background={colors.white} title="Continue with Google     "></SocialMediaLogin>
    <Or style={[globalStyle.mt10,globalStyle.mb10]}></Or>
    <Button onPress={()=>{
      navigation.navigate('EnterEmail')
    }} title="Continue with Email"></Button>
    <View style={{alignItems:'center'}}> 
    <Text style={[globalStyle.paragraph,globalStyle.textCenter,globalStyle.mt10]}>
    By continuing, you agree to Pomona's  {'\n'}
    <Text onPress={()=>navigation.navigate('Terms')} style={globalStyle.textSecondary}>Terms & Conditions</Text> and 
    <Text onPress={()=>navigation.navigate('Policy')} style={globalStyle.textSecondary}> Privacy Policy</Text>.</Text>
    </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
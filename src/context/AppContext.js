import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
const [userId, setUserId] = useState(true)
const [puser, setUser] = useState(null) 
const [clientId, setClientId] = useState('')
const [location, setLocation] = useState({})
const [lang, setLang] = useState('en')
React.useEffect(() => {
  getUser()

  return () => {
    getUser()
  }
}, [])
const getUser = async () => {
  let usera = await AsyncStorage.getItem('USER');
  let userid = await AsyncStorage.getItem('USER_TOKEN');
  usera = JSON.parse(usera);
  console.log(usera)
  setUser(usera);
};
  return (
    <AppContext.Provider
      value={{lang,setLang,userId,setUserId,puser,setUser,location,
       setLocation,setClientId,clientId}}>
      {children}
    </AppContext.Provider>
  ); 
}; 

export {AppProvider, AppContext as default};

import { StyleSheet, Text, View,FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import FeelingsCap from '../../components/Home/FeelingsCap'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../constant/api'
import moment from 'moment'

const Feelings = ({navigation}) => {
  const [loading, setLoading] = React.useState(false)
  const data = [
    {text:'Content',percentage:'90'},
    {text:'Grateful',percentage:'90'},
    {text:'Happy',percentage:'100'},
    {text:'Angry',percentage:'30'},
    {text:'Anxious',percentage:'20'},
    {text:'Depressed',percentage:'15'},
    {text:'Meh',percentage:'10'},
    {text:'Sad',percentage:'15'},
    {text:'Stressed',percentage:'5'}
]
const getUser = async (item) => {
  setLoading(true)
  let userid = await AsyncStorage.getItem('USER_TOKEN');
  api
  .post('?action=setTodaysMood', {
    user_id: userid,
    mt_date:moment().format('DD-MM-YYYY'),
    percentage:item.percentage,
    mood:item.text
  })
  .then(res => {
    
  })
  .catch(err => {})
  .finally(() => {
    setLoading(true)
    navigation.goBack();
  });
};
  return (
    <View style={[globalStyle.container,globalStyle.dullBackground]}>
      {loading && <ActivityIndicator color="#000" size="small"></ActivityIndicator>}
      <FlatList
        data={data}
        renderItem={({item})=>(<FeelingsCap onPress={()=>{
          getUser(item)
        }} title={item.text}></FeelingsCap>)}
        keyExtractor={(item)=>item.text}
      ></FlatList>
    </View>
  )
}

export default Feelings

const styles = StyleSheet.create({})
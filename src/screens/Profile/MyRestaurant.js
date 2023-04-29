import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Email from '../../assets/img/Restaurant/email.svg'
import globalStyle from '../../styles/globalStyle'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import Header from '../../components/Profile/Header'
import Card from '../../components/Profile/Card'
import FlatlistComp from '../../components/FlatlistComp'
import Button from '../../components/Button'
import api from '../../constant/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader'

const GetInTouch = ({navigation}) => {

  const [restaurantListing, setRestaurantListing] = React.useState()

  const [loading, setLoading] = React.useState(false)

  const getTemplateData = async() =>{
    let usera = await AsyncStorage.getItem('USER')
    usera = JSON.parse(usera)
    setLoading(true)
    api.post('?action=getRestaurantByID',{
      "user_id":usera.u_id
    }).then(res=>{
      setRestaurantListing(res.data.data)
    }).catch(err=>{
      
    }).finally(()=>{
      setLoading(false)
    })
  }
  
  // React.useEffect(() => {
  //   getTemplateData()
  // }, [])
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTemplateData()
    })   
    return unsubscribe;
  }, [navigation]);
  const items = ({item,index}) =>{
    return <Card onPress={()=> navigation.navigate('RestaurantDetail',{item:item})} item={item}></Card>
  }
  return ( 
    <View style={{flex:1}}>
      <Header onPress={()=>navigation.goBack()} title="My Restaurants Listing"></Header>
      
      <View style={{padding:15,flex:1}}>
      {loading && (<Loader></Loader>)}
        <FlatlistComp  DATA={restaurantListing} renderItem={items}></FlatlistComp>
        
      </View>
      <View style={{padding:15}}>
        <Button onPress={()=>navigation.navigate('AddRestaurant')} title=" Add New Restaurant"></Button>
      </View>
    </View>
  )
}

export default GetInTouch

const styles = StyleSheet.create({
  desp:{
    color:colors.black,
    fontFamily:fontFamily.Medium,
    fontSize:13,
    lineHeight:18,
    marginTop:10
  }
})
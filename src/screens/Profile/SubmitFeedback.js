import { StyleSheet, Text, View,TextInput, Alert } from 'react-native'
import React from 'react'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import Header from '../../components/Profile/Header'
import Button from '../../components/Button'
import api from '../../constant/api'
import StarRating from 'react-native-star-rating-widget';
import Loader from '../../components/Loader'

const SubmitFeedback = ({navigation}) => {

   const [rating, setRating] = React.useState(0)
   const [feedback, setFeedback] = React.useState('')
   const [loading, setLoading] = React.useState(false)


  const addRating = () =>{
    if(rating == 0){
      Alert.alert('','Please select Rating.')
    }else{
      setLoading(true)
      api.post('?action=addRating',{
      star:rating,
      feedback:feedback,
      user_id:'1'
    }).then(res=>{
     if(res.data.status == '200'){
      Alert.alert('','Thank you for your value feedback')
      navigation.goBack()
     }
    }).catch(err=>{
      
    }).finally(()=>{
      setLoading(false)
    })
  }
  }

  return ( 
    <View style={{flex:1}}>
      <Header onPress={()=>navigation.goBack()} title="Submit Feedback"></Header>

    <View style={{padding:15}}>

    <StarRating
      starSize={50}
      emptyColor="grey"
        rating={rating}
        onChange={setRating}
      />

      <TextInput onChangeText={setFeedback} textAlignVertical='top' style={{
       height:50,backgroundColor:'#fff',
       marginTop:10,
       paddingLeft:15,
       minHeight:150,
       borderWidth:1,borderRadius:8,color:'#000',fontFamily:fontFamily.Regular,width:'100%',alignSelf:'center'
     }} multiline placeholderTextColor="#000" numberOfLines={5} placeholder='Share your feedback'></TextInput>
      <View style={{marginTop:15}}>
      <Button loading={loading} onPress={()=>{addRating()}} title=" Send Feedback"></Button>     
      </View>
    </View>
    </View>
  )
}

export default SubmitFeedback

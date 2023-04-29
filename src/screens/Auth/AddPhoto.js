import { StyleSheet, Text, TouchableOpacity, View,Image, Alert } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import globalStyle from '../../styles/globalStyle'
import Button from '../../components/Button'
import { ProgressBar,  } from 'react-native-paper';
import colors from '../../constant/colors'
import Photo from '../../assets/img/Login/photoplace.svg'
import Delete from '../../assets/img/Login/delete.svg'
import ImagePicker from 'react-native-image-crop-picker';
import api from '../../constant/api'
import AuthContext from "../../navigation/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from 'react-native-toast-notifications'
import AppContext from "../../context/AppContext";

const AddPhoto = ({route,navigation}) => {
  const toast = useToast()
  const { signIn } = React.useContext(AuthContext)
  const {setUser} = React.useContext(AppContext)
  const {email,password,name, 
    profile,
    country,
    phone,type} = route.params;
    const [loading, setLoading] = React.useState(false)

    const [image, setimage] = React.useState('')
const UploadPic = () =>{
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true 
  }).then(image => {
    console.log(image)
    setimage(image.path);
  });
}
const onSuubmit = async() =>{
  
  setLoading(true)
  var fdata = new FormData()
  fdata.append('email',email)
  fdata.append('name',name)
  fdata.append('profile',profile)
  fdata.append('country',country.callingCode[0])
  fdata.append('cca',country.cca2)
  fdata.append('phone',phone)
  fdata.append('password',password)
  fdata.append('type',type)
  if(image != ''){
    fdata.append('image',{
      uri:image,
      type:'image/jpeg',
      name:'img.jpg'
    })
  }else{
    fdata.append('image','')
  }
  api.post('?action=createAccount',fdata,{headers:{
    'Content-type':'multipart/form-data'
  }}).then(async(res)=>{
    if(res.data.status == '200'){
      setUser(res.data.data)
      signIn('124')
      await AsyncStorage.setItem('USER_TOKEN',res.data.data.u_id)
      await AsyncStorage.setItem('USER',JSON.stringify(res.data.data))
     
    }else{
      toast.show('Error While creating Account.',{type:"danger"})
    }
    setLoading(false)
  }).catch(err=>{
    toast.show('Network Connection Error',{type:"warning"})
    setLoading(false)
  })
}
  return (
 <>
    <View style={[globalStyle.container,{paddingHorizontal:0},globalStyle.dullBackground]}>
        <Header onSkip={()=>{
          onSuubmit()
        }} onPress={()=>navigation.goBack()} on showSkip={true} title="Create Account"></Header>
        <ProgressBar progress={0.7} style={[{height: 8},globalStyle.mt5]} color={colors.secondry} />
        <View style={[globalStyle.innerContainer,{flex:1}]}>
        <View style={[globalStyle.mt10]}></View>
            <Text style={[globalStyle.sectionHead,globalStyle.mb10,globalStyle.textLeft]}>
            Upload or Take a Photo
            </Text>
            <View style={{alignSelf:'center'}}>
              <TouchableOpacity onPress={()=>{
                UploadPic()
              }}>
                {image ? (<Image style={{width:150,height:150,borderRadius:20}} source={{uri:image}}></Image>) : (<Photo></Photo>)}
              </TouchableOpacity>
            
            </View>
      
        </View>
        {image && (<View style={[globalStyle.rowCenter,globalStyle.mb10]}> 
        <Delete></Delete>
        <TouchableOpacity onPress={UploadPic}>
        <Text style={[globalStyle.paragraph,globalStyle.textCenter]}>Remove or change photo</Text>

        </TouchableOpacity>
    </View>)}
        
    <Button loading={loading} onPress={()=>{
     onSuubmit()
    }} style={[globalStyle.w95,globalStyle.mb10]} title="Submit"></Button>
    </View>
   
 </>
  )
}

export default AddPhoto

const styles = StyleSheet.create({})
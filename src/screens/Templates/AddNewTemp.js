import { ScrollView, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import Arrow from '../../assets/img/Login/ChevronRight.svg'
import Button from '../../components/Button'
import api from '../../constant/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useToast } from "react-native-toast-notifications";

const TemplateDetails = ({route, navigation}) => {

  const {item} = route.params
  const toast = useToast();
  const list = item.template_items.split(',')
  const [loading, setLoading] = React.useState(false)
  const addAllegryTemplate = async() =>{
    let usera = await AsyncStorage.getItem('USER')
    usera = JSON.parse(usera)
    setLoading(true)
    api.post('?action=addAllergyTemplate',{
      user_id:usera.u_id,
      user_template_title:item.template_title,
      user_template_desp:item.template_desp,
      user_selected_temp_id:item.template_id,
      user_template_items:item.template_items,
      user_allergy_temp_color:item.template_color

    }).then(res=>{
      if(res.data.status == '200'){
        toast.show("Template Added Successfully.");
        navigation.navigate('Templates',{user:res.data.data})
      }else{
        toast.show("Unable to add template.",{type:"danger"});
      }

    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }
    return (
    <View style={[globalStyle.container,{backgroundColor:'#eee'}]}>
     <View style={[{height:50,flexDirection:'row',alignItems:'center'}]}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <View style={globalStyle.rowCenter}>
          <Arrow></Arrow>
          <Text style={[globalStyle.ml10,globalStyle.paragraph]}>Choose template</Text>
        </View> 
        </TouchableOpacity>
        <View></View>
     </View>
    <ScrollView showsVerticalScrollIndicator={false}> 
    
      <Text style={[{color:colors.black,fontFamily:fontFamily.AltaRegular,fontSize:25,textTransform:'uppercase'},
        globalStyle.mt10]}>{item.template_title}</Text>
      <Text style={[globalStyle.paragraph,{color:colors.black},globalStyle.mt5]}>{item.template_desp}</Text>
      {/* <View style={[styles.smallBox,globalStyle.mt5]}>
        <Text style={[{color:colors.black,fontFamily:fontFamily.AltaRegular,fontSize:32}]}>{list.length}</Text> 
        <Text style={[globalStyle.paragraph,{color:colors.black}]}>Total Items</Text>
      </View> */}
      <Text style={[globalStyle.paragraph,{color:colors.black,fontSize:20},globalStyle.mt5]}>Items</Text>
      <View style={globalStyle.mt5}> 

      {list && list.map(litem=>(<View style={styles.itemBack}>
            <Text style={[globalStyle.paragraph,{fontSize:15}]}>{litem}</Text></View>))}
      </View>
     
      {/* <Text style={[globalStyle.paragraph,{color:colors.secondry},globalStyle.mt5]}>+ Add or update items</Text> */}
    </ScrollView>
    <Button style={{marginVertical:10}} loading={loading} onPress={()=>{
      addAllegryTemplate()
    }} title="Save"></Button>
    </View>
  )
}

export default TemplateDetails

const styles = StyleSheet.create({
    smallBox:{
        backgroundColor:'#fff',
        width:120,
        height:120,
        justifyContent:'center',
        padding:10
    },
    itemBack:{
        backgroundColor:colors.white,
        padding:15,
        marginTop:5
    }
})
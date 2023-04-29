import { StyleSheet, Text, View,TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import Arrow from '../../assets/img/Login/ChevronRight.svg'
import Font from 'react-native-vector-icons/Fontisto'
import ENT from 'react-native-vector-icons/Entypo'
import colors from '../../constant/colors'
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import api from '../../constant/api'
import { useToast } from "react-native-toast-notifications";
import ColorModal from './ColorModal'

const Header = ({navigation,item,generatePDF,products,fetchCopiedText}) => {
  const toast = useToast();
  const [visible, setVisible] = React.useState(false); 
  const [loading, setLoading] = React.useState(false)
  const [ColorModalV, setColorModal] = React.useState(false)
  const [color, setColor] = React.useState('#F4A060')

  const openMenu = () => setVisible(true);
 
  const closeMenu = () => setVisible(false);
  const deleteTemp = () =>{
    setLoading(true) 
    api.post('?action=deleteTemp',{
      "temp_id":item.user_template_id
    }).then(res=>{
      toast.show("Template Deleted Successfully",{type:"danger"});
      navigation.goBack()
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }
   const editTemplate = () =>{
    setLoading(true)
    item.user_template_items = products.toString()
    api.post('?action=editAllergyTemplate',item).then(res=>{
      toast.show("Template Edit Successfully");
      navigation.goBack()
    }).catch(function (error) {
      toast.show("Unable to edit template")
      console.log(error);
    })
    .finally(function () {
      setLoading(false)
    });
  
  }
  const onColorChange = () =>{
    setLoading(true)
    item.user_allergy_temp_color = color
    api.post('?action=editAllergyTemplate',item).then(res=>{
      toast.show("Template Edit Successfully");
      navigation.goBack()
    }).catch((error)=> {
      console.log(error);
    })
    .finally(function () {
      setLoading(false)
    });
  }
  const createThreeButtonAlert = () =>
  Alert.alert('Success', 'Choose how you want to share template?', [
    {
      text: 'Share',
      onPress: () => {
        generatePDF()
      },
    },
    {text: 'Copy', onPress: () => {
      fetchCopiedText(item)
    }},
    {
      text: 'Close',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ]);
  return (
    <View style={[globalStyle.rowSpaceBetween,{height:50}]}>
    
    <TouchableOpacity onPress={()=>navigation.goBack()}>
    <View style={globalStyle.rowCenter}>
       <Arrow></Arrow>
       <Text style={[globalStyle.ml10,globalStyle.paragraph]}>Templates</Text>
     </View>
    </TouchableOpacity>
    <View style={{flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>{
        
        createThreeButtonAlert()
      }}>
        <Font color={colors.black} size={20} name="share"></Font>
      </TouchableOpacity>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={ <ENT onPress={openMenu} color={colors.black} style={{marginLeft:10}} size={20} name="dots-three-vertical"></ENT>}>
          <Menu.Item  onPress={() => {
            editTemplate()
          }} title="Edit" />
          <Divider />
          <Menu.Item onPress={() => {
            setColorModal(true)
          }} title="Change Background" />
          <Divider />
          <Menu.Item  onPress={() => {
            Alert.alert(
              "",
              "Are you sure you want to delete?",
              [
               
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => {deleteTemp()}}
              ]
            );
        
          }} title={loading == false ? 'Delete' : 'please wait..'} />
        </Menu>
    </View>
   <ColorModal color={color} 
   setColor={setColor} 
   modalVisible={ColorModalV} 
   setModalVisible={setColorModal} onAddItem={onColorChange}></ColorModal>
     </View>
     
  )
}

export default Header

const styles = StyleSheet.create({})
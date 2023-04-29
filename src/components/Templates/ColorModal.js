import React from "react";
import {  Modal, StyleSheet, View,Text, ScrollView, TouchableOpacity ,FlatList} from "react-native";
import Button from '../Button'
import FTextInput from '../../components/Login/CTextInput'
import fontFamily from "../../constant/fontFamily";
import colors from "../../constant/colors";
import FA5 from 'react-native-vector-icons/FontAwesome'
const ColorModal = ({modalVisible,setModalVisible,onAddItem,color, setColor}) => {

  return ( 
   
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible} 
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
        
         <View style={styles.modalView}>
           <ScrollView>
            <TouchableOpacity onPress={() => {
          setModalVisible(false);
        }} style={{padding:5,alignSelf:'flex-end'}}>
            <FA5 size={20} name="close"></FA5>
            </TouchableOpacity>
           <Text style={{fontFamily:fontFamily.Medium,color:colors.black,fontSize:15,
            marginVertical:15}}>Select Color</Text>
           <FlatList
      horizontal
        data={[{color:'#F4A060'},{color:'#E4E1D7'},
        {color:'#DFD2BF'},{color:'#E08A63'},{color:'#A6AD5F'}]}
        keyExtractor={(item)=>item.color}
        renderItem={({item})=>(
        <TouchableOpacity 
        onPress={()=>{
          setColor(item.color)
        }}
        style={{width:35,marginLeft:15,height:35,borderRadius:35,backgroundColor:item.color
        ,borderWidth:item.color == color ? 3 : 0
        }}></TouchableOpacity>)}
      ></FlatList>
            <Button style={{marginTop:'20%'}} onPress={()=>{
              onAddItem()
            }} title="Save"></Button>
           </ScrollView>
          </View>
        
        </View>
      </Modal>
   
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex:1 , 
    flexDirection:'column',
    justifyContent:'flex-end'
  },
  modalView: {
    // alignSelf:'flex-end',
    minHeight:'40%',
    
    width:'100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export default ColorModal;
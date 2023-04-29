import { StyleSheet, Text, View,TouchableOpacity,Modal } from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import FlatlistComp from '../../components/FlatlistComp'
import Card from '../../components/Notifications/Card'
import Arrow from '../../assets/img/Login/ChevronRight.svg'
import colors from '../../constant/colors'
import fontFamily from '../../constant/fontFamily'
import api from '../../constant/api'
import Loader from '../../components/Loader'
import FA from 'react-native-vector-icons/FontAwesome'
const Notifications = ({navigation}) => {

  const [getNotification, setGetNotification] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false);
  const [desp, setDesp] = React.useState('')

  const getNotificationData = () =>{
    setLoading(true)
    api.get('?action=getNotification').then(res=>{
      setGetNotification(res.data.data)
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }

  React.useEffect(() => {
    getNotificationData()
  }, [])

    const items = ({item}) =>{
        return <Card onPress={()=> {
          setDesp(item.noti_desp)
          setModalVisible(true)
          //navigation.navigate('RestaurantDetail',{item:item})
        }} item={item} ></Card>
      }
  return (
    <View style={[globalStyle.container,globalStyle.dullBackground]}>
        <View style={[globalStyle.rowSpaceBetween,{height:50,paddingRight:10}]}>
        <TouchableOpacity onPress={()=>
          navigation.goBack()}>
            <View style={globalStyle.rowCenter}>
                <Arrow></Arrow>
                <Text style={[globalStyle.ml10,globalStyle.paragraph]}>Home</Text>
            </View>
        </TouchableOpacity>
        <Text style={{fontFamily:fontFamily.SemiBold,color:'#000',fontSize:16}}>Notifcations</Text>
        <Text style={{color:colors.secondry}}>.</Text>
      </View>

      <Loader loading={loading}></Loader>

           <FlatlistComp  DATA={getNotification} renderItem={items}></FlatlistComp>
         
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>{
              setModalVisible(false)
            }}>
            <FA name="close" size={25}></FA>
            </TouchableOpacity>
            <Text style={{color:colors.black,fontFamily:fontFamily.Regular}}>{desp}</Text>
           
          </View>
        </View>
      </Modal>
    </View>
   
  )
}

export default Notifications

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'#1c1e2138',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
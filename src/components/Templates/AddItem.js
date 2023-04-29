import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Button from '../Button';
import FTextInput from '../../components/Login/CTextInput';
import fontFamily from '../../constant/fontFamily';
import colors from '../../constant/colors';
import FA5 from 'react-native-vector-icons/FontAwesome';
const AddItem = ({
  modalVisible,
  setModalVisible,
  onAddItem,
  setItemName,
  onChooseFromExist,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{padding: 5, alignSelf: 'flex-end'}}>
              <FA5 size={20} name="close"></FA5>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: fontFamily.Medium,
                color: colors.black,
                fontSize: 15,
                marginVertical: 15,
              }}>
              Name of the item
            </Text>
            <FTextInput
              onChange={setItemName}
              placeholder="Enter Name"></FTextInput>
            <TouchableOpacity
            style={{marginTop:10}}
              onPress={() => {
                onChooseFromExist();
              }}>
              <Text
                style={{fontFamily: fontFamily.Regular, color: colors.primary}}>
                Or Select From Existing
              </Text>
            </TouchableOpacity>
            <Button
              style={{marginTop: '20%'}}
              onPress={() => {
                onAddItem();
              }}
              title="Save"></Button>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modalView: {
    // alignSelf:'flex-end',
    minHeight: '40%',

    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AddItem;

import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import fontFamily from '../../constant/fontFamily';
import colors from '../../constant/colors';
import FA5 from 'react-native-vector-icons/FontAwesome';
const TypeSelector = ({typeModal, setTypeModal, onCusineSelect, Type}) => {
  const cusine = [
    {
      cusine_name: 'Gluten Free',
    },
    {
      cusine_name: 'Vegan',
    },
    {
      cusine_name: 'Vegetarian',
    },
    {
      cusine_name: 'Allergy Friendly',
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={typeModal}
      onRequestClose={() => {
        setTypeModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <View
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fontFamily.SemiBold,
                  fontSize: 18,
                }}>
                Restro Type
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setTypeModal(false);
                }}
                style={{padding: 5, alignSelf: 'flex-end'}}>
                <FA5 name="close" size={20}></FA5>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                onCusineSelect('ALL');
              }}
              style={{width: '100%', height: 50}}>
              <Text
                style={{color: colors.black, fontFamily: fontFamily.Regular}}>
                ALL
              </Text>
            </TouchableOpacity>
            {cusine.map(item => {
              return Type?.indexOf(item.cusine_name) >= 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    onCusineSelect(item.cusine_name);
                  }}
                  style={{width: '100%', height: 50}}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: fontFamily.Regular,
                    }}>
                    {item.cusine_name}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onCusineSelect(item.cusine_name);
                  }}
                  style={{width: '100%', height: 50}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fontFamily.Regular,
                    }}>
                    {item.cusine_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
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

export default TypeSelector;

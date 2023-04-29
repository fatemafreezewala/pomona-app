import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React from 'react';
import api from '../../constant/api';
import color from '../../constant/colors';
import fontsfamily from '../../constant/fontFamily';
import {Searchbar} from 'react-native-paper';
import colors from '../../constant/colors';
import FA from 'react-native-vector-icons/FontAwesome';
import fontFamily from '../../constant/fontFamily';

const AllCourses = ({data, modalVisible, setModalVisible, onSelect}) => {
  const [dataAll, setData] = React.useState(data);
  const [filteredDataSource, setFilteredDataSource] = React.useState(data);
  const searchFilterFunction = text => {
    // Check if searched text is not blank

    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = dataAll.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(dataAll);
    }
  };
  React.useEffect(() => {
    setFilteredDataSource(data);
    setData(data);
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <View style={styles.maincontainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <FA
              name="close"
              size={30}
              style={{alignSelf: 'flex-end', padding: 5}}></FA>
          </TouchableOpacity>
          <Searchbar
            style={[
              {
                width: '100%',
                height: 50,
                marginBottom: 20,
                backgroundColor: '#fff',
                color:'#000'
              },
            ]}
            inputStyle={{color:'grey'}}
            placeholder="Search Here.."
            iconColor='grey'
            placeholderTextColor={'grey'}
            onChangeText={text => {
              searchFilterFunction(text);
            }}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                  style={{height: 40, marginTop: 5, width: '100%'}}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fontFamily.Regular,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AllCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  maincontainer: {
    padding: 15,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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

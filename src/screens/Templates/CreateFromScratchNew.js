import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import fontFamily from '../../constant/fontFamily';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import ION from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import SearchBar from '../../components/Templates/SearchBar';
import api from '../../constant/api';
import Loader from '../../components/Loader';
import FlatlistComp from '../../components/FlatlistComp';
import AddItem from '../../components/Templates/AddItem';
const CreateFromScratch = ({navigation}) => {
  const [elements, setElements] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [products, selectedProduct] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [itemName, setItemName] = React.useState('');
  const [sitem, setItem] = React.useState([]);
  const [prodAray, setProdArray] = React.useState([]);
  const [term, setTerm] = React.useState('');
  const [CategoryFlter, setCategoryFlter] = React.useState('');

  const onAddItem = () => {
    setModalVisible(false);
    if (itemName != '') {
      selectedProduct([...products, itemName]);
    }
  };
  const getElements = () => {
    setLoading(true);
    api
      .get('?action=getAllergyTempProds')
      .then(res => {
        setElements(res.data.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const addproduct = item => {
    setItem([...sitem, item]);
    console.log(sitem)
    selectedProduct([...products, item.prod_name]);
  };
  const removeitem = value => {
    const newarr = products.filter(function (ele) {
      return ele != value.prod_name;
    });
    selectedProduct([...newarr]);
    let myArray = sitem.filter(function (obj) {
      return obj.prod_name !== value.prod_name;
    });
    console.log(myArray);
    setItem([...myArray]);
  };
  React.useEffect(() => {
    getElements();
  }, []);

  const countType = type => {
    const countTypes = sitem.filter(movie => movie.prod_category_id === type);
    return countTypes.length;
  };
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <View
        style={[
          {height: 50, flexDirection: 'row', alignItems: 'center'},
          globalStyle.rowSpaceBetween,
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.paragraph, {marginLeft: 10}]}>back</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            color: colors.black,
            fontFamily: fontFamily.Medium,
          }}>
          Select Items
        </Text>
        <View></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader loading={loading}></Loader>
        <SearchBar onChangeText={setCategoryFlter}></SearchBar>
        <View
          style={{
            minHeight: 50,
            backgroundColor: colors.secondry,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            width: '100%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              color: colors.white,
              fontFamily: fontFamily.Regular,
            }}>
            {products.toString()}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
          <FlatList
            data={elements && elements.filter(el =>
              el.category.toLowerCase().includes(CategoryFlter.toLowerCase()),
            )}
            renderItem={({item,index})=>(
              countType(item.category_id) > 0 ? (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderColor: colors.primary,
                    backgroundColor: colors.primary,
                    minWidth: 50,
                    marginLeft: 5,
                    marginTop: 5,
                    borderRadius: 5,
                    width:'30%',
                    minHeight:50
                  }}
                  onPress={() => {
                    setProdArray(item.prod);
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Regular,
                      color: colors.white,
                    }}>
                    {item.category} {countType(item.category_id)}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderColor: colors.primary,
                    minWidth: 50,
                    marginLeft: 5,
                    marginTop: 5,
                    borderRadius: 5,
                    width:'30%',
                    minHeight:50
                  }}
                  onPress={() => {
                    setProdArray(item.prod);
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.Regular,
                      color: colors.black,
                    }}>
                    {item.category} {countType(item.category_id)}
                  </Text>
                </TouchableOpacity>
              )
            )}
            numColumns={3}
            keyExtractor={item => item.category_id}></FlatList>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{alignSelf: 'flex-end', margin: 5, color: 'red'}}>
                  Close
                </Text>
              </TouchableOpacity>
              <SearchBar onChangeText={setTerm}></SearchBar>
              <FlatList
                style={{padding: 10}}
                data={
                  prodAray &&
                  prodAray.filter(el =>
                    el.prod_name.toLowerCase().includes(term.toLowerCase()),
                  )
                }
                keyExtractor={item => item.prod_id}
                renderItem={({item}) => (
                  <>
                    {products.includes(item.prod_name) ? (
                      <TouchableOpacity
                        onPress={() => {
                          removeitem(item);
                        }}
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          backgroundColor: colors.primary,
                          borderBottomWidth: 1,
                          borderColor: '#E1E0DD',
                        }}>
                        <MI
                          color={colors.white}
                          name="checkbox-outline"
                          size={20}></MI>
                        <Text
                          style={{
                            color: colors.white,
                            fontFamily: fontFamily.Medium,
                            fontSize: 12,
                          }}>
                          {item.prod_name}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          addproduct(item);
                        }}
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          backgroundColor: '#fff',
                          borderBottomWidth: 1,
                          borderColor: '#E1E0DD',
                        }}>
                        <MI color="grey" name="square-outline" size={20}></MI>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: fontFamily.Medium,
                            fontSize: 12,
                          }}>
                          {item.prod_name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}></FlatList>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Button
        onPress={() => {
          if (products.length > 0) {
            navigation.navigate('TitleDesp', {items: products});
          } else {
            Alert.alert('', 'Please select some items');
          }
        }}
        title="Next"></Button>
    </View>
  );
};

export default CreateFromScratch;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    height: '70%',
    backgroundColor: 'white',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

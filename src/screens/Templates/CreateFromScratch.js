import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
    selectedProduct([...products, item.prod_name]);
  };
  const removeitem = value => {
    const newarr = products.filter(function (ele) {
      return ele != value.prod_name;
    });
    selectedProduct([...newarr]);
  };
  React.useEffect(() => {
    getElements();
  }, []);
  const items = ({item}) => {
    return (
      <Collapse
        style={{backgroundColor: '#fff', borderRadius: 10, marginTop: 10}}>
        <CollapseHeader>
          <View
            style={[
              {backgroundColor: '#fff', padding: 12, borderRadius: 10},
              globalStyle.rowSpaceBetween,
            ]}>
            <View style={globalStyle.rowCenter}>
              <MI color={colors.primary} name="checkbox-outline" size={25}></MI>
              <Text
                style={{
                  color: '#000',
                  fontFamily: fontFamily.Medium,
                  fontSize: 13,
                }}>
                {item.category}
              </Text>
            </View>
            <MI name="chevron-down" size={30}></MI>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            style={{padding: 10}}
            data={item.prod}
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
                      backgroundColor: '#fff',
                      borderBottomWidth: 1,
                      borderColor: '#E1E0DD',
                    }}>
                    <MI
                      color={colors.primary}
                      name="checkbox-outline"
                      size={20}></MI>
                    <Text
                      style={{
                        color: '#000',
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
                    <MI color="grey" name="checkbox-outline" size={20}></MI>
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
          <AddItem
            setItemName={setItemName}
            onAddItem={onAddItem}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}></AddItem>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={[globalStyle.rowCenter, {marginBottom: 20, marginTop: 20}]}>
            <ION color={colors.secondry} name="add-circle-outline"></ION>
            <Text
              style={{
                color: colors.secondry,
                fontFamily: fontFamily.Regular,
                fontSize: 12,
              }}>
              Didn’t find your item? click here to add
            </Text>
          </TouchableOpacity>
        </CollapseBody>
      </Collapse>
    );
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
          Create new template
        </Text>
        <View></View>
      </View>
      <SearchBar ></SearchBar>
      <Loader loading={loading}></Loader>
      <Text
        style={{
          fontSize: 15,
          color: colors.black,
          fontFamily: fontFamily.SemiBold,
        }}>
        Selected Items{'\n'}
      </Text>
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
      <View style={{flex: 1}}>
        <FlatlistComp DATA={elements} renderItem={items}></FlatlistComp>
      </View>
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

const styles = StyleSheet.create({});

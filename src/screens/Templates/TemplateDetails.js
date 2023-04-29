import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';
import Header from '../../components/Templates/Header';
import * as pdfMake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts'; 
import Share from 'react-native-share';
import AddItem from '../../components/Templates/AddItem';
import imageApi from '../../constant/imageApi';
import AppContext from '../../context/AppContext';
import api from '../../constant/api';
import Clipboard from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import ANT from 'react-native-vector-icons/AntDesign';
const TemplateDetails = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [itemName, setItemName] = React.useState('');
  const {item, user} = route.params;
  const list = item.user_template_items.split(',');
  const [products, selectedProduct] = React.useState(list);
  const [UpdatedTemp, setUpdatedTemp] = React.useState(item);
  const {puser} = React.useContext(AppContext);
  const toast = useToast();
  const generatePDF = () => {
    const listItem = [];
    list.forEach(element => {
      listItem.push({text: element, fontSize: 18, margin: 10});
    });
    var dd = {
      footer: {
        columns: [{text: 'Created on - Pomona App', alignment: 'center'}],
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: ['100%'],
            margin: [0, 0, 0, 0],
            body: [
              [
                {
                  text: [
                    {fontSize: 30, text: item.user_template_title},
                    '\n',
                    {fontSize: 15, text: 'For ' + user.u_fullname},
                    '\n',
                    '\n',
                    {margin: 20, fontSize: 18, text: item.user_template_desp},
                  ],
                  minHeight: 400,

                  fillColor: item.user_allergy_temp_color,
                  border: [false, false, false, false],
                  margin: 20,
                  textTransform: 'uppercase',
                },
              ],
            ],
          },
        },

        listItem,
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    const pdfDocGenerator = pdfMake.createPdf(dd);
    pdfDocGenerator.getBase64(async data => {
      let base64Data = `data:application/pdf;base64,` + data;
      await Share.open({url: base64Data});
    });
  };
  const onAddItem = () => {
    setModalVisible(false);
    if (itemName != '') {
      selectedProduct([...products, itemName]);
      addItemApi([...products, itemName]);
    }
  };
  const addItemApi = formalPro => {
    item.user_template_items = formalPro.toString();

    console.log(item.user_template_items);
    api
      .post('?action=editAllergyTemplate', item)
      .then(res => {
        toast.show('Template Edit Successfully');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(function () {});
  };
  const removeitem = value => {
    const newarr = products.filter(function (ele) {
      return ele != value;
    });
    selectedProduct([...newarr]);
    addItemApi(newarr);
  };
  const fetchCopiedText = str => {
    Clipboard.setString(
      `${str.user_template_title}\n\n${
        str.user_template_desp
      }\n\n${products.toString()}\n\nGenerated Using POMONA APP`,
    );
    toast.show('Template copied!!', {type: 'success'});
  };
  return (
    <>
      <View
        style={[
          globalStyle.container,
          globalStyle.dullBackground,
          {backgroundColor: item.user_allergy_temp_color},
        ]}>
        <Header
          products={products}
          generatePDF={generatePDF}
          item={item}
          fetchCopiedText={fetchCopiedText}
          navigation={navigation}></Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[globalStyle.rowSpaceBetween, globalStyle.mt5]}>
            <View style={[globalStyle.rowSpaceBetween]}>
              {user?.u_profile == '' ? (
                <Image
                  style={{width: 50, height: 50, borderRadius: 10}}
                  source={require('../../assets/img/logo.png')}></Image>
              ) : (
                <Image
                  style={{width: 50, height: 50, borderRadius: 10}}
                  source={{uri: imageApi + puser?.u_profile}}></Image>
              )}

              <Text
                style={[globalStyle.heading, {fontSize: 20}, globalStyle.ml5]}>
                {puser?.u_fullname}’s Allergy
              </Text>
            </View>
          </View>
          <Text
            style={[
              {
                color: colors.black,
                fontFamily: fontFamily.AltaRegular,
                fontSize: 25,
              },
              globalStyle.mt5,
            ]}>
            {item.user_template_title}
          </Text>
          <Text
            style={[
              globalStyle.paragraph,
              {color: colors.black},
              globalStyle.mt5,
            ]}>
            {item.user_template_desp}
          </Text>
          <Text
            style={[
              globalStyle.paragraph,
              {color: colors.black, fontSize: 20},
              globalStyle.mt5,
            ]}>
            Items
          </Text>
          <View style={globalStyle.mt5}>
            {products &&
              products.map(litem => (
                <View style={styles.itemBack}>
                  <Text
                    style={[
                      globalStyle.paragraph,
                      {fontSize: 15, width: '90%'},
                    ]}>
                    {litem}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        'Delete Item',
                        'Are you sure you want to delete?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              removeitem(litem);
                            },
                          },
                        ],
                      );
                    }}
                    style={{padding: 5}}>
                    <ANT color="red" name="close"></ANT>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
        <AddItem
          setItemName={setItemName}
          onAddItem={onAddItem}
          modalVisible={modalVisible}
          onChooseFromExist={()=>navigation.navigate('AddProducts',{item:item})}
          setModalVisible={setModalVisible}></AddItem>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={[
              globalStyle.paragraph,
              {color: colors.black},
              globalStyle.mt5,
            ]}>
            + Add items
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TemplateDetails;

const styles = StyleSheet.create({
  smallBox: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    justifyContent: 'center',
    padding: 10,
  },
  itemBack: {
    backgroundColor: colors.white,
    padding: 15,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

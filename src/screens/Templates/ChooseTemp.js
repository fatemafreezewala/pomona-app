import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React,{useContext} from 'react';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import Arrow from '../../assets/img/Login/ChevronRight.svg';
import fontFamily from '../../constant/fontFamily';
import ArrowW from '../../assets/img/Home/arrow.svg';
import Loader from '../../components/Loader';
import FlatlistComp from '../../components/FlatlistComp';
import api from '../../constant/api';
import AppContext from '../../context/AppContext';

const ChooseTemp = ({navigation}) => {
  const [templateList, setTemplateList] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const {puser, setUser} = useContext(AppContext);

  const getTemplate = () => {
    setLoading(true);
    api
      .post('?action=getPredefinedTemplate',{user_id:puser.u_id})
      .then(res => {
        let tempData = res.data.data
        tempData.sort((a, b) => a.template_title.localeCompare(b.template_title))

        setTemplateList(tempData);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    getTemplate();
  }, []);
  const items = ({item}) => {
    const list = item.template_items.split(',');
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AddNewTemp', {item: item})}
        style={[
          globalStyle.mt5,
          {backgroundColor: colors.white, padding: 15, borderRadius: 5},
        ]}>
        <Text
          style={[
            globalStyle.paragraph,
            {fontSize: 20, fontFamily: fontFamily.Medium},
          ]}>
          {item.template_title}
        </Text>
        <Text style={globalStyle.paragraph}>
          {item.template_desp && item.template_desp.substring(0, 150)}...
        </Text>
        <View style={[globalStyle.rowSpaceBetween]}>
          <Text
            style={[
              globalStyle.paragraph,
              {color: colors.black, fontFamily: fontFamily.Medium},
            ]}>
            Items includes - {item.template_items && list.length} Items
          </Text>
          <View
            style={{
              elevation: 4,
              backgroundColor: colors.white,
              width: 30,
              height: 30,
              borderRadius: 30,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ArrowW></ArrowW>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <View style={[{height: 50, flexDirection: 'row', alignItems: 'center'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={globalStyle.rowCenter}>
            <Arrow></Arrow>
            <Text style={[globalStyle.ml10, globalStyle.paragraph]}>
              Create New
            </Text>
          </View>
        </TouchableOpacity>
        <View></View>
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
        CHOOSE TEMPLATE
      </Text>
      <Text
        style={[
          globalStyle.paragraph,
          {color: colors.black, fontSize: 13},
          globalStyle.mt5,
        ]}>
        Checkout our library of curated healing diet templates, available for
        free, or create your own custom template to meet your bio-individual
        needs.{' '}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader loading={loading}></Loader>
        <FlatlistComp DATA={templateList} renderItem={items}></FlatlistComp>
      </ScrollView>
    </View>
  );
};

export default ChooseTemp;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Email from '../../assets/img/Restaurant/email.svg';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';
import Header from '../../components/Profile/Header';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import FlatlistComp from '../../components/FlatlistComp';
import api from '../../constant/api';
import Loader from '../../components/Loader';

const GetInTouch = ({navigation}) => {
  const [FAQList, setFAQList] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const getFAQ = () => {
    setLoading(true);
    api
      .get('?action=getFAQ')
      .then(res => {
        setFAQList(res.data.data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getFAQ();
  }, []);

  const items = ({item}) => {
    return (
     
        <Collapse
        style={{backgroundColor: '#fff', borderRadius: 10, marginTop: 10}}>
        <CollapseHeader>
          <View
            style={[
              {backgroundColor: '#fff', padding: 15, borderRadius: 10},
              globalStyle.rowSpaceBetween,
            ]}>
            <View style={globalStyle.rowCenter}>
              <Text style={{color: '#000', fontFamily: fontFamily.Medium,width:'90%'}}>
                {item.faq_title}
              </Text>
              <MI name="chevron-down" size={30}></MI>
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody style={{padding:10}}>
          <Text style={globalStyle.paragraph}>{item.faq_desp}</Text>
        </CollapseBody>
      </Collapse>
  
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header onPress={() => navigation.goBack()} title="FAQ"></Header>
      <View
        style={[
          {
            alignSelf: 'center',
            marginHorizontal: 15,
            marginBottom:20
          },
          globalStyle.mt10,
        ]}>
        <Loader loading={loading}></Loader>
        <FlatlistComp DATA={FAQList} renderItem={items}></FlatlistComp>
      </View>
      
    </View>
  );
};

export default GetInTouch;

const styles = StyleSheet.create({
  desp: {
    color: colors.black,
    fontFamily: fontFamily.Medium,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
  },
});

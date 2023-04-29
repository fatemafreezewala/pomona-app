import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import InnerPageHeading from '../../components/InnerPageHeading';
import globalStyle from '../../styles/globalStyle';
import Card from '../../components/Templates/Card';
import Add from '../../assets/img/Templates/add.svg';
import api from '../../constant/api';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';

const Index = ({route, navigation}) => {
  const [getTemplate, setGetTemplate] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
    });
    return unsubscribe;
  }, [navigation]);
  const getUser = async () => {
    let usera = await AsyncStorage.getItem('USER');
    usera = JSON.parse(usera);
    setUser(usera);
    getTemplateData(usera.u_id);
  };
  const getTemplateData = id => {
    setLoading(true);
    api
      .post('?action=getAllergyTempByID', {
        user_id: id,
      })
      .then(res => {
        let Raaaray = res.data.data.reverse();
        setGetTemplate(Raaaray);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
     
  };

  const items = ({item}) => {
    return (
      <Card
        onPress={() =>
          navigation.navigate('TemplateDetails', {item: item, user: user})
        }
        item={item}></Card>
    );
  };
  return (
    <View style={[globalStyle.container, globalStyle.dullBackground]}>
      <InnerPageHeading
        title="MY TEMPLATES"
        subtitle="Create and maintain your allergy cards"></InnerPageHeading>
      <View style={globalStyle.mt10}></View>
      <Loader loading={loading}></Loader>

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={getTemplate}
        ListEmptyComponent={<Text style={{color: colors.primary, margin: 15,fontFamily:fontFamily.Medium}}>
        No Allergy Templates Found
      </Text>}
        renderItem={items}
        keyExtractor={item => item.user_template_id}></FlatList>

      <View
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: 0,
          margin: 15,
          right: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateNew')}>
          <Add></Add>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});

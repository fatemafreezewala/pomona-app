import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import Email from '../../assets/img/Restaurant/email.svg';
import globalStyle from '../../styles/globalStyle';
import colors from '../../constant/colors';
import fontFamily from '../../constant/fontFamily';
import Header from '../../components/Profile/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../constant/api';
// import { LineChart, Grid } from 'react-native-svg-charts'
import {ReactNativeAmChart} from 'react-native-amcharts';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import moment from 'moment';

const Insights = ({navigation}) => {
  const [report, setReport] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [perecentage, setPercentage] = React.useState(0);
  const data = [{value: 50}, {value: 80}, {value: 90}, {value: 70}];

  const getReport = async () => {
    let userid = await AsyncStorage.getItem('USER_TOKEN');
    let usera = await AsyncStorage.getItem('USER');
    usera = JSON.parse(usera);
    console.log(usera);
    setLoading(true);
    api
      .post('?action=getLastMood', {
        user_id: usera.u_id,
      })
      .then(res => {
        const myData = res.data.data;
       if(myData.length){
        let gggData = [];
        let percentagedata = [];
        myData.forEach(element => {
          percentagedata.push(parseInt(element.mt_percentage));
          var oneDate = moment(element.mt_date, 'DD-MM-YYYY');
          var dayName = oneDate.format('ddd');
          gggData.push({
            value: parseInt(element.mt_percentage),
            label: dayName,
          });
        });
        gggData = gggData.reverse();
        setReport(gggData);
        const percentage =
          (percentagedata.reduce((a, b) => a + b, 0) / gggData.length) * 100;

        setPercentage(parseInt(percentage / 100));
       }
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    getReport();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header onPress={() => navigation.goBack()} title="Insights"></Header>

      <ScrollView>
      {report ? ( <View
          style={[
            {
              backgroundColor: '#fff',
              width: '95%',
              padding: 20,
              alignSelf: 'center',
              borderRadius: 15,
              justifyContent: 'center',

            },
            globalStyle.mt10,
          ]}>
          {perecentage > 50 && perecentage <= 100 && (
            <>
              <Text
                style={{
                  marginVertical: 20,
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Your Over ALL MOOD - Happy
              </Text>
              <View
                style={{
                  width: 200,
                  backgroundColor: '#fff',
                  height: 200,
                  borderRadius: 200,
                  borderColor: '#8bcd6f94',
                  borderWidth: 30,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.Bold,
                    fontSize: 30,
                    color: '#000',
                  }}>
                  {perecentage} %
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Regular,
                    fontSize: 15,
                    color: '#aaa',
                  }}>
                  out of 100
                </Text>
              </View>
            </>
          )}
          {perecentage > 25 && perecentage <= 50 && (
            <>
              <Text
                style={{
                  marginVertical: 20,
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Your Over ALL MOOD - Neutral
              </Text>
              <View
                style={{
                  width: 200,
                  backgroundColor: '#fff',
                  height: 200,
                  borderRadius: 200,
                  borderColor: '#7cc6ff94',
                  borderWidth: 30,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.Bold,
                    fontSize: 30,
                    color: '#000',
                  }}>
                  {perecentage} %
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Regular,
                    fontSize: 15,
                    color: '#aaa',
                  }}>
                  out of 100
                </Text>
              </View>
            </>
          )}

          {perecentage <= 25 && (
            <>
              <Text
                style={{
                  marginVertical: 20,
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Your Over ALL MOOD - SAD
              </Text>
              <View
                style={{
                  width: 200,
                  backgroundColor: '#fff',
                  height: 200,
                  borderRadius: 200,
                  borderColor: '#fd646494',
                  borderWidth: 30,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.Bold,
                    fontSize: 30,
                    color: '#000',
                  }}>
                  {perecentage} %
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.Regular,
                    fontSize: 15,
                    color: '#aaa',
                  }}>
                  out of 100
                </Text>
              </View>
            </>
          )}

          <BarChart
            barBorderRadius={10}
            barWidth={10}
            frontColor="#fde886"
            initialSpacing={10}
            yAxisColor={'#ccc'}
            xAxisColor={'#ccc'}
            labelsExtraHeight={0}
            rotateLabel={true}
            data={report}
            labelWidth={50}
            maxValue={100}
          />
        </View>) : (<View
          style={[
            {
              backgroundColor: '#fff',
              width: '95%',
              padding: 15,
              alignSelf: 'center',
              borderRadius: 15,
              justifyContent: 'center',
            },
            globalStyle.mt10,
          ]}> 
          <Text
          style={{
            fontFamily: fontFamily.Bold,
            fontSize: 30,
            color: '#000',
          }}>
          No data Found
        </Text>
        </View>)}
       
      </ScrollView>
    </View>
  );
};

export default Insights;

const styles = StyleSheet.create({
  desp: {
    color: colors.black,
    fontFamily: fontFamily.Medium,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
  },
});

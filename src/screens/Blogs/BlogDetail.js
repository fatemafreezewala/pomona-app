import { StyleSheet, Text, View ,Image, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import globalStyle from '../../styles/globalStyle'
import colors from '../../constant/colors'
import RShare from '../../assets/img/Blogs/share.svg'
import fontFamily from '../../constant/fontFamily'
import Arrow from '../../assets/img/Blogs/arrow-w.svg'
import Girl from '../../assets/img/Blogs/girl.svg'
import imageApi from '../../constant/imageApi'
import Share from 'react-native-share'
const BlogDetail = ({route,navigation}) => {
  const {item} = route.params
  const OnShare = () =>{
    Share.open({title:item.blog_title,message:item.blog_desp})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
  }
  return (
    <View style={[globalStyle.container,globalStyle.dullBackground,{padding:0}]}>
      <View style={[{backgroundColor:colors.primary,padding:15}]}>
        <View style={[globalStyle.rowSpaceBetween,globalStyle.mb10]}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Arrow style={{color:'#fff'}}></Arrow>
          <Text style={[globalStyle.ml10,globalStyle.paragraph,{color:'#fff'}]}>back</Text>
        </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            OnShare()
          }}>
            <RShare></RShare>
          </TouchableOpacity>
          
        </View>
        <Text style={[{color:colors.white,fontSize:18,fontFamily:fontFamily.Medium,lineHeight:25}]}>
            {item.blog_title}
        </Text>
     </View>
     <ScrollView showsVerticalScrollIndicator={false}>
     
    <Image style={{height:250}} source={{uri:imageApi+item.blog_img}}></Image>
    <Text style={{margin:15,fontFamily:fontFamily.Regular,lineHeight:20,color:colors.midGrey}}>
    {item.blog_desp}
    </Text>
     </ScrollView>
    </View>
  )
} 

export default BlogDetail

const styles = StyleSheet.create({})
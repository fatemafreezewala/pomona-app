import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import InnerPageHeading from '../../components/InnerPageHeading'
import globalStyle from '../../styles/globalStyle'
import FlatlistComp from '../../components/FlatlistComp'
import Card from '../../components/Blogs/Card'
import api from '../../constant/api'
import Loader from '../../components/Loader'



const Index = ({navigation}) => {

  const [blogList, setBlogList] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const getBlog = () =>{
    setLoading(true)
    api.get('?action=getBlogs').then(res=>{
     setBlogList(res.data.data)
    })
    setLoading(false)
  }
  
  useEffect(() => {
    getBlog()
  }, [])


  const items = ({item}) =>{
    return <Card onPress={()=> navigation.navigate('BlogDetail',{item:item})} item={item}></Card>
  }
  
  return (
    <View style={[globalStyle.container,globalStyle.dullBackground]}>
      <InnerPageHeading title="Blogs" subtitle="Best reads of the day"></InnerPageHeading>
      <View style={globalStyle.mt10}></View>
      <Loader loading={loading}></Loader>
      <FlatlistComp  DATA={blogList} renderItem={items}></FlatlistComp>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})
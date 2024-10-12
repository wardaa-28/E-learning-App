import { FlatList, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton'
import newTheme from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Styles from '../utils/Styles'
import { useNavigation } from '@react-navigation/native'
import Webhandler from '../data/remote/Webhandler'
import Url from '../data/remote/Url'
import {BallIndicator} from 'react-native-indicators'

const CustomFeatured = () => {
    const navigation=useNavigation()
const [courses,setCourses]=useState([])
const [loading,setLoading]=useState(true)
    useEffect(()=>{
        getFeaturedCourses()
    },[])
    const getFeaturedCourses = async ()=>{
        const data = await Webhandler(Url.FEATURED_COURSE,null,'GET')
        console.log("🚀 ~ getFeaturedCourses ~ data:",JSON.stringify( data))
       setCourses(data)
       setLoading(false)
    }

    const screen=(id)=>{ 
        if (id) {
            navigation.navigate("CourseDetails", { id });
        }
}
  return (
    <View>
        {loading? <BallIndicator size={30} color={newTheme.grey} />:(
    <FlatList horizontal
    showsHorizontalScrollIndicator={false}
    data={courses}
    renderItem={({item})=>{
        return(
        <View style={{flex:1}}>
            <TouchableOpacity style={styles.flatList} activeOpacity={0.7} onPress={()=>screen(item.id)} >
                <Image source={{uri:item?.data?.details?.img}}  style={{borderRadius:10,width:"100%",height:120,}} resizeMode='cover'/>
                <LinearGradient
                colors={[newTheme.color1, newTheme.color2]}
                style={{justifyContent:'center',alignItems:'center',borderRadius:10,marginTop:8,padding:4.5,width:'100%'}}>
                   <CustomButton title={item?.data?.details?.category} textcolor={newTheme.white} fontsize={16} fontFamily={newTheme.regular} padding={0.5} boxwidth={'100%'} />
            </LinearGradient>
                <View style={{width:'90%'}}>
                <Text style={[Styles.heading,{ fontSize:16}]}>{item?.data?.details?.title}</Text>
                </View>
                <View style={styles.flexBox}>
                <View style={Styles.row}>
                    <AntDesign name={'star'} size={20} color={'#E49907'}/>
                <Text style={Styles.subHeading }>{item?.data?.details?.rating}</Text>
                <Text style={Styles.subHeading}> ( {item?.data?.details?.numOfReviews} reviews)</Text>
                </View>
                <View>
                <Text style={Styles.subHeading}>$ {item?.data?.details?.price}</Text>
                </View>
                </View>
            </TouchableOpacity>
        </View>
        )
    }}  
    />
)}
  </View>
  )
}

export default CustomFeatured

const styles = StyleSheet.create({
    flexBox:{flexDirection:'row',justifyContent:'space-between'},
    flatList:{padding:10,backgroundColor:newTheme.white,margin:5,borderColor:newTheme.white,borderWidth:2,elevation:4,borderRadius:10,height:265,shadowColor:newTheme.color1},


})
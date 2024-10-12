import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import newTheme from '../utils/Constants'
import Styles from '../utils/Styles'
import Webhandler from '../data/remote/Webhandler'
import { useRoute } from '@react-navigation/native'
import {BallIndicator} from 'react-native-indicators'
const MentorReviews = () => {
  const [mentor,setMentor]=useState([])
  const [loading,setLoading]=useState(true)
  const route = useRoute();
  const { id } = route.params;
 
useEffect(() => {
    getMentorDetails();
}, []);

const getMentorDetails = async () => {
        const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/mentors/reviews/${id}`, null, 'GET');
        console.log("🚀 ~ getMentorDetails ~ data:",JSON.stringify (data))
       setMentor(data); 
       setLoading(false)
};
  
  return (
    <View style={Styles.main}>
      {loading? <BallIndicator size={30} color={newTheme.grey} />:(
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mentor}
        renderItem={({ item }) => {
          return (
            <View style={{justifyContent:'center',alignItems:'center',}}>
            
            <View style={{backgroundColor:newTheme.white,borderWidth:2,borderRadius:10,borderColor:newTheme.white,elevation:4,width:'95%',margin:10,padding:8,shadowColor:newTheme.color1}}>
              <View style={{flexDirection:'row'}}>
            <View style={styles.imageView}>
                  <Image source={require('../images/profile.png')} resizeMode='contain' style={{margin:3,width:'100%',flex:1,marginRight:15,height:150}} />
            </View>
            <View style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}>
              <View style={styles.dateView}>
                <Text style={Styles.heading}>{item?.user?.name}</Text>
                <Text style={Styles.title}>{item?.user?.email}</Text>
                  <View style={Styles.row}>
                  <Text style={styles.text}>{item?.rating} </Text>
                    <AntDesign name={'star'} size={20} color={'#E49907'} />
                    <AntDesign name={'star'} size={20} color={'#E49907'} />
                    <AntDesign name={'star'} size={20} color={'#E49907'} />
                    <AntDesign name={'star'} size={20} color={'#E49907'} />
                  </View>
               </View>
               </View>
              </View>
              <Text style={Styles.subHeading}>{item?.review}</Text>
            </View>
            </View>
          )
        }}
      />
      )}
    </View>
  )
}

export default MentorReviews

const styles = StyleSheet.create({
  imageView: { width: '30%', height: 100 },
  text: { fontFamily: newTheme.semiBold, fontSize: 18, color: newTheme.black, textAlign: 'center' },
  titleView: { justifyContent: 'center', marginLeft: 8 },
  dateView: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }
})
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../components/CustomButton'
import newTheme from '../utils/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Styles from '../utils/Styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import Webhandler from '../data/remote/Webhandler'
import {BallIndicator} from 'react-native-indicators' 
const MentorCourses = (props) => {
const navigation = useNavigation()
  const [mentor,setMentor]=useState([])
  const [loading,setLoading]=useState(true)
  const route = useRoute();
  const { id } = route.params;
 
useEffect(() => {
    getMentorCourses();
}, []);

const getMentorCourses = async () => {
        const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/mentors/courses/${id}`, null, 'GET');
        console.log("🚀 ~ getMentorCourses ~ data:",JSON.stringify (data))
       setMentor(data); 
       setLoading(false)
};

const screen=(id)=>{ 
  if (id) {
      navigation.navigate("CourseDetails", { id });
  }
}

 
  return (
    <View style={{flex:1}}>
      {loading? <BallIndicator size={30} color={newTheme.grey} />:(
      <FlatList
      showsVerticalScrollIndicator={false}
        data={mentor}
        renderItem={({ item }) => {
          return (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
              <TouchableOpacity style={ { marginBottom:3,flexDirection:'row',borderRadius:10,borderWidth:2,width:'95%',backgroundColor:newTheme.white,padding:5,borderColor:newTheme.white,elevation:4 ,marginTop:10,shadowColor:newTheme.color1}} activeOpacity={0.6} onPress={props.press}>
                <View style={[Styles.justify, { width: '30%' ,marginRight:8}]} >
                  <Image source={{uri:item?.data?.details?.img}} resizeMode='cover' style={styles.image} height={100} width={'100%'} />
                </View>
                <View>
                  <LinearGradient
                    colors={[newTheme.color1, newTheme.color2]}
                    style={styles.linear}>
                    <CustomButton title={item?.data?.details?.category} textcolor={newTheme.white} fontsize={16} boxwidth={'90%'} fontFamily={newTheme.regular} padding={0.1} />
                  </LinearGradient>
                  <View style={{ width: '90%' }}>
                    <Text style={[Styles.textBox, { fontSize: 16, margin: 3 }]}>{item?.data?.details?.title}</Text>
                  </View>
                  <View style={Styles.row}>
                    <View style={Styles.row}>
                      <AntDesign name={'star'} size={20} color={'#E49907'} />
                      <Text style={Styles.subHeading}>{item?.data?.details?.rating}</Text>
                      <Text style={Styles.subHeading}> ({item?.data?.details?.numOfReviews} reviews)</Text>
                      <Text style={[Styles.subHeading, { marginLeft: 10}]}>${item?.data?.details?.price}</Text>
                    </View>
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

export default MentorCourses

const styles = StyleSheet.create({
  linear: { borderRadius: 10,  width: '70%' },
  image: { borderRadius: 10,marginRight:10 }
})
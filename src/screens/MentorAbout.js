import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Socials from '../components/Socials'
import Styles from '../utils/Styles'
import { useRoute } from '@react-navigation/native'
import Webhandler from '../data/remote/Webhandler'

const MentorAbout = () => {
  const [about,setAbout]=useState([])
 
  useEffect(() => {
    getMentorAbout();
}, []);

const getMentorAbout = async () => {
        const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/mentors/${id}/about`, null, 'GET');
        console.log("🚀 ~ getMentorAbout ~ data:", data)
       setAbout(data); 
};
  return (
    <View style={Styles.main}>
      <View>
      <Text style={Styles.subTitle}>It is a long established fact that a reader will be
      distracted by the readable content of a page
      when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less
      normal distribution of letters, as opposed to
      using 'Content here, content here', making it
      look like readable English. Many desktop
      publishing packages and web page editors now
      use Lorem Ipsum as their default model text</Text>
      </View>
      <Socials/>
    </View>

  )
}

export default MentorAbout

const styles = StyleSheet.create({})
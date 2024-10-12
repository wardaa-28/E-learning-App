import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../utils/Styles';
import newTheme from '../utils/Constants'; 
import { useRoute } from '@react-navigation/native';

const Socials = () => {
  const route = useRoute();
  const { id } = route.params;
  const [mentor, setMentor] = useState(null); 

  useEffect(() => {
    getMentorDetails();
  }, [id]); 

  const getMentorDetails = async () => {
    try {
      const response = await fetch(`https://elearningportal-56538109f664.herokuapp.com/mentors/data/${id}`);
      const data = await response.json();
      console.log("🚀 ~ getMentorDetails ~ data:", JSON.stringify(data));
      setMentor(data);
    } catch (error) {
      console.error("Error fetching mentor details:", error);
    }
  };

  if (!mentor) return <Text>Loading...</Text>; 

  return (
    <View>
      <Text style={Styles.heading}>Social Media</Text>
      <View style={Styles.row}>
        {mentor.socialMedia?.[0]?.link && (
          <TouchableOpacity
            style={styles.icons}
            onPress={() => Linking.openURL(mentor.socialMedia[0].link)}
          >
            <Image source={require('../images/linkedin.png')} style={styles.iconSize} resizeMode='contain' />
          </TouchableOpacity>
        )}
        {mentor.socialMedia?.[1]?.link && (
          <TouchableOpacity
            style={styles.icons}
            onPress={() => Linking.openURL(mentor.socialMedia[1].link)}
          >
            <Image source={require('../images/twitter.png')} style={styles.iconSize} resizeMode='contain' />
          </TouchableOpacity>
        )}
        {mentor.socialMedia?.[2]?.link && (
          <TouchableOpacity
            style={styles.icons}
            onPress={() => Linking.openURL(mentor.socialMedia[2].link)}
          >
            <Image source={require('../images/facebook.png')} style={styles.iconSize} resizeMode='contain' />
          </TouchableOpacity>
        )}
        {mentor.socialMedia?.[3]?.link && (
          <TouchableOpacity
            style={styles.icons}
            onPress={() => Linking.openURL(mentor.socialMedia[3].link)}
          >
            <Image source={require('../images/github.png')} style={styles.iconSize} resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Socials;

const styles = StyleSheet.create({
  icons: {
    width: '15%',
    height: 50,
    backgroundColor: '#cacdcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 3,
  },
  iconSize: {
    width: '50%',
    height: 100,
  },
});

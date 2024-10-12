import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import newTheme from '../utils/Constants';
import Styles from '../utils/Styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Webhandler from '../data/remote/Webhandler';
import CustomButton from '../components/CustomButton';
import MentorCourses from './MentorCourses';
import MentorReviews from './MentorReviews';
import Socials from '../components/Socials';
 

const MentorProfile = () => {
  const navigation=useNavigation()
  const [selectedSection, setSelectedSection] = useState('About');
  const [mentor,setMentor]=useState([])
  const route = useRoute();
  const { id } = route.params;
 
useEffect(() => {
    getMentorDetails();
}, []);

const getMentorDetails = async () => {
        const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/mentors/data/${id}`, null, 'GET');
        console.log("🚀 ~ getMentorDetails ~ data:",JSON.stringify (data))
       setMentor(data); 
};
 
const screen=(id) => {
  if (id) {
      navigation.navigate("CourseDetails", { id:mentor.id, });
  }
}


 
  return (
    <View style={Styles.main}>
      <CustomHeader showBack={true} title={'Mentor Profile'} />
      <View style={Styles.justify}>
        <View style={styles.imageContainer}>
          <Image source={{uri:mentor?.image}} style={styles.img} resizeMode='cover' />
        </View>
        <Text style={[Styles.heading, { marginTop: 8 }]}>{mentor?.name}</Text>
      </View>
      
      <View style={[Styles.justify, { flexDirection: 'row' }]}>
        <TouchableOpacity style={styles.button}>
          <Text style={Styles.heading}>{mentor?.numOfCourses}</Text>
          <Text style={Styles.subTitle}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={Styles.heading}>2.3 k</Text>
          <Text style={Styles.subTitle}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={Styles.heading}>{mentor?.numOFReviews}</Text>
          <Text style={Styles.subTitle}>Reviews</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>
        <CustomButton  title={'About'}  textcolor={newTheme.white}  fontsize={16} wbox={'100%'} boxwidth={'30%'} backgroundcolor={selectedSection === 'About' ? newTheme.primary : newTheme.grey} action={() => setSelectedSection('About')} radius={0.2} topLeftRadius={10} bottomLeftRadius={10}/>
        <CustomButton title={'Course'}  textcolor={newTheme.white} fontsize={16} wbox={'100%'}  boxwidth={'30%'} backgroundcolor={selectedSection === 'Courses' ? newTheme.primary : newTheme.grey} action={() => setSelectedSection('Courses')} radius={0.2}  />
        <CustomButton title={'Reviews'} textcolor={newTheme.white} fontsize={16} wbox={'100%'} boxwidth={'30%'} backgroundcolor={selectedSection === 'Reviews' ? newTheme.primary : newTheme.grey} action={() => setSelectedSection('Reviews')} radius={0.2} topRightRadius={10} bottomRightRadius={10}/>
      </View>
      {selectedSection === 'About' && 
      <View style={[Styles.main,{marginTop:8}]}> 
      <Text style={Styles.subTitle}>{mentor?.about}</Text>
      <Socials />
      </View>}
      {selectedSection === 'Courses' && <MentorCourses  press={()=>screen(mentor.id,)}/>}
      {selectedSection === 'Reviews' && <MentorReviews />}
    </View>
  );
}

export default MentorProfile;

const styles = StyleSheet.create({
  imageContainer: { borderWidth: 2, borderColor: newTheme.primary,borderRadius: 75, width: 150, height: 150, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'},
  img: {width: '100%',height: '100%', borderRadius: 75},
  button: { padding: 15, justifyContent: 'center', alignItems: 'center' },
  linear: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 4.5, width: '80%' },
  image: { borderRadius: 10, marginTop: 5,marginRight:10 }
});

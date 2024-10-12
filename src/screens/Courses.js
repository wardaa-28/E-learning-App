import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import newTheme from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Styles from '../utils/Styles';
import Webhandler from '../data/remote/Webhandler';
import Url from '../data/remote/Url';
import { BallIndicator } from 'react-native-indicators';
import LottieView from 'lottie-react-native';
const Courses = () => {
  const navigation = useNavigation();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getBoughtCourses();
    }, [])
  );

  const getBoughtCourses = async () => {
    try {
      const data = await Webhandler(Url.MY_COURSES, null, 'GET');
      console.log("🚀 ~ getBoughtCourses ~ data:", JSON.stringify(data));
      setMyCourses(data);
    } catch (error) {
      console.error( error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <View style={Styles.main}>
      <CustomHeader title={'My Courses'} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <BallIndicator size={30} color={newTheme.grey} />
        ) : (
          <FlatList
          ListEmptyComponent={()=>{
            return(
              <View style={{justifyContent:'center',alignItems:'center',flex:1,height:550}}>
      <LottieView style={{ width: '90%', height: 140 }} source={require('../assets/animations/animation.json')} autoPlay />
                <Text style={{color:'black',fontFamily:newTheme.regular,fontSize:18}}> No Bought Course Available</Text>
              </View>
            )
          }}
            data={myCourses}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={() => navigation.navigate('CourseDetails', { id: item?.id, fromCoursesScreen: true })}
              >
                <View style={Styles.justify}>
                  <Image source={{ uri: item?.data?.details?.img }} resizeMode='cover' style={{ width: '100%', borderRadius: 10, height: 150 }}/>
                </View>
                <LinearGradient
                  colors={[newTheme.color1, newTheme.color2]}
                  style={styles.linear}
                >
                  <CustomButton title={item?.data?.details?.category} textcolor={newTheme.white} fontsize={16} fontFamily={newTheme.regular} padding={0.5} />
                </LinearGradient>
                <View>
                  <Text style={[Styles.heading, { fontSize: 18 }]}>{item?.data?.details?.title}</Text>
                </View>
                <View style={Styles.box}>
                  <View>
                    <Text style={Styles.subHeading}>Completed: {item?.completed}</Text>
                    <Text style={Styles.subHeading}>Progress: {item?.progress}</Text>
                  </View>
                  <View>
                    <Text style={Styles.subHeading}>${item?.data?.details?.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  button: { padding: 10, borderRadius: 10, margin: 5, backgroundColor: newTheme.white, elevation: 4, shadowColor: newTheme.color1 },
  linear: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 4.5, width: '100%' },
  noCoursesContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20},
  noCoursesText: { fontSize: 20, color: newTheme.grey, marginTop: 20, fontWeight: 'bold' },
  noCoursesSubText: { fontSize: 16, color: newTheme.grey, marginTop: 10, textAlign: 'center' },
  animationStyle: { width: '100%', height: 100 }, 
});

import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import newTheme from '../utils/Constants';
import Styles from '../utils/Styles';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Webhandler from '../data/remote/Webhandler';
import { BallIndicator } from 'react-native-indicators';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Url from '../data/remote/Url';
import LottieView from 'lottie-react-native';

const Saved = () => {
  const navigation = useNavigation();
  const [savedCourses, setSavedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getSavedCourses();
    }, [])
  );

  const getSavedCourses = async () => {
    const data = await Webhandler(Url.SAVED_COURSES, null, 'GET');
    console.log("🚀 ~ getSavedCourses ~ data:", data)
    setSavedCourses(data);
    setLoading(false);
  };

  const saved = (id) => {
   
    if (id) {
      navigation.navigate("CourseDetails", { id });
    }
  };

  const delSavedCourse = async (id) => {
    try {
      const response = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/saved/${id}`, {}, 'DELETE');
      console.log("🚀 ~ delSavedCourse ~ response:", response); 
      if (response) {
        setSavedCourses(savedCourses.filter(course => course.id !== id));
      }
    } catch (error) {
      console.error( error); 
    }
  };

  return (
    <View style={Styles.main}>
      <CustomHeader title={'Saved'} />
      <View style={{ flex: 1 }}>
        {loading ? (
          <BallIndicator size={30} color={newTheme.grey} />
        ): (
          <FlatList 
          ListEmptyComponent={()=>{
            return(
              <View style={{justifyContent:'center',alignItems:'center',flex:1,height:550}}>
      <LottieView style={{ width: '90%', height: 140 }} source={require('../assets/animations/animation.json')} autoPlay />
      <Text style={{color:newTheme.black,fontFamily:newTheme.regular,fontSize:18}}> No Saved Course Available</Text>

              </View>
            )
          }}
            showsVerticalScrollIndicator={false}
            data={savedCourses}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => saved(item?.id)}  >
                <ImageBackground source={{ uri: item?.data?.details?.img }} resizeMode='cover' style={{ width: '100%', borderRadius: 10, height: 150 }}>
                  <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <CustomButton iconFamily={'MaterialIcons'} name={'delete'} boxwidth={'13%'} padding ={4} radius={30} backgroundcolor={'#c4c4c4'} marginRight={6} iconColor={newTheme.black} action={() => delSavedCourse(item?.id)} />
                  </View>
                </ImageBackground>
                <LinearGradient
                  colors={[newTheme.color1, newTheme.color2]}
                  style={styles.linear}>
                  <CustomButton title={item?.data?.details?.category} textcolor={newTheme.white} fontsize={16} fontFamily={newTheme.regular} padding={0.5} />
                </LinearGradient>
                <View>
                  <Text style={[Styles.heading, { fontSize: 18, marginTop: 8 }]}>{item?.data?.details?.title}</Text>
                </View>
                <View style={Styles.box}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <AntDesign name={'star'} size={20} color={'#E49907'} />
                      <Text style={Styles.subHeading}> {item?.data?.details?.rating}</Text>
                    </View>
                    <Text style={Styles.subHeading}>( {item?.data?.details?.numOfReviews} reviews)</Text>
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

export default Saved;

const styles = StyleSheet.create({
  button: { padding: 10, borderRadius: 10, margin: 5, backgroundColor: newTheme.white, elevation: 4,shadowColor:newTheme.color1 },
  linear: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 4.5, width: '100%' },
  emptyContainer:{ flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: newTheme.grey },
});

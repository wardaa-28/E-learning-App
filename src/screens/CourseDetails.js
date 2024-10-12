import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import newTheme from '../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';
import Styles from '../utils/Styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Webhandler from '../data/remote/Webhandler';
import { BallIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';
import ReactNativeModal from 'react-native-modal';

const CourseDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, fromCoursesScreen } = route.params;
  const [course, setCourse] = useState(null);
  const [idCourse, setIdCourse] = useState(null);
  const [mentorData, setMentorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([])
  const [bought, setBought]= useState(false)
const [model,setModel]=useState(false)
  useEffect(() => {
    getCourseDetails();
   
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCourseReviews();
    }, [])
  );


  const getCourseDetails = async () => {
    const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/get/${id}`, {}, 'GET');
    setCourse(data?.data);
    setIdCourse(data);
    setMentorData(data?.mentor);
    setLoading(false);

  };

  const handleMentorPress = () => {
    if (mentorData?.id) {
      navigation.navigate("MentorProfile", { id: mentorData?.id });
    }
  };

  const getCourseReviews = async () => {
    try {
      const reviewData = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/reviews/${id}`, {}, 'GET');
      setReviews(reviewData); 
      console.log("🚀 ~ getCourseReviews ~ reviewData:", reviewData)
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const payment = (id) => {
    if (id) {
      navigation.navigate('Checkout', {
        id: idCourse.id,
        price: course?.details?.price,
        title: course?.details?.title,
        image: { uri: course?.details?.img },
        rating: course?.details?.rating,
        reviews: course?.details?.numOfReviews,
        category: course?.details?.category,
      });
    }
  };

  const review = (id) => {
    if (fromCoursesScreen ) {
      if (id) {
        navigation.navigate('AddReview', {
          id: idCourse.id,
          title: course?.details?.title,
          image: { uri: course?.details?.img },
          mentor: mentorData,
  
        });
      }
      
    } else {
      setModalVisible(true);
    }
  };

  const saveCourse = async () => {
    try {
      if (isSaved) {
        Snackbar.show({
          text: 'Course is already saved.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
        return;
      }

      const response = await Webhandler(
        `https://elearningportal-56538109f664.herokuapp.com/courses/saved/${id}`, {}, 'POST'
      );
      if (response?.message) {
        setIsSaved(true);
        Snackbar.show({
          text: response?.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'green',
        });
      }
    } catch (error) {
      console.error("An error occurred while saving the course:", error);
    }
  };

  const deleteSavedCourse = async () => {
    try {
      const response = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/saved/${id}`, {}, 'DELETE');
      if (response) {
        setIsSaved(false);
        Snackbar.show({
          text: 'Course removed from saved list.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    } catch (error) {
      console.error("Error in deleteSavedCourse:", error);
    }
  };

  return (
   
    
    <ScrollView style={{flex:1,backgroundColor:newTheme.white}}  showsVerticalScrollIndicator={false}>
     {loading ? (
      <View style={{height:700}}>
         <BallIndicator size={30} color={newTheme.grey} />
       </View>
     ) 
     : 
     (  
      <View>
      <ImageBackground source={{ uri: course?.details?.img }} style={{ width: '100%', height: 220 }} resizeMode='cover'>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <CustomHeader showBack={true} iconColor={newTheme.white} />
    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <CustomButton
        iconFamily={'FontAwesome'}
        name={isSaved ? 'bookmark' : 'bookmark-o'}
        iconColor={newTheme.black}
        action={isSaved ? deleteSavedCourse : saveCourse}
        margin={5}
        wbox={'90%'}
        backgroundcolor={'#c8c8c8'}
        boxwidth={'15%'}
      />
    </View>
  </View>
</ImageBackground>

     
        <View>
          <View style={{ padding: 10 }}>
            <View style={Styles.box}>
              <LinearGradient
                colors={[newTheme.color1, newTheme.color2]}
                style={[Styles.linearBox, { width: '48%', padding: 8 }]}
              >
                <CustomButton title={course?.details?.category} textcolor={newTheme.white} textWidth={'80%'} fontsize={16} fontFamily={newTheme.regular} padding={0.1} />
              </LinearGradient>
              <View style={Styles.justify}>
                <Text style={Styles.title}>$ {course?.details?.price}</Text>
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={Styles.heading}>{course?.details?.title}</Text>
              </View>
              {/* <View style={{ flex:1, justifyContent: 'flex-end' ,alignItems:'flex-end'}}>
                <CustomButton iconFamily={'FontAwesome'} name={isSaved ? 'bookmark' : 'bookmark-o'} iconColor={newTheme.black} action={isSaved ? deleteSavedCourse : saveCourse} margin={8} wbox={'90%'}  backgroundcolor={newTheme.color1} boxwidth={'15%'} />
              </View> */}

              <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={handleMentorPress}>
                <View style={{ width: '30%', height: 90, marginRight: 10 }}>
                  <Image source={{ uri: mentorData?.img }} resizeMode='cover' style={{ width: 90, height: 90, borderRadius:45 }} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={Styles.heading}>{mentorData?.name}</Text>
                  <Text style={[Styles.title, { fontSize: 12 }]}>{mentorData?.title}</Text>
                </View>
              </TouchableOpacity>
              <View style={Styles.row}>
                <View style={[Styles.row, { justifyContent: 'flex-end', flex: 1 }]}>
                  <AntDesign name={'star'} size={20} color={'#E49907'} />
                  <Text style={Styles.subHeading}> {course?.details?.rating}</Text>
                  <Text style={Styles.subHeading}> ({course?.details?.numOfReviews} reviews)</Text>
                </View>
              </View>
              <View>
                <Text style={Styles.subHeading}>{course?.description}</Text>
              </View>
              <Text style={Styles.heading}>Lessons</Text>
              <FlatList
            data={course?.lessons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
    <TouchableOpacity
      style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 3, borderRadius: 10 }}
      onPress={() => {
        if (fromCoursesScreen) {
          navigation.navigate('VideoCourse', {
            courseId: idCourse?.id,
            video: item?.video
          });
        } else {
          setModel(true); 
        }
      }}
    >
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: newTheme.primary, padding: 10, borderRadius: 10, marginRight: 5 }}>
          <SimpleLineIcons name={'control-play'} color={newTheme.white} size={20} />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={[Styles.heading, { fontSize: 16, marginLeft: 3 }]}>{item?.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>

            </View>
            {!fromCoursesScreen &&  (
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={[Styles.linearBox, { width: '95%', marginTop: 2 }]}>
                  <CustomButton title={'Buy Now'} textcolor={newTheme.white} fontsize={18} fontFamily={newTheme.semiBold} action={() => payment(idCourse?.id)} />
                </LinearGradient>
              </View>
            )}
          </View>

          <Text style={[Styles.heading,{marginLeft:15}]}>Reviews</Text>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <CustomButton title={'Add Review'} wbox={'90%'} bdwidth={2} bdcolor={'#C8C8C8'} boxwidth={'90%'} action={() => review(idCourse?.id)} margin={8} />
          </View>
          {reviews.length > 0 ? (
            <FlatList
              data={reviews}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <View style={{ padding: 10, borderRadius:10,borderWidth:2,borderColor:newTheme.white,elevation:4,width:'90%',marginBottom:8 ,backgroundColor:newTheme.white,shadowColor:newTheme.color1}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{ width: '20%', height: 100 }}>
                        <Image source={require('../images/profile.png')} resizeMode='contain' style={{margin:3,width:'100%',flex:1,height:150}} />
                      </View>
                      <View style={{justifyContent:'center',marginLeft:8}}> 
                        <Text style={Styles.subHeading}>{item?.user?.name}</Text>
                        <Text style={Styles.title}>{item?.user?.email}</Text>
                      </View>
                    </View>
                    <Text style={Styles.subTitle}>{item?.review}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <AntDesign name={'star'} size={16} color={'#E49907'} />
                      <Text style={Styles.subHeading}> {item?.rating}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={Styles.subHeading}>No reviews available for this course.</Text>
          )}
        </View>
      

      <ReactNativeModal
        animationType="slide"
        transparent={true}
        isVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={{ position: 'relative', right: 180, bottom: 30 }}>
            <CustomButton iconFamily={'AntDesign'} name={'close'} iconColor={newTheme.black} action={() => setModalVisible(false)} />
          </View>
          <Text style={[Styles.subTitle, { textAlign: 'center', marginBottom: 15 }]}>Please buy the course before leaving a review.</Text>
          <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={[Styles.linearBox, { width: '95%', marginTop: 2 }]}>
            <CustomButton title={'Buy Now'} textcolor={newTheme.white} fontsize={18} fontFamily={newTheme.semiBold} action={() => payment(idCourse?.id)} />
          </LinearGradient>
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        animationType="slide"
        transparent={true}
        isVisible={model}
        onRequestClose={() => setModel(false)}
      >
        <View style={styles.modalView}>
          <View style={{ position: 'relative', right: 180, bottom: 30 }}>
            <CustomButton iconFamily={'AntDesign'} name={'close'} iconColor={newTheme.black} action={() => setModel(false)} />
          </View>
          <Text style={[Styles.subTitle, { textAlign: 'center', marginBottom: 15 }]}>Please buy the course before  watching any lesson.</Text>
          <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={[Styles.linearBox, { width: '95%', marginTop: 2 }]}>
            <CustomButton title={'Buy Now'} textcolor={newTheme.white} fontsize={18} fontFamily={newTheme.semiBold} action={() => payment(idCourse?.id)} />
          </LinearGradient>
        </View>
      </ReactNativeModal>
      </View>
   )}
    </ScrollView>
  
   
  );
};

const styles = StyleSheet.create({
  
  modalView: {
    width: '100%', 
    maxHeight: '50%', 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', 
    justifyContent: 'center'
  },

});

export default CourseDetails;

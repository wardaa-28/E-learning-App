import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';
import IntroSlider from '../screens/IntroSlider';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomNavigation from './BottomNavigation'; 
import FeaturedCourses from '../screens/FeaturedCourses';
import CourseDetails from '../screens/CourseDetails';
import MentorProfile from '../screens/MentorProfile';
import MentorAbout from '../screens/MentorAbout';
import Checkout from '../screens/Checkout';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import Explore from '../screens/Explore';
import MentorCourses from '../screens/MentorCourses';
import MentorReviews from '../screens/MentorReviews';
import PlayCourseVideo from '../screens/PlayCourseVideo';
import AddReview from '../screens/AddReview';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [splash, setSplash] = useState(true);

  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log("🚀 ~ checkLoginStatus ~ userToken:", userToken)
    setIsLoggedIn(!!userToken);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
   setTimeout(() => {
      setSplash(false);
    }, 1000);

  }, []);

  return (
    
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
        {splash ? (
          <Stack.Screen name='Splash' component={Splash} />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen name="BottomeNavigation" component={BottomNavigation} />
            <Stack.Screen name='FeaturedCourses' component={FeaturedCourses} />
            <Stack.Screen name='CourseDetails' component={CourseDetails} />
            <Stack.Screen name='MentorProfile' component={MentorProfile} />
            <Stack.Screen name='MentorAbout' component={MentorAbout} />
            <Stack.Screen name='Checkout' component={Checkout} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
            <Stack.Screen name='Explore' component={Explore} />
            <Stack.Screen name='Courses' component={MentorCourses} />
            <Stack.Screen name='Reviews' component={MentorReviews} />
            <Stack.Screen name='VideoCourse' component={PlayCourseVideo} />
            <Stack.Screen name='AddReview' component={AddReview} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name='IntroSlider' component={IntroSlider}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="BottomeNavigation" component={BottomNavigation} />
            <Stack.Screen name='FeaturedCourses' component={FeaturedCourses} />
            <Stack.Screen name='CourseDetails' component={CourseDetails} />
            <Stack.Screen name='MentorProfile' component={MentorProfile} />
            <Stack.Screen name='MentorAbout' component={MentorAbout} />
            <Stack.Screen name='Checkout' component={Checkout} />
            <Stack.Screen name='EditProfile' component={EditProfile} />
            <Stack.Screen name='ChangePassword' component={ChangePassword} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
            <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
            <Stack.Screen name='Explore' component={Explore} />
            <Stack.Screen name='Courses' component={MentorCourses} />
            <Stack.Screen name='Reviews' component={MentorReviews} />
            <Stack.Screen name='VideoCourse' component={PlayCourseVideo} />
            <Stack.Screen name='AddReview' component={AddReview} />
          </>
        )}
      </Stack.Navigator>
   
  );
};

export default StackNavigation;

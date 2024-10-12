import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MentorAbout from '../screens/MentorAbout'
import MentorCourses from '../screens/MentorCourses'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import newTheme from '../utils/Constants'
import MentorReviews from '../screens/MentorReviews'


const Tab = createMaterialTopTabNavigator()
const MaterialTopBarNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 16, fontFamily:newTheme.regular },
      tabBarStyle: { backgroundColor: 'white',borderRadius:10,margin:10 },
      tabBarIndicatorStyle: { backgroundColor: newTheme.primary, height: '100%', borderRadius: 10 },
      tabBarIndicatorContainerStyle: {height: 50, borderRadius: 10, overflow: 'hidden'},
      tabBarItemStyle: {height: 50, borderRadius: 10,},
      tabBarActiveTintColor:newTheme.white,
      tabBarInactiveTintColor:newTheme.black,
    }}>
        <Tab.Screen name='About' component={MentorAbout}/>
        <Tab.Screen name='Courses' component={MentorCourses}/>
        <Tab.Screen name='Reviews' component={MentorReviews}/>
    </Tab.Navigator>
  )
}

export default MaterialTopBarNavigation

const styles = StyleSheet.create({})
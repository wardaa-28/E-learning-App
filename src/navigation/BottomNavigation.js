import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import Saved from '../screens/Saved'
import Courses from '../screens/Courses'
import Profile from '../screens/Profile'
import Feather from 'react-native-vector-icons/Feather'
import newTheme from '../utils/Constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Bottom=createBottomTabNavigator()
const BottomNavigation = () => {
  return (
    <Bottom.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:newTheme.primary,tabBarHideOnKeyboard:true,tabBarLabelStyle:{fontFamily:newTheme.regular,fontSize:14},tabBarActiveBackgroundColor:newTheme.white,tabBarInactiveBackgroundColor:newTheme.white}}>
        <Bottom.Screen name='Home' component={HomeScreen} options={{tabBarIcon:({focused})=>{
            return(
            <Feather name={'home'} size={25} color={ focused? newTheme.primary:'grey'}/>
            )
        }}}/>
        <Bottom.Screen name='Saved' component={Saved} options={{tabBarIcon:({focused})=>{
            return(
            <FontAwesome name={'bookmark-o'} size={25} color={ focused? newTheme.primary:'grey'}/>
            )
        }}}/>
        <Bottom.Screen  name='Courses' component={Courses} options={{tabBarIcon:({focused})=>{
            return(
            <Feather name={'clipboard'} size={25} color={ focused? newTheme.primary:'grey'}/>
            )
        }}}/>
        <Bottom.Screen name='Profile' component={Profile} options={{tabBarIcon:({focused})=>{
            return(
            <Ionicons name={'person-outline'} size={25} color={ focused? newTheme.primary:'grey'}/>
            )
        }}}/>
    </Bottom.Navigator>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({})
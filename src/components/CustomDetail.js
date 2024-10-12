import { StyleSheet, Text, TouchableOpacity, View,FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Styles from '../utils/Styles'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import newTheme from '../utils/Constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import Webhandler from '../data/remote/Webhandler'
const CustomDetail = () => {
    const navigation=useNavigation()
    const [course ,setCourse]=useState([])
    const route = useRoute();
    const { id } = route.params;
    console.log("🚀 ~ CustomDetail ~ id:", id)
    useEffect(() => {
        getCourseDetails();
    }, []);

    const getCourseDetails = async () => {
        const data = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/get/${id}`, null, 'GET');
        console.log("🚀 ~ getCourseDetails ~ data:", JSON.stringify(data));
        setCourse(data);
    };
        console.log("🚀 ~ getCourseDetails ~  setCourse:",  setCourse)
    console.log(course)

    const handleVideoPress = () => {
        if (fromScreen === 'Courses') {
             {  navigation.navigate('VideoCourse', { video })}
        } else {
          Alert.alert('Notice', 'You cannot play the course video without getting enrolled');
        }
      };
    
  return (
    <View>
    <FlatList
        data={course}
        renderItem={({ item }) => {
            return (
                <View >
                    <TouchableOpacity style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 3, borderRadius: 10 }} onPress={handleVideoPress}>
                        <View style={{ flexDirection: 'row',padding:8 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: newTheme.primary, padding: 10, borderRadius: 10, marginRight: 5 }}>
                                <SimpleLineIcons name={'control-play'} color={newTheme.white} size={20} />
                            </View>
                            <View>
                                <Text style={{ fontsize: 18, fontFamily: newTheme.semiBold, color: newTheme.black }}>{item?.data?.lessons?.title}</Text>
                                <Text style={{ fontsize: 16, fontFamily: newTheme.regular, color: newTheme.black }}>{item?.data?.lessons?.duration}</Text>
                            </View>
                        </View>
                        <View style={Styles.justify}>
                            <AntDesign name='right' size={20} color={newTheme.black} />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }}
    />
</View>
  )
}

export default CustomDetail

const styles = StyleSheet.create({})
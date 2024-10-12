import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import newTheme from '../utils/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
const CustomHeader = (props) => {
    const navigation =useNavigation()
  return (
    <View>
      <View style={{padding:10,flexDirection:'row',backgroundColor:props.backgroundColor }}>
        {props.showBack?
            <TouchableOpacity style={{justifyContent:'flex-start'}} onPress={()=>{navigation.goBack()}}>
            <AntDesign name='left' size={25} color={props.iconColor?props.iconColor:newTheme.black}/>
            </TouchableOpacity>
            : null}
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text style={{fontSize:22,fontFamily:newTheme.semiBold,color:props.color ?props.color:newTheme.black}}>{props.title}</Text>
            </View>
        </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({})
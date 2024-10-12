import {StyleSheet, Text, TextInput, View,TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import newTheme from '../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
const IconLibrary = {
  AntDesign,
  Entypo,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
  Ionicons
};
const CustomInputs = props => {
  const Icon = IconLibrary[props.iconFamily]
    const [focused,setFocused] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const toggleSecureTextEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

  return (
    <View
      style={{
        justifyContent: props.content ,
        backgroundColor: props.backgroundcolor ? backgroundcolor:newTheme.white,
        width: props.widthbox ? props.widthbox: '95%',
        borderRadius: props.radius ? props.radius:10,
        flexDirection: props.direction ? props.direction:'row',
        borderWidth: props.bdwidth ?props.bdwidth:2,
        borderColor: focused?newTheme.primary:newTheme.white,
        margin: 5,
        alignItems: props.align ? props.align:'center',
        elevation:props.elevation? props.elevation : 5,
        marginTop:8,
        marginRight:props.marginRight? props.marginRight:null,
        shadowColor:props.shadowColor
      }}>
      {Icon && props.name && (
        <Icon
        style={{margin:3}} name={props.name} 
        size={props.size ? props.size:25} 
        color={props.iconColor ? props.iconColor:newTheme.black} />
      )}
      
      {props.placeholder && (
        <TextInput
          style={{
            width: props.wbox ? props.wbox:'90%',
            fontFamily:newTheme.regular ,
            backgroundColor: props.bgColor ? props.bgColor:newTheme.white,
            fontSize:14,
            color: newTheme.black,
            borderRadius:10
          }}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType? props.keyboardType:'default'}
          secureTextEntry={props.showPassword?secureTextEntry: false}
          placeholderTextColor={props.textcolor? props.textcolor:newTheme.black}
          onChangeText={props.onChange}
          onFocus={()=>setFocused(true)}
          onBlur={()=>setFocused(false)}
          value={props.val}
        />
      )}
      {props.showPassword&&
        <TouchableOpacity  onPress={toggleSecureTextEntry}>
          <Entypo
            name={secureTextEntry?"eye-with-line" :'eye'}
            size={props.sizeIcon  ? props.sizeIcon : 20}
            color={props.colorIcon ? props.colorIcon : newTheme.primary}
          />
        </TouchableOpacity>
      }
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({});

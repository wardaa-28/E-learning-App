import {StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import newTheme from '../utils/Constants';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BallIndicator } from 'react-native-indicators'
const IconLibrary = {
  AntDesign,
  Entypo,
  Ionicons,
  EvilIcons,
  FontAwesome5,
  MaterialIcons,
  Feather,
  FontAwesome
};

const CustomButton = props => {
  const Icon = IconLibrary[props.iconFamily];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: props.boxwidth ? props.boxwidth : '90%',
        justifyContent: props.justifyContent ? props.justifyContent : 'center',
        backgroundColor: props.backgroundcolor ? props.backgroundcolor : null,
        borderRadius: props.radius ? props.radius : 10,
        flexDirection: props.direction ? props.direction : 'row',
        margin: props.margin,
        alignItems: props.align ? props.align : 'center',
        marginTop: props.margin ? props.margin : 8,
        marginRight: props.marginRight ? props.marginRight : null,
        borderWidth: props.bdwidth ? props.bdwidth : null,
        borderColor: props.bdcolor ? props.bdcolor : null,
        padding: props.padding ? props.padding : 10,
        borderTopLeftRadius: props.topLeftRadius,
        borderBottomLeftRadius: props.bottomLeftRadius,
        borderTopRightRadius: props.topRightRadius,
        borderBottomRightRadius: props.bottomRightRadius,
        marginBottom:props.marginBottom
      }}
      onPress={props.loading ? null : props.action} 
    >
      {props.loading ? (
        <BallIndicator size={30} color={newTheme.white} />
      ) : (
        <>
          {Icon && props.name && (
            <Icon name={props.name} size={25} color={props.iconColor?props.iconColor:newTheme.black} />
          )}
          {props.image && (
            <Image source={props.image} style={{width: 30, height: 30}} />
          )}
          {props.title && (
            <Text
              style={{
                color: props.textcolor ? props.textcolor : newTheme.black,
                fontSize: props.fontsize ? props.fontsize : 20,
                margin: props.textMargin,
                fontFamily: props.fontFamily ? props.fontFamily : newTheme.regular,
                width: props.width ? props.width : null,
                marginLeft: props.marginLeft,
                width:props.textWidth
              }}>
              {props.title}
            </Text>
          )}
        </>
      )}
      {props.showDetails && !props.loading && (
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
          <AntDesign
            name={'right'}
            size={props.sizeIcon ? props.sizeIcon : 25}
            color={props.colorIcon ? props.colorIcon : newTheme.black}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Styles from '../utils/Styles'
import newTheme from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from './CustomButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native'
const CustomCard = () => {
  
  const route1 = useRoute();
  const { price,title,image,rating,reviews,category} = route1.params;
  return (
    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:newTheme.white}}> 

    <View style={{ padding: 10, marginTop: 15 ,borderRadius:10,borderColor:newTheme.white,borderWidth:2,backgroundColor:newTheme.white,elevation:2,width:'95%'}}>
      <View style={Styles.row} activeOpacity={0.6}>
        <View style={styles.imageBox}>
          <Image source={image} resizeMode='cover' style={styles.image} />
        </View>
        <View>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={[styles.linear1, { padding: 4.5, width: '90%' }]}>
            <CustomButton title={category} textcolor={newTheme.white} fontsize={16} padding={0.1} />
          </LinearGradient>
          <View style={{ width: '90%' }}>
            <Text style={[Styles.textBox, { fontSize: 16, margin: 3 }]}>{title}</Text>
          </View>
          <View style={Styles.row}>
            <View style={Styles.row}>
              <AntDesign name={'star'} size={20} color={'#E49907'} />
              <Text style={Styles.subHeading}>{rating}</Text>
              <Text style={Styles.subHeading}> ({reviews})</Text>
              <Text style={[Styles.subHeading, { marginLeft: 20 }]}>$ {price}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    </View>
  )
}

export default CustomCard

const styles = StyleSheet.create({
  imageBox: { width: '40%', justifyContent: 'center', alignItems: 'center' },
  image: { borderRadius: 10, width: '90%', height: 130 },
  linear1: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 10, width: '90%' },
})
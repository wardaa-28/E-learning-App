import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import newTheme from '../utils/Constants'
import LinearGradient from 'react-native-linear-gradient'
import Styles from '../utils/Styles'
import Webhandler from '../data/remote/Webhandler'
import Url from '../data/remote/Url'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Explore = () => {
  const [category, setCategory] = useState([])
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const data = await Webhandler(Url.CATEGORY, null, 'GET');
    console.log("🚀 ~ getCategory ~ data:", data);
    setCategory(data);
  };

  return (
    <View style={Styles.main}>
      <CustomHeader showBack={true} title={'Category'} />
      <ScrollView>
        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <MaterialIcons name="insert-drive-file" size={25} color={newTheme.white} />

          </LinearGradient>
          <Text style={styles.categoryText}>{category[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <Entypo name="palette" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[1]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <FontAwesome name="pie-chart" size={35} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[2]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <MaterialIcons name="code" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[3]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <FontAwesome name="paint-brush" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[4]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <AntDesign name="banckward" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[5]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <FontAwesome5 name="fingerprint" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[6]}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default Explore

const styles = StyleSheet.create({
  touchable: { borderRadius: 10, backgroundColor: newTheme.white, elevation: 2, padding: 5, width: '100%', alignItems: 'center', borderWidth: 2, margin: 2, flexDirection: 'row', borderColor: newTheme.white, height: 100 },
  iconContainer: { width: '20%', height: 80, borderRadius: 10, justifyContent: 'center', alignItems: 'center', },
  categoryText: { fontSize: 16, color: newTheme.black, fontFamily: newTheme.regular, paddingTop: 5, textAlign: 'center', marginLeft: 4 },



})
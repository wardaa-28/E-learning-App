import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import newTheme from '../utils/Constants';
import Url from '../data/remote/Url';
import Webhandler from '../data/remote/Webhandler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {BallIndicator} from 'react-native-indicators'
const MyCategory = () => {
  const [category, setCategory] = useState([]);
const [loading ,setLoading]=useState(true)
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const data = await Webhandler(Url.CATEGORY, null, 'GET');
    console.log("🚀 ~ getCategory ~ data:", data);
    setCategory(data);
    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <FontAwesome5 name="fingerprint" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[6]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <Entypo name="palette" size={25} color={newTheme.white} />
            </LinearGradient>
          <Text style={styles.categoryText}>{category[1]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
              <AntDesign name="banckward" size ={25} color ={newTheme.white}/>
          </LinearGradient>
          <Text style={styles.categoryText}>{category[5]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchable}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.iconContainer}>
            <FontAwesome name="paint-brush" size={25} color={newTheme.white} />
          </LinearGradient>
          <Text style={styles.categoryText}>{category[4]}</Text>
        </TouchableOpacity>
      </View>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15},
  row: {flexDirection: 'row', marginBottom: 10},
  touchable: { borderRadius: 10, backgroundColor: newTheme.white, elevation: 4,padding:5, width: '49%', alignItems: 'center', borderWidth:2,margin:2,flexDirection:'row', borderColor:newTheme.white,shadowColor:newTheme.color1,height:80 },
  iconContainer: { width: '28%',height: 50, borderRadius: 10, justifyContent: 'center',alignItems: 'center',},
  categoryText: {   fontSize: 16, color: newTheme.black,fontFamily: newTheme.regular, marginLeft:4,width:'60%'},
});

export default MyCategory;

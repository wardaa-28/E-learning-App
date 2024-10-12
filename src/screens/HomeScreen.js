import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import newTheme from '../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import FeaturedCourses from './FeaturedCourses';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomFeatured from '../components/CustomFeatured';
import Styles from '../utils/Styles';
import MyCategory from '../components/MyCategory';
import { BallIndicator } from 'react-native-indicators';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchData = async () => {
     
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <BallIndicator size={30} color={newTheme.grey} />
        </View>
      ) : (
        <View style={[Styles.main, { padding: 0 }]}>
          <LinearGradient
            colors={[newTheme.color1, newTheme.color2]}
            style={styles.gradientBox}
          >
            <View style={styles.coloum}>
              <Text style={styles.welcome}>Welcome back!</Text>
              <Text style={styles.learning}>Let's start learning</Text>
            </View>
          </LinearGradient>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.flexBox, { paddingLeft: 9, marginTop: 8 }]}>
              <Text style={Styles.textBox}>Explore Category</Text>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => { navigation.navigate("Explore"); }}
                style={Styles.justify}
              >
                <Text style={styles.viewBox}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
              <MyCategory />
            </ScrollView>
            <View style={[styles.flexBox, { paddingLeft: 9 }]}>
              <Text style={Styles.textBox}>Featured Courses</Text>
              <TouchableOpacity
                onPress={() => { navigation.navigate(FeaturedCourses); }}
                activeOpacity={0.6}
                style={Styles.justify}
              >
                <Text style={styles.viewBox}>View All</Text>
              </TouchableOpacity>
            </View>
            <CustomFeatured />
          </KeyboardAwareScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: { color: newTheme.white, fontSize: 18, fontFamily: newTheme.regular },
  learning: { color: newTheme.white, fontSize: 24, fontFamily: newTheme.semiBold },
  viewBox: { color: newTheme.primary, fontSize: 16, fontFamily: newTheme.regular, marginRight: 4, justifyContent: 'center', alignItems: 'center' },
  flexBox: { flexDirection: 'row', justifyContent: 'space-between' },
  coloum: { flexDirection: 'column', justifyContent: 'center' },
  button: { flexDirection: 'row', margin: 8, borderRadius: 10, padding: 8 },
  gradientBox: { height: 180, paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  iconBox: { position: 'relative', bottom: 25, justifyContent: 'center', alignItems: 'center' },
});

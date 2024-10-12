import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import newTheme from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../utils/Styles';

const IntroSlider = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);


  const slides = [
    {
      image: require('../images/image1.png'),
      title:'Grow your creative  skills with us!',
      subtitle: 'It is a long established fact that a reader will be distracted by the readable content.'
    },
    {
      image: require('../images/image2.png'),
      title:'Explore your new skill  today!',
      subtitle: 'It is a long established fact that a reader will be distracted by the readable content.'
    },
    {
      image: require('../images/image3.png'),
      title: 'Discover the best  online course!',
      subtitle: 'It is a long established fact that a reader will be distracted by the readable content.'
    }
  ];

  const onSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const { width, height } = Dimensions.get('window');

  return (
    <View style={[Styles.main,{padding:0}]}>
      <AppIntroSlider
      pagingEnabled={true}
        data={slides}
        dotStyle={styles.inactiveDot}
        activeDotStyle={styles.dotStyle}
        showSkipButton={true}
        showPrevButton={currentIndex !== slides.length - 1}
        onDone={() => navigation.navigate('LoginScreen')}
        renderPrevButton={() => (
        <LinearGradient colors={[newTheme.color1,newTheme.color2]} style={styles.buttonBox}>
          <Text style={styles.nextButton}>Prev</Text>
        </LinearGradient>
        )}
        renderNextButton={() => (
        <LinearGradient colors={[newTheme.color1,newTheme.color2]} style={styles.buttonBox}>
        <Text style={styles.nextButton}>Next</Text>
      </LinearGradient>
      )}
        renderDoneButton={() => (
          <LinearGradient colors={[newTheme.color1,newTheme.color2]}  style={styles.startedButton}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} >
            <Text style={styles.nextButton}>Get Started</Text>
          </TouchableOpacity>
          </LinearGradient>
        )}
        renderSkipButton={() => (
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} >
            <Text style={{ color: '#C4C4C4', fontSize: 16, fontFamily: newTheme.semiBold, position: 'relative', left: height * 0.37, bottom: height * 0.86 }}>Skip</Text>
          </TouchableOpacity>
        )}
        onSlideChange={onSlideChange}
        renderItem={({ item }) => {
          return (
            <View style={styles.mainBox}>
              <Image style={styles.imgBox} source={item.image} resizeMode='contain'/>
              <Text style={Styles.heading}>{item.title}</Text>
              <Text style={[Styles.subHeading,{textAlign:'center'}]}>{item.subtitle}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  nextButton: { color: newTheme.white, fontSize: 18, fontFamily: newTheme.semiBold },
  dotStyle: { width: 50, height:5, backgroundColor: newTheme.primary },
  inactiveDot:{width:10,height:5,backgroundColor:newTheme.grey},
  imgBox: { width: '100%', height: 300, marginBottom: 20 },
  mainBox: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  stepIndicator: { position: 'absolute', top: 40, left: 20, fontSize: 16, fontFamily: newTheme.bold, color: newTheme.grey, zIndex: 1 },
  buttonBox:{borderWidth:2,paddingVertical:10,paddingHorizontal:25,borderRadius:10,borderColor:newTheme.white,backgroundColor:newTheme.primary,width:'100%'},
  startedButton:{borderWidth:2,padding:10,borderRadius:10,borderColor:newTheme.white,backgroundColor:newTheme.primary,width:'100%'}
});

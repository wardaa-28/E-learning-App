import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import newTheme from '../utils/Constants'

const Splash = () => {
  return (
    <View style={styles.main}>
      <Image source={require('../images/elearn.png')} resizeMode='contain' style={styles.image}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  main:{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:newTheme.white},
  image:{width:'100%',height:200}
})
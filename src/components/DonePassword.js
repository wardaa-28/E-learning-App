import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
import newTheme from '../utils/Constants'
import CustomButton from './CustomButton'

const DonePassword = (props) => {
  return (
    <View
            style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <LottieView
              style={{ width: '100%', height: 150 }}
              source={require('../assets/animations/done.json')}
              autoPlay
            />
            <Text style={[styles.textBox, { textAlign: 'center' }]}>
              Payment Received Successfully{' '}
            </Text>
            <Text style={styles.ratingBox}>Congratulations !!</Text>
            <Text style={styles.ratingBox}>Enjoy your classes </Text>
            <LinearGradient
                       colors={[newTheme.color1, newTheme.color2]}
              style={{
                borderRadius: 10,
                marginTop: 8,
                padding: 10,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomButton
                title={'Back to Login'}
                textcolor={newTheme.white}
                fontFamily={newTheme.semiBold}
                padding={0.5}
                action={props.actionButton}
              />
            </LinearGradient>
          </View>
  )
}

export default DonePassword

const styles = StyleSheet.create({
    textBox: { color: newTheme.black, fontSize: 24, fontFamily: newTheme.semiBold },
  ratingBox: {
    color: newTheme.black,
    fontFamily: newTheme.regular,
    fontSize: 16,
  },
})
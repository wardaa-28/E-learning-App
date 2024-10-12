import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Styles from '../utils/Styles'
import CustomButton from './CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import newTheme from '../utils/Constants'

const PaymentDone = (props) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <LottieView style={{ width: '90%', height: 140 }} source={require('../assets/animations/done.json')} autoPlay />
      <Text style={Styles.heading}>Payment Received Successfully </Text>
      <Text style={Styles.subHeading}>Congratulations !!</Text>
      <Text style={Styles.subHeading}>Enjoy your classes </Text>
      <LinearGradient
        colors={[newTheme.color1, newTheme.color2]}
        style={{ borderRadius: 10, marginTop: 8, padding: 10, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
        <CustomButton title={'Back to Home'} textcolor={newTheme.white} fontFamily={newTheme.semiBold} wbox={'90%'} padding={0.5} action={props.actionButton} />
      </LinearGradient>

    </View>
  )
}

export default PaymentDone

const styles = StyleSheet.create({})
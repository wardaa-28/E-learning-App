import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Styles from '../utils/Styles'
import LinearGradient from 'react-native-linear-gradient'
import newTheme from '../utils/Constants'
import CustomButton from './CustomButton'
import { useRoute } from '@react-navigation/native'

const Payment = (props) => {
  const price  = props.price;
  const Discount=2.00
  const total=price -Discount
  return (
    <View>
    <View style={{ padding: 10, justifyContent: 'center' }}>
      <Text style={Styles.textBox}>Payment Method</Text>
      <View style={Styles.box}>
        <Text style={Styles.subHeading}> Item Total</Text>
        <Text style={Styles.subHeading}>$ {price}</Text>
      </View>
      <View style={Styles.box}>
        <Text style={Styles.subHeading}> Discount</Text>
        <Text style={Styles.subHeading}>$ {Discount}</Text>
      </View>
      <View style={styles.alignBox}>
        <View style={styles.lineBox} />
      </View>
      <View style={[Styles.box, { padding: 10 }]}>
        <Text style={Styles.textBox}>Grand Price</Text>
        <Text style={Styles.subHeading}>$ {total}</Text>
      </View>
      </View>
      <View style={Styles.justify}>
        <LinearGradient
          colors={[newTheme.color1, newTheme.color2]}
          style={styles.linear1}>
          <CustomButton title={'Pay Now'} textcolor={newTheme.white} fontsize={20} wbox={'100%'} padding={0.5} action={props.actionButton} />
        </LinearGradient>
      </View>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  lineBox: { height: 1, width: '90%', backgroundColor: '#C8C8C8', marginTop: 15 },
  alignBox: { justifyContent: 'center', alignItems: 'center' },
  linear1: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 10, width: '90%' },
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import LinearGradient from 'react-native-linear-gradient'
import newTheme from '../utils/Constants'
import { BottomSheetGestureHandlersContext } from '@gorhom/bottom-sheet/lib/typescript/contexts'
import Styles from '../utils/Styles'
import CustomInputs from './CustomInputs'

const EmailOtp = (props) => {
  const [isClicked, setIsClicked] = useState(false);
const [email,setEmail]=useState('')
  const handleClick = () => {
    setIsClicked(true);
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, padding: 10 }}>
    <Text style={styles.textBox}>Forget Password </Text>
    <Text style={[Styles.subTitle, { textAlign: 'center' }]}>Enter email address which should we use to reset your password </Text>
    <CustomInputs placeholder={'Enter Email Address'} onChange={(val) => setEmail(val)} val={email} />

    {/* <CustomButton iconFamily={'Ionicons'} name={'mail-outline'} title={'  Send OTP via Email'}   bdwidth={2} bdcolor={isClicked ? newTheme.color2 : '#C8C8C8'} fontsize={16} action={handleClick}/> */}
    <LinearGradient
      colors={[newTheme.color1, newTheme.color2]}
      style={[Styles.linearBox,{padding:10,width:'60%',marginTop:15}]}>
      <CustomButton title={'Send Code'} textcolor={newTheme.white} fontsize={20} wbox={'90%'} padding={0.5}
        action={props.actionButton} />
    </LinearGradient>

  </View>
  )
}

export default EmailOtp

const styles = StyleSheet.create({
    textBox: { color: newTheme.black, fontSize: 24, fontFamily: newTheme.semiBold },
})
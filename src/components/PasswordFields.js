import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomInputs from './CustomInputs';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from './CustomButton';
import newTheme from '../utils/Constants';

const PasswordFields = (props) => {
  return (
    <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
      padding: 10,
    }}>
    <Text style={styles.textBox}>Enter New Password </Text>
    <Text style={[styles.ratingBox, { textAlign: 'center' }]}>
      Please enter your new password{' '}
    </Text>
    <CustomInputs
      placeholder={'Password'}
      showPassword={true}
      wbox={'90%'}
    />
    <CustomInputs
      placeholder={'Re-enter Password'}
      showPassword={true}
      wbox={'90%'}
    />

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
        title={'Change Password'}
        textcolor={newTheme.white}
        fontsize={20}
        wbox={'90%'}
        padding={0.5}
        action={props.actionButton}
      />
    </LinearGradient>
  </View>
  )
}

export default PasswordFields

const styles = StyleSheet.create({
    textBox: { color: newTheme.black, fontSize: 24, fontFamily: newTheme.semiBold },
  ratingBox: {
    color: newTheme.black,
    fontFamily: newTheme.regular,
    fontSize: 16,
  }
})
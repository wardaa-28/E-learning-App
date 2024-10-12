import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { CodeField } from 'react-native-confirmation-code-field';
import newTheme from '../utils/Constants';
import Styles from '../utils/Styles';

const OtpFields = (props) => {
    const [code, setCode] = useState('');
  return (
    <View style={styles.container}>
            <Text style={Styles.heading}>Enter Verification Code</Text>
            <Text style={[Styles.subTitle,{textAlign:'center'}]}>
              We have sent the verification code to (209) 555-0104
            </Text>
            <View style={styles.otpContainer}>
              <CodeField
                value={code}
                onChangeText={setCode}
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="numeric"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? '|' : null)}
                  </Text>
                )}
              />
            </View>
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
                title={'Submit'}
                textcolor={newTheme.white}
                fontFamily={newTheme.semiBold}
                wbox={'90%'}
                padding={0.5}
                action={props.actionButton}
              />
            </LinearGradient>
            <Text style={[Styles.subTitle,{marginTop:5}]}>Resend code</Text>
            
          </View>
  )
}

export default OtpFields

const styles = StyleSheet.create({

      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      input: {
        color: newTheme.black,
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginRight: 10,
      },
      filledInput: {
        borderColor: newTheme.primary,
      },
      submitButton: {
        width: '80%',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
      },
      submitText: {
        color: '#fff',
        fontSize: 16,
      },
      codeFieldRoot: {
        marginTop: 20,
        width: 280,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: 'black',
      },
      cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: newTheme.grey,
        borderRadius: 10,
        textAlign: 'center',
        marginHorizontal: 4,
        color:newTheme.black,
      },
      focusCell: {
        borderColor: newTheme.primary,
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    
})
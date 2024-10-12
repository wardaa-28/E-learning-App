import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomInputs from '../components/CustomInputs';
import newTheme from '../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Styles from '../utils/Styles';
import Webhandler from '../data/remote/Webhandler';
import Snackbar from 'react-native-snackbar';
import Url from '../data/remote/Url';

const ChangePassword = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      Snackbar.show({
        text: 'New Password and Confirm Password do not match.',
        duration: Snackbar.LENGTH_LONG,
         backgroundColor: 'red'
      });
      return;
    }

    if (newPassword.length < 8) {
      Snackbar.show({
        text: 'Password must be at least 8 characters long.',
        duration: Snackbar.LENGTH_LONG,
         backgroundColor: 'red'
      });
      return;
    }

    const userData = {
      oldPassword,
      newPassword,
      confirmPassword
    };

    setLoading(true);

    try {
      const response = await Webhandler(Url.CHANGE_PASSWORD, userData, 'POST');
      console.log('Password changed successfully:', response);
      Snackbar.show({
        text: 'Password changed successfully.',
        duration: Snackbar.LENGTH_LONG,
         backgroundColor: 'green'
      });
      navigation.navigate('BottomeNavigation', { screen: 'Profile' });
    } catch (error) {
      console.error('Password change failed:', error);
      Snackbar.show({
        text: 'Password change failed. Please try again.',
        duration: Snackbar.LENGTH_LONG,
         backgroundColor: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.main}>
      <CustomHeader showBack={true} title={'Change Password'} />
      <CustomInputs
        placeholder={'Enter Old Password'}
        showPassword={true}
        wbox={'90%'}
        val={oldPassword}
        onChange={setOldPassword}
      />
      <CustomInputs
        placeholder={'New Password'}
        showPassword={true}
        wbox={'90%'}
        val={newPassword}
        onChange={setNewPassword}
      />
      <CustomInputs
        placeholder={'Confirm Password'}
        showPassword={true}
        wbox={'90%'}
        val={confirmPassword}
        onChange={setConfirmPassword}
      />
      <View style={styles.button}>
        <LinearGradient
          colors={[newTheme.color1, newTheme.color2]}
          style={Styles.linearBox}
        >
          <CustomButton
            title={'Save'}
            textcolor={newTheme.white}
            wbox={'100%'}
            action={changePassword}
          />
        </LinearGradient>
      </View>
      {loading && <ActivityIndicator size="large" color={newTheme.white} style={styles.loader} />}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  button: { justifyContent: 'flex-end', alignItems: 'center', flex: 1 },
  loader: { position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20 }
});

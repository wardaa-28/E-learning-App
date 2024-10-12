import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';

import CustomButton from '../components/CustomButton';
import CustomInputs from '../components/CustomInputs';
import CustomHeader from '../components/CustomHeader';
import newTheme from '../utils/Constants';
import Styles from '../utils/Styles';
import Webhandler from '../data/remote/Webhandler';
import Url from '../data/remote/Url';

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
 const [email,setEmail]=useState('')
 const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
  const edit = async () => {
    const userData = { name ,email};
try {
  const response = await Webhandler(Url.CHANGE_DETAILS, userData, 'PATCH');
  console.log('Response:', response);
  if (response.message){
  Snackbar.show({
    text: 'User details changed successfully!',
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'green'
  });
  navigation.navigate('BottomeNavigation', { screen: 'Profile' });
}else if(response.error){
    Snackbar.show({
      text: response.error,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: 'red'
    })
  }
} catch (error) {
  console.error('Change failed:', error.message || error);
  Snackbar.show({
    text: 'Change failed. Please try again.',
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'red'
  });
}

};

  return (
    <View style={Styles.main}>
      <CustomHeader showBack={true} title={'Edit Profile'} />
      <CustomInputs
        placeholder={'Name'}
        bordercolor={newTheme.primary}
        val={name}
        onChange={setName}
      />
      <CustomInputs
        placeholder={'Email Address'}
        bordercolor={newTheme.primary}
        val={email}
        onChange={setEmail}
      />
      <View style={styles.gradientView}>
        <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={Styles.linearBox}>
          <CustomButton
            title={'Update'}
            textcolor={newTheme.white}
            wbox={'100%'}
            action={edit}
          />
        </LinearGradient>
      </View>
      {/* {loading && <ActivityIndicator size="large" color={newTheme.white} style={styles.loader} />} */}

    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  gradientView: { justifyContent: 'flex-end', alignItems: 'center', flex: 1 },
  loader: { position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20 }

});

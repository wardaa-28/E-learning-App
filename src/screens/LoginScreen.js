import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import newTheme from '../utils/Constants';
import CustomButton from '../components/CustomButton';
import CustomInputs from '../components/CustomInputs';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import EmailOtp from '../components/EmailOtp';
import CustomRBSheet from '../components/CustomRBSheet';
import PasswordFields from '../components/PasswordFields';
import OtpFields from '../components/OtpFields';
import DonePassword from '../components/DonePassword';
import Styles from '../utils/Styles';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Url from '../data/remote/Url';
import Webhandler from '../data/remote/Webhandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import validator from 'validator'; // Import the validator package

const LoginScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const refRBSheet4 = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await AsyncStorage.getItem('userToken');
      if (user) {
        navigation.navigate('BottomeNavigation');
      }
    };

    checkUserLoggedIn();
  }, []);

  GoogleSignin.configure({
    webClientId: "829715613084-5kj0g5dhj3cp8cmq29nvr6brb7gidg3i.apps.googleusercontent.com"
  });

  async function onGoogleButtonPress() {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      await AsyncStorage.setItem('userToken', 'loggedIn');
      navigation.navigate('BottomeNavigation');
    
    } catch (error) {
      console.error(error);
    }
  }

  const userData = { email, password };

  const userLogin = async () => {
    setLoading(true);
  
    if (email === '' || password === '') {
      Snackbar.show({
        text: 'Enter both Email and Password',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      setLoading(false);
      return; 
    }
  
    if (!validator.isEmail(email)) {
      Snackbar.show({
        text: 'Please enter a valid email address',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      setLoading(false);
      return; 
    }
  
    if (password.length < 8) {
      Snackbar.show({
        text: 'Password length must be at least 8 characters',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      setLoading(false);
      return; 
    }
  else{
    try {
      const result = await Webhandler(Url.LOGIN, userData, 'POST');
      console.log("🚀 ~ userLogin ~ result:", result)
      
      if (result.message === 'User successfully logged in') { 
        await AsyncStorage.setItem('userToken', 'loggedIn');
        Snackbar.show({
          text: 'Successfully logged in',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'green'
        });
        navigation.navigate("BottomeNavigation")
      } else  {
        Snackbar.show({
          text: result.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red'
        });
      } 
  
    } catch (error) {
      console.error('Login failed:', error);
      Snackbar.show({
        text: 'Login failed. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
    }}
  
    setLoading(false);
  };

  // const forgetPassword=async()=>{
  //   const password= await Webhandler(Url.RSET_PASSWORD,null ,'POST')
  // }
  

  return (
    <View style={Styles.main} >
      <View style={Styles.justify}>
        <Image source={require('../images/elearn.png')} resizeMode="contain" style={styles.imageBox} />
      </View>
      <View style={Styles.justify}>
        <Text style={Styles.heading}>Let's get your Login</Text>
        <Text style={Styles.title}>Enter your information below</Text>
      </View>
      <View style={Styles.justify}>
        <CustomInputs placeholder={'Enter Email Address'} onChange={(val) => setEmail(val)} val={email} />
        <CustomInputs placeholder={'Enter Password'} showPassword={true} wbox={'90%'} onChange={(val) => setPassword(val)} val={password} />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <CustomButton title={'Forget Password'} textcolor={newTheme.primary} fontsize={16} wbox={'100%'} action={() => refRBSheet.current.open()} boxwidth={'40%'} />
      </View>
      <View style={Styles.justify}> 
        <LinearGradient colors={[newTheme.color1, newTheme.color2]} style={Styles.linearBox}>
          <CustomButton title={'Login'} loading={loading} textcolor={newTheme.white} action={userLogin} />
        </LinearGradient>
      </View>
      <View style={styles.containerr}>
        <View style={styles.line} />
        <Text style={Styles.subHeading}>Or login with</Text>
        <View style={styles.line} />
      </View>
      <View style={{ margin: 8 }}>
        <CustomButton image={require('../images/google.png')} title={'   Sign in with Google'} textcolor={newTheme.black} fontFamily={newTheme.medium} wbox={'90%'} bdwidth={1} bdcolor={'#C8C8C8'} fontsize={16} boxwidth={'100%'} action={onGoogleButtonPress} />
      </View>
      <View style={styles.button}>
        <Text style={Styles.subTitle}>Don't have an Account?</Text>
        <CustomButton title={'Register Now'} textcolor={newTheme.primary} fontsize={16} padding={0.4} boxwidth={'30%'} action={() => navigation.navigate('RegisterScreen')} />
      </View>

      <CustomRBSheet
        Sheet={refRBSheet}
        View={<EmailOtp actionButton={() => {
          refRBSheet.current?.close();
          refRBSheet3.current?.open();
        }} />}
      />
     
      <CustomRBSheet
        Sheet={refRBSheet3}
        View={<OtpFields actionButton={() => {
          refRBSheet3.current?.close();
          refRBSheet2.current?.open();
        }} />}
      />

<CustomRBSheet
        Sheet={refRBSheet2}
        View={<PasswordFields actionButton={() => {
          refRBSheet2.current?.close();
          refRBSheet4.current?.open();
        }} />}
      />
      <CustomRBSheet
        Sheet={refRBSheet4}
        View={<DonePassword actionButton={() => refRBSheet4.current.close()} />}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageBox: { width: 100, height: 120 },
  containerr: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  line: { flex: 1, height: 1, backgroundColor: '#C8C8C8', width: '10%' },
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginBottom: 10 },
});

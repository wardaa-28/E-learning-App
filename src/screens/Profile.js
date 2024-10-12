import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import newTheme from '../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Styles from '../utils/Styles';
import Webhandler from '../data/remote/Webhandler';
import Url from '../data/remote/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BallIndicator} from 'react-native-indicators'
const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null); 
  const [isLoading,setIsLoading] =useState(true)

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    setIsLoading(true)
    try {
      const result = await Webhandler(Url.USER_DETAILS, null, 'GET');
      console.log("🚀 ~ userDetails ~ result:", result);
      setUser(result);
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
    } 
  };
  const userSignOut = () => ({
    name: user?.name,
    email: user?.email,
  });
  

  const signOut = async () => {
    setLoading(false)
    try {
      const result = await Webhandler(Url.SIGN_OUT, userSignOut, 'POST');
    console.log("🚀 ~ signOut ~ result:", result);
    await AsyncStorage.removeItem('userToken'); 
    navigation.navigate('LoginScreen'); 
    setLoading(true)
    } catch (error) {
      console.error(error);
    }
  };

 

  

  return (
    <View style={[Styles.main, { padding: 0 }]}>
      <LinearGradient
        colors={[newTheme.color1, newTheme.color2]}
        style={styles.linear1}
      >
        <CustomHeader title={'My Profile'} color={newTheme.white} />
        <View style={styles.imgView}>
          {isLoading ? (
            <BallIndicator size={35} color={newTheme.white} />
          ) : (
            <>
              
              <View style={styles.textView}>
                <Text style={[Styles.heading, { color: newTheme.white ,textAlign:'center'}]}>{user?.name}</Text>
                <Text style={[Styles.subHeading, { color: newTheme.white }]}>{user?.email}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("EditProfile") }}>
                <AntDesign name={'edit'} size={25} color={newTheme.white} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>
      <View style={styles.flex}>
        <CustomButton iconFamily={'AntDesign'} name={'edit'} title={'Edit Profile'} wbox={'90%'} justifyContent='flex-start' margin={15} padding={0.4} showDetails={true} action={() => { navigation.navigate("EditProfile") }} marginLeft={8} />
        <CustomButton iconFamily={'Feather'} name={'lock'} title={'Change Password'} wbox={'90%'} justifyContent='flex-start' margin={15} padding={0.4} showDetails={true} action={() => { navigation.navigate("ChangePassword") }} marginLeft={8} />
        <CustomButton iconFamily={'MaterialIcons'} name={'privacy-tip'} title={'Privacy Policy'} wbox={'90%'} justifyContent='flex-start' margin={15} padding={0.4} showDetails={true} action={() => { navigation.navigate("PrivacyPolicy") }} marginLeft={8} />
        <CustomButton iconFamily={'Feather'} name={'clipboard'} title={'Terms and Conditions'} wbox={'90%'} justifyContent='flex-start' margin={15} padding={0.4} showDetails={true} action={() => { navigation.navigate("TermsAndConditions") }} marginLeft={8} />
      </View>
      <View style={Styles.justify}>
        <LinearGradient
          colors={[newTheme.color1, newTheme.color2]}
          style={styles.linear2}
        >
          <CustomButton action={signOut} title={'Logout'}  textcolor={newTheme.white} fontsize={20} wbox={'100%'} padding={0.5} />
        </LinearGradient>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  flex: { flex: 1 },
  linear1: { padding: 10, flex: 0.5, justifyContent: 'center', borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
  linear2: { borderRadius: 10, padding: 8, width: '90%', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  imageBox: { width: '20%', height: 100, borderRadius: 10 },
  textView: { justifyContent: 'center', marginRight: 10 },
  imgView: { flexDirection: 'row', justifyContent: 'center', padding: 10, alignItems: 'center' },
  button: { borderWidth: 2, padding: 8, borderRadius: 10, borderColor: newTheme.white, margin: 3 }
});

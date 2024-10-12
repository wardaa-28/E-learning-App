import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import newTheme from '../utils/Constants';
import CustomButton from '../components/CustomButton';
import CustomInputs from '../components/CustomInputs';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Styles from '../utils/Styles';
import Url from '../data/remote/Url';
import Webhandler from '../data/remote/Webhandler';
import Snackbar from 'react-native-snackbar';
import validator from 'validator';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const validateInputs = () => {
        if (!name || !email || !password) {
            Snackbar.show({
                text: 'All fields are required',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
            });
            return false;
        }

        if (!validator.isEmail(email)) {
            Snackbar.show({
                text: 'Please enter a valid email address',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
            });
            return false;
        }

        if (password.length < 8) {
            Snackbar.show({
                text: 'Password must be at least 8 characters',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
            });
            return false;
        }

        return true;
    };

    const registerUser = async () => {
        if (!validateInputs()) {
            return;
        }

        const userData = { name, email, password };

        try {
            const result = await Webhandler(Url.REGISTER, userData, 'POST');
            console.log('User registered successfully:', result);

            Snackbar.show({
                text: 'Registration successful!',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'green',
            });

            navigation.navigate('BottomeNavigation');
        } catch (error) {
            console.error('Registration failed:', error);
            Snackbar.show({
                text: error.message || 'Registration failed. Please try again.',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
            });
        }
    };

    return (
        <View style={Styles.main}>
            <View style={Styles.justify}>
                <Image source={require('../images/elearn.png')} resizeMode='contain' style={styles.imageBox} />
            </View>
            <View style={Styles.justify}>
                <Text style={Styles.heading}>Register Now!</Text>
                <Text style={Styles.title}>Enter your information below</Text>
            </View>
            <View style={Styles.justify}>
                <CustomInputs placeholder={'Name'} onChange={(val) => setName(val)} val={name} />
                <CustomInputs placeholder={'Email Address'} onChange={(val) => setEmail(val)} val={email} />
                <CustomInputs placeholder={'Password'} onChange={(val) => setPassword(val)} val={password} showPassword={true} />
            </View>
            <View style={Styles.justify}>
                <LinearGradient
                    colors={[newTheme.color1, newTheme.color2]}
                    style={Styles.linearBox}>
                    <CustomButton title={'Register'} textcolor={newTheme.white} wbox={'100%'} action={registerUser} />
                </LinearGradient>
            </View>
            <View style={styles.button}>
                <Text style={Styles.subTitle}>Already a member?</Text>
                <CustomButton title={'Login Now'} textcolor={newTheme.primary} fontsize={16} padding={0.4} margin={null} boxwidth={'25%'} action={() => navigation.navigate("LoginScreen")} />
            </View>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', flex: 1, marginBottom: 10 },
    imageBox: { width: '100%', height: 120 },
});

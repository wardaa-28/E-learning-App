import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomRBSheet from '../components/CustomRBSheet';
import PaymentDone from '../components/PaymentDone';
import Payment from '../components/Payment';
import CustomCard from '../components/CustomCard';
import Styles from '../utils/Styles';
import Webhandler from '../data/remote/Webhandler';
import CustomInputs from '../components/CustomInputs';
import LinearGradient from 'react-native-linear-gradient';
import newTheme from '../utils/Constants';
import CustomButton from '../components/CustomButton';
import Snackbar from 'react-native-snackbar';

const Checkout = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const route = useRoute();
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');

  const { id, price } = route.params;

  console.log("🚀 ~ Checkout ~  id:", id);

  const data = {
    cardNumber: cardNumber,
    cardName: name,
    ExData: date,
    CVV: cvv,
  };

  const buyCourses = async () => {
    try {
      const response = await Webhandler(
        `https://elearningportal-56538109f664.herokuapp.com/courses/bought-courses/${id}`,
        data,
        'POST'
      );
      console.log('🚀 ~ buyCourses ~ response:', JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  };

  const validateCardNumber = (cardNumber) => {
    return cardNumber.length === 11 && !isNaN(cardNumber);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month - 1); 

    return expiryDate > currentDate;
  };

  const validateCVV = (cvv) => {
    return cvv.length === 3 && !isNaN(cvv);
  };

  const handleAddCard = async () => {
    if (!cardNumber || !name || !date || !cvv) {
      Snackbar.show({
        text: 'Enter Complete Details',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      return;
    }else if (!validateCardNumber(cardNumber)) {
      Snackbar.show({
        text: 'Invalid Card Number. Must be 16 digits.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      return;
    }else if (!validateExpiryDate(date)) {
      Snackbar.show({
        text: 'Invalid Expiry Date. Use MM/YY format.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      return;
    }else if (!validateCVV(cvv)) {
      Snackbar.show({
        text: 'Invalid CVV. Must be 3 digits.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red'
      });
      return;
    }else{

  
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
    await buyCourses();
    if (refRBSheet2.current) {
      refRBSheet2.current.open();
    }
  }
  };

  return (
    <View style={[Styles.main, { padding: 0 }]}>
      <CustomHeader title={'Checkout'} showBack={true} />
      <CustomCard />
      <Payment actionButton={() => refRBSheet.current.open()} price={price} />
      <CustomRBSheet
        Sheet={refRBSheet}
        View={
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={Styles.heading}>Add Card </Text>
            <Text style={Styles.subHeading}>Add your card details here</Text>
            <CustomInputs
              placeholder={'Card Number'}
              keyboardType={'number-pad'}
              onChange={(val) => setCardNumber(val)}
              val={cardNumber}
            />
            <CustomInputs
              placeholder={'Card Holder Name'}
              onChange={(val) => setName(val)}
              val={name}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <CustomInputs
                placeholder={'Expiry date'}
                widthbox={'40%'}
                keyboardType={'default'}
                onChange={(val) => setDate(val)}
                val={date}
              />
              <CustomInputs
                placeholder={'CVV'}
                widthbox={'40%'}
                keyboardType={'number-pad'}
                onChange={(val) => setCvv(val)}
                val={cvv}
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
                alignItems: 'center'
              }}>
              <CustomButton
                title={'Add Card'}
                textcolor={newTheme.white}
                fontsize={20}
                wbox={'90%'}
                padding={0.5}
                action={handleAddCard}
              />
            </LinearGradient>
          </View>
        }
      />
      <CustomRBSheet
        Sheet={refRBSheet2}
        View={
          <PaymentDone actionButton={() => navigation.navigate('BottomeNavigation', { screen: 'Home' })} />
        }
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({});

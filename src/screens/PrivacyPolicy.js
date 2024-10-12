import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import newTheme from '../utils/Constants';
import Styles from '../utils/Styles';

const PrivacyPolicy = () => {
  return (
    <View style={Styles.main}>
      <CustomHeader showBack={true} title={'Privacy Policy'} />
      <View style={Styles.main}>
      <Text
        style={Styles.title}>
        Last Update : 05/02/2023
      </Text>
      <Text
        style={Styles.subTitle}>
        Please read these terms of service, carefully before using our app
        operated by us
      </Text>
      <Text
        style={styles.text}>
        Conditions of Uses
      </Text>
      <Text
        style={Styles.subTitle}>
        
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like)...
      </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  text:{color: newTheme.primary,fontFamily: newTheme.medium,fontSize: 20}
});

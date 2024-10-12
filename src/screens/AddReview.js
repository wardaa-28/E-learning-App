import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../components/CustomHeader'
import Styles from '../utils/Styles';
import CustomButton from '../components/CustomButton';
import newTheme from '../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import Webhandler from '../data/remote/Webhandler';

const AddReview = () => {
    const navigation = useNavigation();
    const [inputValue, setInputValue] = useState('');
    const [rating, setRating] = useState(0);
    const route1 = useRoute();
    const { id, title, image, mentor } = route1.params; 
    console.log("🚀 ~ AddReview ~ id:", id);

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const addReview = async () => {
        if (inputValue !== '') {
            try {
                const reviewData = {
                    review: inputValue,
                    rating: rating,
                };

                const response = await Webhandler(`https://elearningportal-56538109f664.herokuapp.com/courses/reviews/${id}`, reviewData, 'POST');
                console.log('Response:', response);
                navigation.goBack();
            } catch (error) {
                console.error('Error submitting review:', error);
               
            }
        } else {
            console.log('Review text is empty');
        }
    };

    const handleSubmit = () => {
        console.log('Review Submitted:', inputValue, rating);
        addReview();
    };

    return (
        <ScrollView style={[Styles.main, { padding: 0.1 }]}>
            <KeyboardAvoidingView>
                <CustomHeader showBack={true} title={'Reviews'} />
                <View style={Styles.justify}>
                    <Image source={image} resizeMode='cover' style={styles.image} />
                </View>
                <View style={Styles.justify}>
                    <Text style={[Styles.textBox, { marginTop: 5 }]}>{title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '70%', marginBottom: 8 }}>
                        <View style={{ width: '30%', height: 60, borderRadius: 300, marginRight: 8 }}>
                            <Image source={{ uri: mentor.img }} resizeMode='cover' style={{ width: '100%', height: 60, borderRadius: 300 }} />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={Styles.heading}>{mentor.name}</Text>
                            <Text style={[Styles.title, { fontSize: 16 }]}>{mentor.title}</Text>
                        </View>
                    </View>
                    <Text style={Styles.subHeading}>Please share your ratings with us</Text>
                    <Rating  type='custom'  ratingColor='#e9d44d'   ratingBackgroundColor='white' ratingCount={5}  imageSize={30}  startingValue={0}  onFinishRating={setRating} style={{ marginBottom: 8 }}/>
                    <View style={{ width: '90%', borderRadius: 10, borderWidth: 1, height: 200, borderColor: newTheme.grey }}>
                        <TextInput
                            style={{ fontFamily: newTheme.regular, fontSize: 18, color: newTheme.black, height: 190, textAlignVertical: 'top' }}
                            placeholder='Share your thoughts'
                            placeholderTextColor={newTheme.black}
                            multiline={true}
                            value={inputValue}
                            onChangeText={handleInputChange}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                    <CustomButton title={'Cancel'} textcolor={newTheme.white} fontFamily={newTheme.semiBold} wbox={'45%'} backgroundcolor={'#C8C8C8'} boxwidth={'45%'} margin={8} action={() => { navigation.goBack() }} />
                    <CustomButton title={'Submit'} textcolor={newTheme.white} fontFamily={newTheme.semiBold} wbox={'45%'} backgroundcolor={inputValue !== '' ? newTheme.color2 : '#C8C8C8'} boxwidth={'45%'} margin={8} action={handleSubmit} />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default AddReview;

const styles = StyleSheet.create({
    image:{ width: '90%', height: 210, borderRadius: 10 }
});

import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import newTheme from '../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import Styles from '../utils/Styles';
import Url from '../data/remote/Url';
import Webhandler from '../data/remote/Webhandler';
import { BallIndicator } from 'react-native-indicators';
import CustomInputs from '../components/CustomInputs';

const FeaturedCourses = () => {
    const navigation = useNavigation();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(''); 

    useEffect(() => {
        getAllCourses();
    }, []);

    useEffect(() => {
        if (searchText.trim()) {
            const filtered = courses.filter((course) =>
                course?.data?.details?.title?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredCourses(filtered);
        } else {
            setFilteredCourses(courses);
        }
    }, [searchText, courses]);

    const getAllCourses = async () => {
        const data = await Webhandler(Url.ALL_COURSES + '?limit=100', null, 'GET');
        console.log("🚀 ~ getAllCourses ~ data:", JSON.stringify(data));
        setCourses(data?.results);
        setFilteredCourses(data?.results); 
        setLoading(false);
    };

    const screen = (id) => {
        if (id) {
            navigation.navigate("CourseDetails", { id });
        }
    };

    return (
        <View style={Styles.main}>
            <CustomHeader showBack={true} title={'All Courses'} />
            <CustomInputs  iconFamily={'AntDesign'} name={'search1'} placeholder={'Search'}  widthbox={'98%'}    val={searchText}  onChange={setSearchText}/>
            <View style={{ flex: 1 }} >
                {loading ? <BallIndicator size={30} color={newTheme.grey} /> : (
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={filteredCourses}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={() => { screen(item.id) }}>
                                    <View style={Styles.justify}>
                                        <Image source={{ uri: item?.data?.details?.img }} resizeMode='cover' style={styles.image} />
                                    </View>
                                    <LinearGradient
                                        colors={[newTheme.color1, newTheme.color2]}
                                        style={styles.linear}>
                                        <CustomButton title={item?.data?.details?.title} textcolor={newTheme.white} fontsize={16} marginBottom={4} fontFamily={newTheme.regular} padding={4} />
                                    </LinearGradient>
                                    <View >
                                        <Text style={[Styles.title, { color: newTheme.black }]}>{item?.data?.details?.title}</Text>
                                    </View>
                                    <View style={Styles.box}>
                                        <View style={Styles.row}>
                                            <AntDesign name={'star'} size={20} color={'#E49907'} />
                                            <Text style={Styles.subHeading}>{item?.data?.details?.rating}</Text>
                                            <Text style={Styles.subHeading}> ( {item?.data?.details?.numOfReviews} reviews)</Text>
                                        </View>
                                        <View>
                                            <Text style={Styles.subHeading}>$ {item?.data?.details?.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default FeaturedCourses;

const styles = StyleSheet.create({
    linear: { justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 8, padding: 4, width: '100%' },
    image: { width: '100%', borderRadius: 10, height: 150 },
    button: { padding: 10, borderRadius: 10, margin: 5, backgroundColor: newTheme.white, elevation: 3,shadowColor:newTheme.color1 }
});

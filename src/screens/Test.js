import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Styles from '../utils/Styles';

const SavedCoursesScreen = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCourses = async () => {
      try {
        const response = await fetch('https://elearningportal-56538109f664.herokuapp.com/courses/saved');
        console.log("🚀 ~ fetchSavedCourses ~ response:",JSON.stringify (response))
        const data = await response.json();
        console.log("🚀 ~ fetchSavedCourses ~ data:",JSON.stringify( data))
        setCourses(data);
      } catch (error) {
        console.error('Error fetching saved courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCourses();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={Styles.heading}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SavedCoursesScreen;

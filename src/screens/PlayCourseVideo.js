import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Webhandler from '../data/remote/Webhandler';
import { useRoute } from '@react-navigation/native';

const PlayCourseVideo = () => {
  const route = useRoute();
    const { courseId, video } = route.params;
    console.log("🚀 ~ PlayCourseVideo ~ courseId:", courseId)
    console.log("🚀 ~ PlayCourseVideo ~  video :", video)
    const [videoCourse, setVideoCourse] = useState(null);
  
    useEffect(() => {
      getCourseVideo();
    }, []);
  
    const getCourseVideo = async () => {
      try {
        const response = await Webhandler(
          `https://elearningportal-56538109f664.herokuapp.com/courses/${courseId}/video/${video}`,
          {},
          'GET'
        );
        if (response) {
          console.log("🚀 ~ getCourseVideo ~ response :", response);
          setVideoCourse(response);
        } else {
          console.error("No response from server");
        }
      } catch (error) {
        console.error("Error fetching course video:", error);
      }  
    };
  
  

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: videoCourse?.link }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PlayCourseVideo;

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  NativeModules
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import CameraPhotoEdit from '../components/CameraPhotoEdit';
import Camera from 'react-native-camera';

import API from '../components/ApiClient'
var api = new API();

export default class VideoRecordScreen extends React.Component {
  render(){
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>


        <View
          style={styles.cameraArea}>

        </View>

        <View style={styles.cameraActionArea}>
          <Text>Video functionalty will be activated soon.</Text>
        </View>

      </View>
    );
  }
};
import styles from '../styles/PopilicityStyles'

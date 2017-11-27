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

import {CameraKitCamera, CameraKitCameraScreen} from 'react-native-camera-kit';

import API from '../components/ApiClient'
var api = new API();

export default class CameraScreenV2 extends React.Component {

  render(){
      let leftButton =(
      <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
        <Text style={styles.navBarButtonText}>Cancel</Text>
      </TouchableOpacity>)

    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
      <Text>Camera V2</Text>
        <NavigationBar
          leftButton= {leftButton}
          navigate2Wall = {this.props.navigate2Wall}
        />

        <CameraKitCamera
          ref={cam => this.camera = cam}
         style={styles.cameraArea}
          cameraOptions={{
            flashMode: 'auto',             // on/off/auto(default)
            focusMode: 'on',               // off/on(default)
            zoomMode: 'on',                // off/on(default)
            ratioOverlay:'1:1',            // optional, ratio overlay on the camera and crop the image seamlessly
            ratioOverlayColor: '#00000077' // optional
          }}
          onReadQRCode={(event) => console.log(event.nativeEvent.qrcodeStringValue)} // optional

        />

        <View style={styles.cameraActionArea}>
          <TouchableOpacity onPress={this.takePicture}>
            <View style={styles.cameraTakeButton}></View>
          </TouchableOpacity>
        </View>


      </View>
    );
  }

  takePicture = () => {
    console.log('photo taken.');
    this.camera.capture(true).then((image) => {
        console.log('image theb')
        console.log(image)
    });
    // .then((data) => {
    //   console.log('capture then');
    //
    //   NativeModules.RNImageToBase64.getBase64String(data.path, (err, base64) => {
    //     let photoObj = {path: data.path, base64: 'data:image/jpg;base64,' + base64 };
    //     console.log('base64 ')
    //     this.props.navigator.push({
    //       component: CameraPhotoEdit,
    //       passProps: {
    //         name: 'Camera',
    //         photo: photoObj,
    //         toggleTabBar: this.props.toggleTabBar,
    //         controller: this.props.controller
    //       }
    //     });
    //
    //   });
    //
    // })
    // .catch(err => console.error(err));
  }
};
import styles from '../styles/PopilicityStyles'

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

export default class CameraScreen extends React.Component {
  componentWillMount() {
      this.setState({cameraPermission:'null'})
        Camera.checkVideoAuthorizationStatus().then((auth) => {
            this.setState({cameraPermission:auth})
        });
  }
  render(){
      let leftButton =(
      <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
        <Text style={styles.navBarButtonText}>Cancel</Text>
      </TouchableOpacity>)

    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <NavigationBar
          leftButton= {leftButton}
          navigate2Wall = {this.props.navigate2Wall}
        />
        {this.state.cameraPermission == true ?
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraArea}
          captureQuality={Camera.constants.CaptureQuality.medium}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        :
        <Text>You dont have perrmission to access camera.</Text>
        }

        <View style={styles.cameraActionArea}>
          <TouchableOpacity onPress={this.takePicture}>
            <View style={styles.cameraTakeButton}></View>
          </TouchableOpacity>
        </View>


      </View>
    );
  }

  takePicture = () => {
    //console.log('photo taken.');
    this.camera.capture()
    .then((data) => {
      //console.log(data.path);

      NativeModules.RNImageToBase64.getBase64String(data.path, (err, base64) => {
        let photoObj = {path: data.path, base64: 'data:image/jpg;base64,' + base64 };
        this.props.navigator.push({
          component: CameraPhotoEdit,
          passProps: {
            name: 'Camera',
            photo: photoObj,
            toggleTabBar: this.props.toggleTabBar,
            controller: this.props.controller
          }
        });

      });

    })
    .catch(err => console.error(err));
  }
};
import styles from '../styles/PopilicityStyles'

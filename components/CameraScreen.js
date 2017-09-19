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
  componentWillMount(){
    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
      <Text style={styles.navBarButtonText}>Cancel</Text>
    </TouchableOpacity>)
    this.setState({leftButton: leftButton});
  }

  render(){

    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <NavigationBar
          leftButton={this.state.leftButton}
          rightButton={this.state.rightButton}
          navigate2Wall = {this.props.navigate2Wall}
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraArea}
          captureQuality={Camera.constants.CaptureQuality.medium}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>

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
            toggleTabBar: this.props.toggleTabBar
          }
        });

      });

    })
    .catch(err => console.error(err));
  }
};
import styles from '../styles/PopilicityStyles'
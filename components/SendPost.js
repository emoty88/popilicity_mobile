import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Camera from 'react-native-camera';
import NavigationBar from '../components/NavigationBar';

import RNPhotosFramework from 'react-native-photos-framework';
import CameraScreen from '../components/CameraScreen';
import LibraryScreen from '../components/LibraryScreen';
import TextPost from '../components/TextPost';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import API from '../components/ApiClient'
var api = new API();


export default class SendPost extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { leftButton: <Text></Text>, rightButton:<Text></Text> };

  }
  async componentWillMount() {
      await RNPhotosFramework.requestAuthorization();
      await Camera.checkVideoAuthorizationStatus();
  }

  librarImageChoose = () =>{
    //console.log(this.state.image);
    NativeModules.RNImageToBase64.getBase64String(data.path, (err, base64) => {
      let photoObj = {path: data.path, base64: 'data:image/jpg;base64,' + base64 };
      this.props.navigator.push({
        component: CameraPhotoEdit,
        passProps: {
          name: 'Camera',
          photo: photoObj,
          toggleTabBar: this.props.toggleTabBar,
          controller: this.props.controller,
        }
      });

    });
  }

  render(){
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <ScrollableTabView
          tabBarPosition = {'bottom'}
          initialPage = {1}
          tabBarUnderlineStyle={{height:1, backgroundColor:'#2980b9'}}
          tabBarBackgroundColor={'#ffffff'}
          tabBarActiveTextColor={'#2980b9'}
          tabBarInactiveTextColor={'#c8c8c8'}
          >
          <LibraryScreen
            navigator={this.props.navigator}
            toggleTabBar={this.props.toggleTabBar}
            controller={this.props.controller}
            tabLabel="Library" />

          <CameraScreen
            navigator={this.props.navigator}
            toggleTabBar={this.props.toggleTabBar}
            controller={this.props.controller}
            tabLabel="Camera" />

          <TextPost
              navigator={this.props.navigator}
              toggleTabBar={this.props.toggleTabBar}
              controller={this.props.controller}
              tabLabel="Text" />

        </ScrollableTabView>
      </View>
    );
  }
};
import styles from '../styles/PopilicityStyles'

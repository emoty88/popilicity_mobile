import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';

import CameraScreen from '../components/CameraScreen';
import LibraryScreen from '../components/LibraryScreen';
import VideoRecordScreen from '../components/VideoRecordScreen';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import API from '../components/ApiClient'
var api = new API();


export default class SendPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leftButton: <Text></Text>, rightButton:<Text></Text> };

  }

  componentWillMount() {
    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
      <Text style={styles.navBarButtonText}>Cancel</Text>
    </TouchableOpacity>)
    this.setState({leftButton: leftButton});
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

          <VideoRecordScreen tabLabel="Video" />

        </ScrollableTabView>
      </View>
    );
  }
};
import styles from '../styles/PopilicityStyles'

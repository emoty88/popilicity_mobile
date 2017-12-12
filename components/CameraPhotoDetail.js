import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  TextInput,
} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Wall from '../components/Wall';
import Spinner from 'react-native-loading-spinner-overlay';

import API from '../components/ApiClient'
var api = new API();

var CameraPhotoDetail = React.createClass({
  componentWillMount(){
    this.setState({comment:'', interest:'', location:'', visible: false});
  },
  render(){

    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    let rightButton =(
    <TouchableOpacity onPress={this._publishPost}>
      <Text style={styles.navBarButtonText}>Publish</Text>
    </TouchableOpacity>)

    return (
      <View style={[styles.container, {backgroundColor: '#FAFAFA'}]}>
        <NavigationBar
          leftButton={leftButton}
          rightButton={rightButton}
          navigate2Wall = {this.props.navigate2Wall}
        />
      <View style={styles.photoDetailTextArea}>
        <ScrollView ref='scrollView'
          style={styles.photoDetailTextA} >
          <TextInput
            style={styles.photoDetailTextInput}
            placeholder={'Comment'}
            multiline={true}
            onChangeText={(text) => {
              this.setState({comment:text});
            }}
            />
        </ScrollView>
        <Image
          style={styles.photoDetailPhoto}
          source={{uri: this.props.photo.base64}}/>
      </View>

      <View style={styles.fwInputContainer}>
        <Text
          style={{
            fontSize:15,
            fontWeight:'700',
            color: '#bababa',
            margin: 4,
          }}>#</Text>
        <TextInput
          style={styles.fwInputText}
          placeholder='Interest'
          onChangeText={(text) => {
            this.setState({interest:text});
          }}
          />
      </View>

      <View style={styles.fwInputContainer}>
        <Text
          style={{
            fontSize:15,
            fontWeight:'700',
            color: '#bababa',
            margin: 4,
          }}>@</Text>
        <TextInput
          style={styles.fwInputText}
          placeholder='Location'
          onChangeText={(text) => {
            this.setState({location:text});
          }}
          />
      </View>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>
    );
  },
  _publishPost(){
    // this.setState({visible: true});
    if(this.state.comment == '' || this.state.interest == '' || this.state.location == ''){
        AlertIOS.alert(
         'Required field error',
         'Please fill all field before publish your post.'
        );
    } else {
        this.props.toggleTabBar();
        this.props.controller.publishPost(this.props.photo, this.state.comment, this.state.interest, this.state.location);
        this.props.navigator.popToTop();
    }

    // let publishPromise = api.publishPost(this.props.photo, this.state.comment, this.state.interest, this.state.location);
    // publishPromise.then((res) => {
    //   this.setState({visible: true});
    //   this.props.toggleTabBar();
    //   this.props.controller.uploadingPost = 'Uploading...!';
    //   this.props.navigator.popToTop();
    // });
  }
});
import styles from '../styles/PopilicityStyles'

module.exports = CameraPhotoDetail;

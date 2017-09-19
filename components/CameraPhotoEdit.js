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
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraPhotoDetail from '../components/CameraPhotoDetail';


import API from '../components/ApiClient'
var api = new API();

var CameraPhoto = React.createClass({
  render(){
    //console.log(this.props.photo);
    let filternames = ['Esta', 'Lucina', 'Margarida', 'Lindiwe', 'Sanya'];
    const filters = filternames.map((name, index) =>{
      return (
        <TouchableOpacity key={index} onPress={this._filterAlert}>
          <View style={styles.cameraFilter} onPress={this._filterAlert}>
            <Text style={styles.cameraFilterText}>{name}</Text>
            <Image style={styles.cameraFilterThumb} source={{uri: this.props.photo.base64}}/>
          </View>
        </TouchableOpacity>
      );
    });

    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    let photoDetailPageRoute = {
      component: CameraPhotoDetail,
      passProps: {
        name: 'Photo Detail',
        photo: this.props.photo,
        toggleTabBar: this.props.toggleTabBar
      }
    }

    let rightButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.push(photoDetailPageRoute);}}>
      <Text style={styles.navBarButtonText}>Next</Text>
    </TouchableOpacity>)

    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <NavigationBar
          leftButton={leftButton}
          rightButton={rightButton}
          navigate2Wall = {this.props.navigate2Wall}
        />

        <View>
          <Image style={styles.cameraArea} source={{uri: this.props.photo.base64}}/>
        </View>

        <View style={styles.cameraFilterArea}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            >

            <View style={styles.cameraFilter}>
              <Text style={[styles.cameraFilterText, styles.cameraFilterTextActive]}>Normal</Text>
              <Image style={styles.cameraFilterThumb} source={{uri: this.props.photo.base64}}/>
            </View>

            {filters}
          </ScrollView>
        </View>

      </View>
    );
  },
  _filterAlert(){
    AlertIOS.alert(
      'Filters not implemented',
      'Filter feature will be implemented soon.'
    );
  }
});
import styles from '../styles/PopilicityStyles'

module.exports = CameraPhoto;

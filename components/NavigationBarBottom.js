"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Navigator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraScreen from '../components/CameraScreen';
import SearchView from '../components/SearchView';

var NavigationBarBottom = React.createClass({
  render(){
    return (
      <View style={styles.NavBarBottomContainer} shadowColor={'#000000'} shadowOffset={[10,10]}>
          <TouchableOpacity onPress={this.props.navigate2Wall} >
            <Icon style={styles.NavBarBottomIcon} name="home" size={25} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.navigate2Search} >
            <Icon style={styles.NavBarBottomIcon}
              name="search"
              size={25}
              />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.navigate2Camera} >
            <View style={styles.NavBarBottomIconAddPost}>
              <View style={styles.NavBarBottomIconAddPostInnerC}>
                <IconM style={styles.NavBarBottomIconPlus} name="plus" size={60} />
              </View>
              <View style={styles.NavBarBottomIconAddPlusShadowHider}></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.navigate2myLikedPostWall} >
            <Icon style={styles.NavBarBottomIcon} name="heart" size={25} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.navigate2Profile} >
            <Icon style={styles.NavBarBottomIcon} name="user" size={25} />
          </TouchableOpacity>
      </View>
    );
  },

});
import styles from '../styles/PopilicityStyles'

module.exports = NavigationBarBottom;

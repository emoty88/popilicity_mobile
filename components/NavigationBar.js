"use strict";

import React from 'react';

import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

var NavigationBar = React.createClass({
  render(){
    return (
      <View style={styles.NavBarContainer} shadowColor={'#000000'} shadowOffset={[10,10]}>
        <View style={{flex:3, marginLeft:10}}>
          <TouchableOpacity onPress={this.props.leftButtonAction}>
            {this.props.leftButton}
          </TouchableOpacity>
        </View>
        <View style={{flex:10, alignItems:'center'}}>
          <TouchableOpacity onPress={this.props.navigate2Wall}>
            <Text style={styles.NavBarTitle}>POPILICITY</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:3, marginRight:10, alignItems:'flex-end'}}>
          {this.props.rightButton}
        </View>
      </View>
    );
  }
});
import styles from '../styles/PopilicityStyles'

module.exports = NavigationBar;

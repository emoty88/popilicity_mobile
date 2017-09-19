"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class NavigationBarSearch extends React.Component {
  componentWillMount(){
    this.setState({searchText:''})
  }

  render(){
    return (
      <View style={styles.NavBarContainer}>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Popularity"
            returnKeyType='search'
            onSubmitEditing={()=>{
              this.props.profileSearchFunc(this.state.searchText);
              this.props.postSearchFunc(this.state.searchText);
            }}
            onChangeText={(text) => {
              this.setState({searchText:text})
            }}
          />
        </View>
        <View style={{flex:3, marginRight:10, alignItems:'flex-end'}}>
          {this.props.rightButton}

        </View>

      </View>

    );
  }
};

import styles from '../styles/PopilicityStyles'

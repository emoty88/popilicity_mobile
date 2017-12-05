"use strict";
import React from 'react';
import{
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import moment from 'moment'

SETTINGS = require('../components/Settings');

import NavigationBar from '../components/NavigationBar';
import Spinner from 'react-native-loading-spinner-overlay';
import PostItem from '../components/PostItem';
import Icon from 'react-native-vector-icons/FontAwesome';


import API from '../components/ApiClient'
var api = new API();


export default class PostDetail extends React.Component {

  render(){
      let leftButton =(
      <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
        <Icon name="chevron-left" size={15} color="#2980b9" />
      </TouchableOpacity>)
    return (
        <View style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
            <NavigationBar
                leftButton={leftButton}
                navigate2Wall = {this.props.navigate2Wall}
            />
            <ScrollView style={{padding:0, margin:0}} automaticallyAdjustContentInsets={false}>
                <PostItem  style={{backgroundColor:'red'}} post={this.props.post} navigator={this.props.navigator}/>
                <Text></Text>
                <Text></Text>
            </ScrollView>
        </View>
    );
  }

  _loadPost = (postID) => {
      this.props.controller.loadPost(postID).then((post_obj) => {
          this.setState({post: post_obj})
      });
  }

};
import styles from '../styles/PopilicityStyles'

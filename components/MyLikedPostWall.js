"use strict";
import React from 'react';
import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AlertIOS,
  ScrollView,
} from 'react-native';

SETTINGS = require('../components/Settings');

import NavigationBar from '../components/NavigationBar';
import SideView from '../components/SideView';
const SideMenu = require('react-native-side-menu');
import Spinner from 'react-native-loading-spinner-overlay';

import PostItem from '../components/PostItem';
import Icon from 'react-native-vector-icons/FontAwesome';



import API from '../components/ApiClient'
var api = new API();

export default class MyLikedPostWall extends React.Component {

  componentWillMount(){
    this.setState({visible:true});
    this.setState({posts:null});
    this.setState({'isOpen': false});
  }

  componentDidMount(){
    let post_promise = api.get_myLikedPosts();
    post_promise.then((posts) => {
      this.setState({posts:posts.results});
      this.setState({visible:false});
    });
  }

  render(){
    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    const PostComponents = this.state.posts ?
        this._getPostsComponents(this.state.posts) :
        <Text></Text>
    return (
        <View style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
          <NavigationBar
            leftButton={leftButton}
            navigate2Wall = {this.props.navigate2Wall}
          />

          <ScrollView style={styles.FullWidth}>
            {PostComponents}
          </ScrollView>
        <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  }

  _toggleSideMenu = () => {
    //console.log('pressed');
    this.setState({isOpen: !this.state.isOpen});
  }

  _getPostsComponents = (posts) => {
    const PostComponents = posts.map((post) => {
      return (
        <PostItem
          key= {post.id}
          post = {post}
          navigator = {this.props.navigator}
          updateWallFunc = {this._updateWall}
        />
      );
    });
    return PostComponents
  }

  _updateWall = () => {
    let post_promise = api.get_posts();
    post_promise.then((posts) => {
      this.setState({posts:posts.results})
    });
  }

  _navigate2Search = () => {
    let route = {
      component: Landing,
      passProps: {
        name: 'Landing'
      }
    }
    console.log(route);
    //this.props.navigator.push(route)
  }


};
import styles from '../styles/PopilicityStyles'

"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  ListView,
  Image,
} from 'react-native';


import PostItem from '../components/PostItem';
import API from '../components/ApiClient';
var api = new API();

export default class SearchPeople extends React.Component{
  render(){
    const posts = this.props.posts ?
        this.props.posts :
        [];
    console.log(posts)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //let testContent = ['test1', 'test2', 'test3', 'test5']
    let postSource = ds.cloneWithRows(posts);
    return (
      <View style={[styles.container,]}>
        <ListView
          ref={(ListView) => { this.ListView = ListView; }}
          style = {{flex:1, alignSelf:'stretch'}}
          renderSeparator={() =>
            <View style={{height:1}}></View>
          }
          dataSource={postSource}
          renderRow={(post) =>
              <Text>{post}</Text>
            // <PostItem
            //   key= {post.id}
            //   post = {post}
            //   navigator = {this.props.navigator}
            // />
          }
        />
      </View>
    );
  }

};

import styles from '../styles/PopilicityStyles'

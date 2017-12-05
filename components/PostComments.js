"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import CommentView from '../components/CommentView';
import Icon from 'react-native-vector-icons/FontAwesome';
var TimeAgo = require('react-native-timeago');

var PostComments = React.createClass({
  render(){
    let comment_set = this.props.comment_set;
    let firstComment = comment_set[0]
    return (
      <View>
        <View style={styles.PostItemCommentLineContainer}>
          <View style={{flex:1}}></View>
          <View style={styles.PostItemCommentLine}></View>
          <View style={{flex:1}}></View>
        </View>
        <View style={styles.PostItemCommentAreaContainer}>
          <Text style={styles.PostItemComment}>
            <Text style={{fontWeight:'bold'}}>
              {firstComment.owner.first_name + ' ' + firstComment.owner.last_name } </Text>
              {firstComment.text}
          </Text>
          <TouchableOpacity onPress={this.props._nav2comments}>
            <Text style={styles.PostItemCommentViewAll}>View All comments</Text>
          </TouchableOpacity>
          <TimeAgo style={styles.PostItemCommentDate} time={firstComment.create_date} />
        </View>
      </View>
    );
  }
});
import styles from '../styles/PopilicityStyles'

module.exports = PostComments;

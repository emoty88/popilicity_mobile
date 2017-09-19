"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  AlertIOS,
  ListView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import API from '../components/ApiClient'
var api = new API();



var CommentItem = React.createClass({
  render(){

    let comment = this.props.comment;

    return (
      <View style={styles.commentItemContainer}>
        <View>
          <Image
            style={styles.commentItemProfileImage}
            source={{uri: SETTINGS.SITE_URL + comment.owner.image_path}}
          />
        </View>
        <View style={{marginLeft:10}}>
          <Text style={styles.PostItemComment}>
            <Text style={{fontWeight:'bold'}}>
              {comment.owner.first_name} </Text>
              {comment.text}
          </Text>
          <Text style={styles.commentItemDate}>12 Minutes Ago !!!!</Text>
        </View>
      </View>
    );
  }
});


var CommentView = React.createClass({
  componentWillMount(){
    this.setState({comment_text:''});
    this.setState({comments:this.props.comments});
  },
  componentDidMount(){
    this.ListView.scrollToEnd({animated: true});
  },
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //let testC = ['test1', 'test2', 'test3', 'test5']
    let comments = this.state.comments;
    let commentSource = ds.cloneWithRows(comments);
    //console.log(comments);

    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    return (
      <KeyboardAvoidingView
        behavior='height'
        style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <NavigationBar
          leftButton={leftButton}
          navigate2Wall = {this.props.navigate2Wall}
        />
        <ListView
        ref={(ListView) => { this.ListView = ListView; }}
        style = {{flex:1, alignSelf:'stretch'}}
        dataSource={commentSource}
        renderRow={(rowData) =>
          <CommentItem comment={rowData} />
        }
        />
        <View style={styles.commentItemTextArea}>
          <TextInput
             style={{
               flex:1,
               height: 30,
               fontSize: 13,
               marginLeft: 10,
             }}
             placeholder="Comment"
             defaultValue = {this.state.comment_text}
             returnKeyType='send'
             onSubmitEditing={this.send_command}
             onChangeText={(text) => {
               this.setState({comment_text:text});
             }}
          />
          <TouchableOpacity style={{
            width:70,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.send_command}
          >
            <Text style={{
              color: '#2980b9',
              fontWeight: '700',
            }}>Post</Text>
          </TouchableOpacity>
        </View>
      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </KeyboardAvoidingView>
    );
  },

  send_command(){
    this.setState({visible: true});
    let promise = api.sendCommand(this.state.comment_text, this.props.post_id)
    promise.then((comment) => {
      //console.log(comment);
      this.setState({
          comments: this.state.comments.concat([comment])
      });
      this.setState({comment_text:''});
      this.setState({visible: false});
    });
  }

});
import styles from '../styles/PopilicityStyles'

module.exports = CommentView;

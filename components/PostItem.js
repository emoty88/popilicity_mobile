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
} from 'react-native';

import PostComments from '../components/PostComments';
import Controller from '../components/Controller';
import CommentView from '../components/CommentView';
import StarRating from 'react-native-star-rating';

import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../components/ApiClient'
var api = new API();
const CachedImage = require('react-native-cached-image');
var CON = new Controller;


var ReactionIcons = React.createClass({
  render(){
    var is_rated = this.props.post.is_rated;
    var rate = 0;

    if (is_rated){
      //console.log(this.props.post.id);
      rate = this.props.post.rate;
    }
    //console.log(is_rated);
    //console.log(rate);
    return (
      <View style={styles.PostItemActionsContainer}>
        <StarRating
          disabled={is_rated}
          maxStars={5}
          rating={rate}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
          starSize={25}
          starStyle={[styles.PostItemAcionIcon, styles.PostItemAcionIconLiked]}
        />

        <View style={styles.PostItemActionsSeperator}></View>
        <TouchableOpacity onPress={this.props._nav2comments}>
          <Icon
            style={[styles.PostItemAcionIcon, styles.PostItemAcionIconDisLiked]}
            name="comment-o"
            size={25}
          />
        </TouchableOpacity>
      </View>
    )
  },

  onStarRatingPress(rating){
    let res = api.sendStarRate(this.props.post.id, rating);
    res.then((reaction)=>{
      this.props.updateWallFunc();
    })
  },

  liked(){
    let res = api.sendReaction(this.props.post_id, 1);
    res.then((reaction)=>{
      this.props.updateWallFunc();
    })
  },
  disliked(){
    let res = api.sendReaction(this.props.post_id, -1);
    res.then((reaction)=>{
      this.props.updateWallFunc();
    })
  }
});

export default class PostItem extends React.Component {

  render(){
    let post = this.props.post;
    return (
      //PostItemContainer

      <View style={styles.PostItemContainer}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => { CON.NavigateUserProfile(this.props.navigator, post.owner) }}>
            <CachedImage
               style={styles.PostItemProfileImage}
               source={{uri: SETTINGS.SITE_URL + post.owner.image_path, cache: 'default'}}
             />
           </TouchableOpacity>
           <View>
            <TouchableOpacity onPress={() => { CON.NavigateUserProfile(this.props.navigator, post.owner) }}>
              <Text style={styles.PostItemProfileName}>{post.owner.first_name}</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.PostItemPostInfoText}>@{post.location.name}</Text>
              <Text style={styles.PostItemPostInfoText}>#{post.interest.name}</Text>
            </View>
           </View>
           <View style={{flex:1, justifyContent:'center' }}>
              <View style={{alignSelf: 'flex-end', flexDirection:'row'}}>
                  <View style={styles.ItemPointContainer}>
                    <Icon
                      style={{color:'#ffffff', marginRight:6, marginTop:1}}
                      name="star"
                      size={15}
                      onPress={this.liked}
                    />
                  <Text style={{color:'#ffffff'}}>
                    {(post.point).toFixed()}
                  </Text>
                  </View>
                  <View style={{marginRight:20, paddingTop:5}}>
                      <TouchableOpacity onPress={()=>{this.blockUser(post.owner.id, post.owner.first_name)}}>
                          <Icon name="ban" size={20}/>
                      </TouchableOpacity>
                  </View>
              </View>
            </View>
        </View>
        <CachedImage
          style={styles.PostItemPostImage}
          source={{uri: post.path}}
        />

      <ReactionIcons updateWallFunc = {this.props.updateWallFunc} post={post} _nav2comments={this.commentPage}/>

        { post.comment_set.length > 0 ? <PostComments
          navigator={this.props.navigator}
          comment_set={post.comment_set}
          post_id = {post.id}
          _nav2comments={this.commentPage}
          />:null }
      </View>
    );
  }

  blockUser = (id, name) =>{
      AlertIOS.alert(
          'Block ' + name + ' ?',
          'You will no longer see this user posts.',
          [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Yes', onPress: () => {
                  api.blockUser(id).then((data) => {
                      if ('non_field_errors' in data)
                      {
                          AlertIOS.alert(
                              'Blocking Error',
                              'You cannot block yourself.'
                          );
                      }
                      this.props.updateWallFunc();
                  });
              }},
            ]
          );
  }

  commentPage = () => {
    let route = {
      component: CommentView,
      passProps: {
        name: 'CommentView',
        comments : this.props.post.comment_set,
        post_id : this.props.post.id,
      }
    };
    this.props.navigator.push(route);
    //console.log(this.props);
  }


};

import styles from '../styles/PopilicityStyles'

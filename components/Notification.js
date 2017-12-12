"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  ListView,
  Image,
  TouchableOpacity,
} from 'react-native';

import PostDetail from '../components/PostDetail';
import NavigationBar from '../components/NavigationBar';
const CachedImage = require('react-native-cached-image');
import Icon from 'react-native-vector-icons/FontAwesome';
var TimeAgo = require('react-native-timeago');
import API from '../components/ApiClient';
var api = new API();

class NotificationTemplate extends React.Component{
  render(){
    let reactionTest = 'loved';
    if (this.props.item.action == -1){
      reactionTest = 'liked'
    } else if (this.props.item.action == 5){
      reactionTest = 'rated'
    } else if (this.props.item.action == 2){
      reactionTest = 'commented'
    }
    return(
        <TouchableOpacity onPress={this.navigate2post}>
            <View style={{flex:1, flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{this.props.controller.NavigateUserProfile(this.props.navigator, this.props.item.owner)}}>
                <CachedImage
                   style={styles.PostItemProfileImage}
                   source={{uri: SETTINGS.SITE_URL + this.props.item.owner.image_path, cache: 'default'}}
                 />
                </TouchableOpacity>
                 <View style={{flex:1, margin:13}}>
                 <Text>
                  <Text style={{fontWeight:'bold'}} onPress={()=>{this.props.controller.NavigateUserProfile(this.props.navigator, this.props.item.owner)}}>{this.props.item.owner.first_name}</Text> {reactionTest} your post
                 </Text>
                    <TimeAgo time={this.props.item.create_date} />
                 </View>
                 <CachedImage
                    style={{width:50,height:50,  marginTop:10, marginRight:10}}
                    source={{uri: this.props.item.target_post.path}}
                 />

            </View>
        </TouchableOpacity>
    )
  }

  navigate2post = () => {
      let route = {
        component: PostDetail,
        passProps: {
          post: this.props.item.target_post
        }
      };
      this.props.navigator.push(route);
  }
}
export default class Notification extends React.Component{
  componentWillMount(){
    this.setState({'notifications':[]})
  }
  componentDidMount(){
    let notPromise = api.getNotifications();
    notPromise.then((notifications) => {
      //console.log(notifications['results']);
      this.setState({'notifications': notifications['results']})
    });
  }
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //let profileSourcex = ['test1', 'test2', 'test3', 'test5']
    let profileSource = ds.cloneWithRows(this.state.notifications);

    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    return (
      <View style={[styles.container,{backgroundColor:'#fff'}]}>
        <NavigationBar
          leftButton={leftButton}
        />
        <ListView
          ref={(ListView) => { this.ListView = ListView; }}
          style = {{flex:1, alignSelf:'stretch'}}
          renderSeparator={() =>
            <View style={styles.PostItemCommentLineContainer}>
              <View style={{flex:1}}></View>
              <View style={styles.PostItemCommentLine}></View>
              <View style={{flex:1}}></View>
            </View>
          }
          dataSource={profileSource}
          renderRow={(noti) =>
            <NotificationTemplate key={noti.id} item={noti} navigator={this.props.navigator} controller={this.props.controller}/>
          }
        />
      </View>
    );
  }

};

import styles from '../styles/PopilicityStyles'

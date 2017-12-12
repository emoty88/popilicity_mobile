"use strict";
import React from 'react';
import{
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AlertIOS,
  ScrollView,
  Image,
} from 'react-native';

SETTINGS = require('../components/Settings');
import NavigationBar from '../components/NavigationBar';
import PostItem from '../components/PostItem';
import EditProfile from '../components/EditProfile';
import Icon from 'react-native-vector-icons/FontAwesome';

const CachedImage = require('react-native-cached-image');

import API from '../components/ApiClient'
var api = new API();

export default class ProfileDetail extends React.Component {

  componentWillMount(){
    //console.log(this.props.user);
    this.setState({is_myProfile:false})
    this.setState({profile:null});
    this.setState({posts:null});
    this.setState({'isOpen': false});
    let profile_promise = api.getProfile(this.props.user.id);
    profile_promise.then((user) => {
      this.setState({profile: user[0]})
    });

    api.getloggedUser().then((res) => {
        if(res[0].id == this.props.user.id){
            this.setState({is_myProfile:true})
        }
    });
  }

  componentDidMount(){
    let post_promise = api.get_user_posts(this.props.user.id);
    post_promise.then((posts) => {
      this.setState({posts:posts.results})
      //console.log(posts)
    });
  }

  render(){
    //console.log(this.state.profile)
    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Icon name="chevron-left" size={15} color="#2980b9" />
    </TouchableOpacity>)

    let rightButton = null;
    if(this.state.is_myProfile){
        rightButton =(
        <TouchableOpacity onPress={()=>{
            this.props.navigator.push({
              component: EditProfile,
              passProps: {
                name: 'EditProfile',
                profile: this.state.profile,
                toggleTabBar: this.props.toggleTabBar,
                _logout: this.props._logout,
              }
            });
        }}>
          <Text style={styles.navBarButtonText}>Edit</Text>
        </TouchableOpacity>)
    }

    const PostComponents = this.state.posts ?
        this._getPostsComponents(this.state.posts) :
        <Text>Post not exist</Text>
    return (
      <View style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
          <NavigationBar
            leftButton={leftButton}
            rightButton={rightButton}
            navigate2Wall = {this.props.navigate2Wall}
          />


          <ScrollView style={styles.FullWidth}>
            <View style={styles.UserProfileCard}>
              <View style={styles.UserProfileCardL1}>

                <CachedImage
                   style={styles.UserProfileProfileImage}
                   source={{uri: SETTINGS.SITE_URL + this.props.user.image_path}}
                 />
                 <View style={styles.UserProfileDetailCard}>
                   <View style={{marginHorizontal:15}}>
                     <Text style={{marginTop:10, alignSelf:'center', fontWeight:'bold'}}>
                      {this.state.profile ? (this.state.profile.point).toFixed(): '0' }
                     </Text>
                     <Text style={{alignSelf:'center', color:'#808685', fontSize:12}}>
                      Points
                     </Text>
                   </View>

                   <View style={{marginHorizontal:15}}>
                     <Text style={{marginTop:10, alignSelf:'center', fontWeight:'bold'}}>
                      {this.state.profile ? this.state.profile.post_count: '0' }
                     </Text>
                     <Text style={{alignSelf:'center', color:'#808685', fontSize:12}}>
                      Posts
                     </Text>
                   </View>

                   {/* <View style={{marginHorizontal:15}}>
                     <Text style={{marginTop:10, alignSelf:'center', fontWeight:'bold'}}>
                      {this.state.profile ? this.state.profile.like_count: '0' }
                     </Text>
                     <Text style={{alignSelf:'center', color:'#808685', fontSize:12}}>
                      Likes
                     </Text>
                   </View> */}

                   {/* <View style={{marginHorizontal:15}}>
                     <Text style={{marginTop:10, alignSelf:'center', fontWeight:'bold'}}>
                      {this.state.profile ? this.state.profile.dislike_count: '0' }
                     </Text>
                     <Text style={{alignSelf:'center', color:'#808685', fontSize:12}}>
                      Dislikes
                     </Text>
                   </View> */}

                 </View>
               </View>
               <View style={styles.UserProfileCardL2}>
                <Text style={{fontWeight:'bold'}}>{this.props.user.first_name}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color:'#808685'}}>@{this.state.profile ? this.state.profile.location.name: 'Location' }</Text>
                  <Text style={{marginLeft:20, color:'#808685'}}>#{this.state.profile ? this.state.profile.interest.name: 'Interest'} </Text>
                </View>
               </View>
            </View>

            {PostComponents}
          </ScrollView>

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
};
import styles from '../styles/PopilicityStyles'

"use strict";
import React from 'react';
import{
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    AlertIOS,
    ScrollView,
    FlatList,
    AsyncStorage,
    Image
} from 'react-native';
import moment from 'moment'

SETTINGS = require('../components/Settings');

import NavigationBar from '../components/NavigationBar';
import SideView from '../components/SideView';
const SideMenu = require('react-native-side-menu');
import Spinner from 'react-native-loading-spinner-overlay';
import Notification from '../components/Notification';
import PostItem from '../components/PostItem';
import ProfileItem from '../components/ProfileItem';
import Icon from 'react-native-vector-icons/FontAwesome';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import API from '../components/ApiClient'
var api = new API();

class ProfileWall extends React.Component{
    render(){
        const ProfileComponents = this.props.profiles ?
            this._getProfileComponents(this.props.profiles) :
            <Text></Text>
        return(
            <ScrollView>
                {ProfileComponents}
            </ScrollView>
        )
    }

    _getProfileComponents = (profiles) => {
      const ProfileComponents = profiles.map((profile) => {
        return (
          <ProfileItem
            key= {profile.id}
            profile = {profile}
            navigator = {this.props.navigator}
            updateWallFunc = {this._updateWall}
          />
        );
      });
      return ProfileComponents
    }
}

class PostWall extends React.Component {
    posts = []

    render(){
        this.posts = this.props.posts;
        let uploadingPost = null;
        if(this.props.controller.postUploading){
            uploadingPost = (
                <View style={[styles.PostItemContainer,{flexDirection:'row'}]}>
                    <Image
                     style={{height:50, width:50, margin:10}}
                     source={{uri: this.props.controller.postImage.base64}}
                   />
               <Text style={{alignSelf:'center', fontSize:18}}>Uploading...</Text>
                </View>
            )
        }
        ////Add to up to this state posts
        if(this.props.controller.uploadedPost){
            this.posts = [this.props.controller.uploadedPost, ...this.posts]
            // uploadingPost = (
            //     <PostItem
            //       key= {this.props.controller.uploadedPost.id}
            //       post = {this.props.controller.uploadedPost}
            //       navigator = {this.props.navigator}
            //       updateWallFunc = {this.props.updateWall}
            //     />
            // )
        }
        ///
        const PostComponents = this.posts ?
            (<FlatList
                data={this.posts}
                renderItem={this._renderPostItem}
                onEndReached = {this.props.loadNextPage}
            />) :
            <Text></Text>
        return(
            <View>
                {uploadingPost}
                {PostComponents}
            </View>
        )
    }

    _renderPostItem = (item) => {
        let post = item.item;
        return (
          <PostItem
            key = {post.id}
            post = {post}
            navigator = {this.props.navigator}
            updateWallFunc = {this.props.updateWall}
          />
        );
    }

    _getPostsComponents = (posts) => {
      const PostComponents = posts.map((post) => {
        return (
          <PostItem
            key= {post.id}
            post = {post}
            navigator = {this.props.navigator}
            updateWallFunc = {this.props.updateWall}
          />
        );
      });
      return PostComponents
    }
}

export default class Wall extends React.Component {

  componentWillMount(){
    this.setState({
        visible:true,
        notCount:0,
        posts:[],
        popular_posts:null,
        profiles:null,
        isOpen: false,
        post_page: 1,
    });
  }

  componentDidMount(){
      this._loadPosts();

      let max_time = moment().format('YYYY-MM-DD HH:mm:ss');
      let min_time = moment().subtract(30,'hours').format('YYYY-MM-DD HH:mm:ss');


      let popularPosts = api.searchPost(false, max_time, min_time);
      popularPosts.then((posts) => {
          this.setState({popular_posts: posts.results});
      });

      let profilePromise = api.searchProfile(false);
      profilePromise.then((profiles) => {
          this.setState({profiles:profiles});
      });
  }

  render(){
    let rightButton =(
    <TouchableOpacity onPress={this._navigate2Notification}>
      <Icon name="bell-o" size={15} color="#2980b9" />
    </TouchableOpacity>)

    return (
        <View style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
            <NavigationBar
                rightButton={rightButton}
                navigate2Wall = {this.props.navigate2Wall}
            />
            <ScrollableTabView
                tabBarUnderlineStyle={{height:1, backgroundColor:'#2980b9'}}
                tabBarBackgroundColor={'#ffffff'}
                tabBarActiveTextColor={'#2980b9'}
                tabBarInactiveTextColor={'#c8c8c8'}
                >
                <PostWall tabLabel="Wall" posts={this.state.posts} navigator={this.props.navigator} updateWall={this._updateWall} loadNextPage={this._loadNextPage} controller={this.props.controller} />
                <PostWall tabLabel="Popular Posts" posts={this.state.popular_posts} navigator={this.props.navigator} updateWall={this._updateWall} controller={this.props.controller}/>
                <ProfileWall tabLabel="People" profiles={this.state.profiles} navigator={this.props.navigator} controller={this.props.controller}/>

            </ScrollableTabView>
            <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
        </View>
    );
  }

  _toggleSideMenu = () => {
    //console.log('pressed');
    this.setState({isOpen: !this.state.isOpen});
  }

  _loadNextPage = () => {
      this.setState({post_page: this.state.post_page + 1}, this._loadPosts)
  }

  _loadPosts = () => {
      this.props.controller.loadPosts(this.state.post_page).then((posts) => {
          this.setState({posts: [...this.state.posts, ...posts.results]});
          this.setState({visible:false});
      });
  }

  _updateWall = () => {
      let post_promise = api.get_posts();
      post_promise.then((posts) => {
          this.setState({posts:posts.results});
          this.setState({visible:false});
      });

      let max_time = moment().format('YYYY-MM-DD HH:mm:ss');
      let min_time = moment().subtract(30,'hours').format('YYYY-MM-DD HH:mm:ss');


      let popularPosts = api.searchPost(false, max_time, min_time);
      popularPosts.then((posts) => {
          this.setState({popular_posts: posts.results});
      });
  }

  _navigate2Search = () => {
    let route = {
      component: Landing,
      passProps: {
        name: 'Landing'
      }
    }
    //console.log(route);
    this.props.navigator.push(route)
  }

  _navigate2Notification = () => {
    let route = {
      component: Notification,
      passProps: {
        name: 'Notification',
        toggleTabBar: this._toggleTabBar,
      }
    }
    this.props.navigator.push(route)
  }


};
import styles from '../styles/PopilicityStyles'

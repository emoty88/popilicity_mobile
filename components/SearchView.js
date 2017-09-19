import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  ScrollView
} from 'react-native';
import moment from 'moment'
SETTINGS = require('../components/Settings');
import NavigationBarSearch from '../components/NavigationBarSearch';
import SearchPeople from '../components/SearchPeople';
import SearchPosts from '../components/SearchPosts';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import API from '../components/ApiClient'
var api = new API();

export default class SearchView extends React.Component {
  componentWillMount(){
    this.setState({profiles:[]});
    this.setState({hot_posts:[]});
    this.setState({thisweek_posts:[]});
    this.setState({alltimes_posts:[]});
  }

  profileSearch = (text) => {
    profilePromise = api.searchProfile(text);
    profilePromise.then((profiles) => {
      this.setState({profiles:profiles});
    });
  }

  postSearch = (text) => {
    max_time = moment().format('YYYY-MM-DD HH:mm:ss');
    min_time = moment().subtract(30,'hours').format('YYYY-MM-DD HH:mm:ss');

    profilePromise = api.searchPost(text, max_time, min_time);
    profilePromise.then((posts) => {
      this.setState({hot_posts:posts.results});
    });

    max_time = moment().subtract(30,'hours').format('YYYY-MM-DD HH:mm:ss');
    min_time = moment().subtract(180,'hours').format('YYYY-MM-DD HH:mm:ss');

    profilePromise = api.searchPost(text, max_time, min_time);
    profilePromise.then((posts) => {
      this.setState({thisweek_posts:posts.results});
    });

    max_time = moment().subtract(180,'hours').format('YYYY-MM-DD HH:mm:ss');
    min_time = moment().subtract(1,'years').format('YYYY-MM-DD HH:mm:ss');

    profilePromise = api.searchPost(text, max_time, min_time);
    profilePromise.then((posts) => {
      this.setState({alltimes_posts:posts.results});
    });
  }

  render(){
    let rightButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
      <Text style={styles.navBarButtonText}>Cancel</Text>
    </TouchableOpacity>)

    return (
      <View style={[styles.container, {backgroundColor: '#ecf0f1'}]}>
          <NavigationBarSearch
            profileSearchFunc={this.profileSearch}
            postSearchFunc={this.postSearch}
            rightButton={rightButton}
            />
            <ScrollableTabView
              tabBarUnderlineStyle={{height:1, backgroundColor:'#2980b9'}}
              tabBarBackgroundColor={'#ffffff'}
              tabBarActiveTextColor={'#2980b9'}
              tabBarInactiveTextColor={'#c8c8c8'}
              >
              <SearchPeople tabLabel="People"
                profiles={this.state.profiles}
              />
              <SearchPosts tabLabel="Hot"
                posts={this.state.hot_posts}
              />
              <SearchPosts tabLabel="This Week"
                posts={this.state.thisweek_posts}
              />
              <SearchPosts tabLabel="All Times"
                posts={this.state.alltimes_posts}
              />
            </ScrollableTabView>

      </View>
    );
  }
};

import styles from '../styles/PopilicityStyles'

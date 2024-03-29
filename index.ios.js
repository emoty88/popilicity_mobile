/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import Landing from './components/Landing';
import NavigationBarBottom from './components/NavigationBarBottom';
import Wall from './components/Wall';
import SearchView from './components/SearchView';
import MyLikedPostWall from './components/MyLikedPostWall';
import CameraScreen from './components/CameraScreen';
import SendPost from './components/SendPost';
import ProfileDetail from './components/ProfileDetail';


import API from './components/ApiClient';
var api = new API();

import CONT from './components/Controller';
var con = new CONT();

export default class popilicity_mobile extends Component {
  componentWillMount(){
    this.setState({'toolBarVisible': false});
    // api.logout()
  }

  render() {
    return (
      <View style={{flex:1}}>

          <NavigatorIOS
            ref={(nav)=>  this._nav = nav}
            style={{ flex:1 }}
            initialRoute={{
              title:'Landing',
              component: Landing,
              passProps:{
                  name: 'Landing',
                  toggleTabBar: this._toggleTabBar,
                  controller : con,
                  logout: this._logout
              }
             }}
            navigationBarHidden={true}
            configureScene= {this.configureScene}
            />
          {
            this.state.toolBarVisible ?
            <NavigationBarBottom
              navigate2Search={this._navigate2Search}
              navigate2Wall={this._navigate2Wall}
              navigate2Camera={this._navigate2Camera}
              navigate2Profile={this._navigate2myLikedPostWall}
              navigate2myLikedPostWall={this._navigate2myLikedPostWall}
              navigate2Profile={this._navigate2Profile}
            /> : null
          }

      </View>
    );
  }

  _navigate2Wall = () => {
    let route = {
      component: Wall,
      title: 'Wall',
      passProps: {
        name: 'Wall',
        controller: con,
      }
    }
    this._nav.replace(route);
  }

  _navigate2Search = () => {
    let route = {
      component: SearchView,
      title: 'SearchView',
      passProps: {
        name: 'SearchView',
        controller: con,
      }
    }
    this._nav.push(route);
  }

  _navigate2myLikedPostWall = () => {
    let route = {
      component: MyLikedPostWall,
      title: 'MyLikedPostWall',
      passProps: {
        name: 'MyLikedPostWall',
        controller: con,
      }
    }
    this._nav.push(route);
  }

  _navigate2Camera = () => {
    //this.setState({toolBarVisible: false});
    this._toggleTabBar();
    let route = {
      component: SendPost,
      passProps: {
        name: 'SendPost',
        toggleTabBar: this._toggleTabBar,
        controller: con,
      }
    }
    this._nav.push(route);
  }

  _navigate2Profile = () => {
    //this.setState({toolBarVisible: false});
    //this._toggleTabBar();
    userPromise = api.getloggedUser();
    userPromise.then((user)=>{
      let route = {
        component: ProfileDetail,
        passProps: {
          name: 'ProfileDetail',
          toggleTabBar: this._toggleTabBar,
          controller: con,
          _logout: this._logout,
          user: user[0],
        }
      }
      this._nav.push(route);
    });

  }

  _logout = () => {
    let logout = api.logout();
    logout.then((is_logout) =>{
        let route = {
          component: Landing,
          title: 'Landing',
          passProps: {
            name: 'Landing',
            controller: con,
            toggleTabBar: this._toggleTabBar,
          }
        }
        this._toggleTabBar();
        this._nav.replace(route);

    }).catch((error) => {
      console.error(error);
      return false
    });

  }

  _toggleTabBar = () => {
    this.setState({toolBarVisible: !this.state.toolBarVisible});
  }

  renderScene = (route, navigator) => {
    return <route.component
      navigator = {navigator}
      navigate2Profile = {this._navigate2Profile}
      navigate2Search = {this._navigate2Search}
      navigate2Wall = {this._navigate2Wall}
      toggleTabBar = {this._toggleTabBar}
      logout = {this._logout}
      {...route.passProps} />
  }

  configureScene = (route) => {
    FloatFromBottomComponents = ['CameraScreen', ]
    if(FloatFromBottomComponents.includes(route.component.displayName)){
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    else{
      return Navigator.SceneConfigs.PushFromRight;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});

AppRegistry.registerComponent('popilicity_mobile', () => popilicity_mobile);

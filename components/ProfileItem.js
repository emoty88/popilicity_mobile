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


import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../components/ApiClient'
var api = new API();

const CachedImage = require('react-native-cached-image');
import Controller from '../components/Controller';
var CON = new Controller;

export default class ProfileItem extends React.Component {

  render(){
    let profile = this.props.profile;
    return (
        //PostItemContainer
        <TouchableOpacity onPress={() => { CON.NavigateUserProfile(this.props.navigator, profile.user) }} key={profile.id}>
            <View style={styles.searchProfileUserItemContainer}>
                <CachedImage
                 style={styles.PostItemProfileImage}
                 source={{uri: SETTINGS.SITE_URL + profile.user.image_path, cache: 'default'}}
                />

             <View>
                <Text style={styles.PostItemProfileName}>{profile.user.first_name}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.PostItemPostInfoText}>@{profile.location.name}</Text>
                    <Text style={styles.PostItemPostInfoText}>#{profile.interest.name}</Text>
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
                      {(profile.point).toFixed()}
                    </Text>
                    </View>
                </View>
              </View>
            </View>
        </TouchableOpacity>
    // <TouchableOpacity onPress={() => { CON.NavigateUserProfile(this.props.navigator, this.props.profile.user) }} key={profile.id} >
    //     <View style={styles.searchProfileUserItemContainer}>
    //     <CachedImage
    //        style={styles.searchProfileUserItemImage}
    //        source={{uri: SETTINGS.SITE_URL + profile.user.image_path}}
    //      />
    //
    //     <View style={styles.searchProfileUserItemTextArea}>
    //         <Text style={styles.searchProfileUserItemText}>{profile.user.first_name}</Text>
    //         <Text style={styles.searchProfileUserItemSubText}>@{profile.location.name} | #{profile.interest.name}</Text>
    //     </View>
    //
    //     <View style={[styles.ItemPointContainer, {marginLeft: 0}]}>
    //         <Icon
    //             style={{color:'#ffffff', marginRight:6, marginTop:1}}
    //             name="star"
    //             size={15}
    //             onPress={this.liked}
    //         />
    //         <Text style={{color:'#ffffff', alignSelf:'flex-end'}}>
    //          {(profile.point).toFixed()}
    //         </Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
    );
  }
};

import styles from '../styles/PopilicityStyles'

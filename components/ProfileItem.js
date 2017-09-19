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
    <TouchableOpacity onPress={() => { CON.NavigateUserProfile(this.props.navigator, this.props.profile.user) }} key={profile.id} style={styles.searchProfileUserItemContainer}>

            <CachedImage
               style={styles.searchProfileUserItemImage}
               source={{uri: SETTINGS.SITE_URL + profile.user.image_path}}
             />

        <View style={styles.searchProfileUserItemTextArea}>
            <Text style={styles.searchProfileUserItemText}>{profile.user.first_name}</Text>
            <Text style={styles.searchProfileUserItemSubText}>@{profile.location.name} | #{profile.interest.name}</Text>
        </View>

        <View style={[styles.ItemPointContainer, {marginLeft: 190}]}>
            <Icon
                style={{color:'#ffffff', marginRight:6, marginTop:1}}
                name="star"
                size={15}
                onPress={this.liked}
            />
            <Text style={{color:'#ffffff', alignSelf:'flex-end'}}>
             {(profile.point).toFixed()}
            </Text>
        </View>
    </TouchableOpacity>
    );
  }
};

import styles from '../styles/PopilicityStyles'

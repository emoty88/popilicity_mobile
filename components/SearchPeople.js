"use strict";

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  StyleSheet,
  Text,
  ListView,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../components/ApiClient';
var api = new API();

export default class SearchPeople extends React.Component{
  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //let testContent = ['test1', 'test2', 'test3', 'test5']
    let profileSource = ds.cloneWithRows(this.props.profiles);

    return (
      <View style={[styles.container,]}>
        <ListView
          ref={(ListView) => { this.ListView = ListView; }}
          style = {{flex:1, alignSelf:'stretch'}}
          renderSeparator={() =>
            <View style={{height:1}}></View>
          }
          dataSource={profileSource}
          renderRow={(profile) =>
            <View key={profile.id} style={styles.searchProfileUserItemContainer}>
              <Image
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
            </View>
          }
        />
      </View>
    );
  }

};

import styles from '../styles/PopilicityStyles'

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import API from '../components/ApiClient'
import Landing from '../components/Landing'

var api = new API();


export default class SideView extends React.Component{
  componentWillMount(){
    this.setState({user:''});
    userPromise = api.getloggedUser();
    userPromise.then((user)=>{
      this.setState({user:user[0]});
      //console.log(user);
      //console.log('user setted in state');
    });
  }
  render(){
    return (
      <View style={[styles.container, {backgroundColor:'#2980b9'}]}>
        <Image
           style={styles.SideViewProfileImage}
           source={{uri: SETTINGS.SITE_URL + this.state.user.image_path}}
         />
       <Text
         style={[styles.SideViewProfileName, {marginBottom:30}]}>
          {this.state.user.first_name}
        </Text>

        <TouchableOpacity onPress={this.props.navigate2Profile}>
          <Text style={styles.SideViewButton}>Profile</Text>
        </TouchableOpacity>

        <View style={styles.SideViewLine} />

        <TouchableOpacity onPress={this.props.navigate2Search}>
          <Text style={styles.SideViewButton}>Search</Text>
        </TouchableOpacity>

        <View style={styles.SideViewLine} />

        <TouchableOpacity onPress={this.props.navigate2Policy}>
            <Text style={styles.SideViewButton}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity >
          <View style={styles.SideViewLine} />
        </TouchableOpacity>

        <Text style={styles.SideViewButton}
          onPress={this.props.logout}
          >Logout</Text>
      </View>
    );
  }
}
import styles from '../styles/PopilicityStyles'

import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
} from 'react-native';

import API from '../components/ApiClient'
import Login from '../components/Login'
import Wall from '../components/Wall'
const api = new API();


export default class Landing extends React.Component {
  componentDidMount() {
    //api.test()
    let is_token_valid = api.check_token()
    is_token_valid.then((res) => {
        // console.log('res:');
        // console.log(res)
      if(res){
        let route = {
          component: Wall,
          title: 'Wall',
          passProps: {
            name: 'Wall'
          }
        }
        this.props.navigator.replace(route);
      }
      else{
        let route = {
          component: Login,
          title: 'Login',
          passProps: {
            name: 'Login'
          }
        }
        this.props.navigator.replace(route);
      }
    });

  }

  render(){
    return (
      <View style={styles.container}>
          <Image
             style={styles.LandingImage}
             source={{uri: 'http://localhost:8000/static/images/landing_image.png'}}
           />
      </View>
    );
  }
};
import styles from '../styles/PopilicityStyles'

module.exports = Landing;

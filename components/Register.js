import React from 'react';
SETTINGS = require('../components/Settings');
import{
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

// import UserProfile from '../components/UserProfile';
import Spinner from 'react-native-loading-spinner-overlay';

import API from '../components/ApiClient'
var api = new API();

var Register = React.createClass ({
  componentWillMount(){
    this.setState({name:''});
    this.setState({lastname:''});
    this.setState({email:''});
    this.setState({password:''});
  },
  render() {
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <Image
           style={styles.LoginImage}
           source={{uri: SETTINGS.SITE_URL+'/static/images/LogoBig.png'}}
         />

         <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={(text) => {
              this.setState({name:text});
            }}
          />
          <View style={styles.Line}></View>

          <TextInput
             style={styles.textInput}
             placeholder="Last Name"
             onChangeText={(text) => {
               this.setState({lastname:text});
             }}
           />
           <View style={styles.Line}></View>

          <TextInput
             style={styles.textInput}
             placeholder="Email"
             onChangeText={(text) => {
               this.setState({email:text});
             }}
           />
         <View style={styles.Line}></View>

         <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => {
              this.setState({password:text});
            }}
            secureTextEntry = {true}
          />
        <View style={styles.Line}></View>


        <TouchableOpacity style={styles.LoginBtn} onPress={this._register_btn}>
          <Text style={styles.LoginBtnText} >REGISTER</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={this._onPress_testBtn}>
          <Text style={styles.ForgetPwd}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._navigate_to_login}>
          <Text style={styles.ForgetPwd}>Already have an Account? Sign Up</Text>
        </TouchableOpacity>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  },
  _register_btn : function(){
    this.setState({visible: true});
    let name = this.state.name;
    let lastname = this.state.lastname;
    let email = this.state.email;
    let password = this.state.password;

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username: email,
        first_name: name,
        last_name: lastname,
        password: password,
      })
    };

    fetch(SETTINGS.API_URL + 'users/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      var loginPromise = api.login(email, password);
      loginPromise.then((res) => {
        this.setState({visible: false});
        if (res == true){
          this.props.navigator.push({
            component: UserProfile,
            passProps: {
              name: 'UserProfile'
            }
          });
        } else {
          this.setState({ErrorMsg: res.non_field_errors});
        }


      });
    })
    .catch((error) => {
      console.error(error);
      return error
    });
  },

  _navigate_to_login : function(){
    this.props.navigator.pop();
  }


});
import styles from '../styles/PopilicityStyles'

module.exports = Register;

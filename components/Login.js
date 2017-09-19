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
  KeyboardAvoidingView,
} from 'react-native';


import Register from '../components/Register';
import Wall from '../components/Wall';
import Spinner from 'react-native-loading-spinner-overlay';

import API from '../components/ApiClient'
var api = new API();

var Login = React.createClass ({
  componentWillMount(){
    this.setState({email:''});
    this.setState({password:''});
    this.setState({ErrorMsg:''});
  },
  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <Image
           style={styles.LoginImage}
           source={{uri: SETTINGS.SITE_URL+'/static/images/LogoBig.png'}}
         />
         <TextInput
            style={styles.textInput}
            placeholder="Email"
            keyboardType='email-address'
            returnKeyType='next'
            onSubmitEditing={()=>{this.passwordField.focus();}}
            onChangeText={(text) => {
              this.setState({email:text});
            }}
          />
          <View style={styles.Line}></View>

          <TextInput
             ref={(input) => this.passwordField = input}
             style={styles.textInput}
             placeholder="Password"
             onChangeText={(text) => {
               this.setState({password:text});
             }}
             secureTextEntry = {true}
           />
         <View style={styles.Line}></View>
         <Text>{this.state.ErrorMsg}</Text>

        <TouchableOpacity style={styles.LoginBtn} onPress={this._onPress_loginBtn}>
          <Text style={styles.LoginBtnText} >LOG IN</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={this._onPress_testBtn}>
          <Text style={styles.ForgetPwd}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._navigate_to_register}>
          <Text style={styles.ForgetPwd}>Don't you have an account? Log In</Text>
        </TouchableOpacity>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </KeyboardAvoidingView>

    );
  },
  _onPress_loginBtn : function(){
    this.setState({ErrorMsg: 'Login Processing...'});
    this.setState({visible: true});
    let email = this.state.email;
    let password = this.state.password;

    var loginPromise = api.login(email, password);
    loginPromise.then((res) => {
      this.setState({visible: false});

      if (res == true){
        this.props.navigator.replace({
          component: Wall,
          passProps: {
            name: 'Wall'
          }
        });
      } else {
        this.setState({ErrorMsg: res.non_field_errors});
      }


    });
  },

  _navigate_to_register(){
    this.props.navigator.push({
      component: Register,
      passProps: {
        name: 'Register'
      }
    });
  },

});
import styles from '../styles/PopilicityStyles'

module.exports = Login;

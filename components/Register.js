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

import UserProfile from '../components/UserProfile';
import NavigationBar from '../components/NavigationBar';
import Spinner from 'react-native-loading-spinner-overlay';
import WebViewer from '../components/WebViewer';
import API from '../components/ApiClient'
var api = new API();

export default class Register extends React.Component {
    constructor(props){
      super(props);
    }

  componentWillMount(){
    this.setState({name:'', lastname:'', email:'', password:'', ErrorMsg:''});
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
          <NavigationBar/>
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
             keyboardType='email-address'
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
        <Text>{this.state.ErrorMsg}</Text>

        <TouchableOpacity style={styles.LoginBtn} onPress={this._register_btn}>
          <Text style={styles.LoginBtnText} >REGISTER</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={this._onPress_testBtn}>
          <Text style={styles.ForgetPwd}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._navigate_to_login}>
          <Text style={styles.ForgetPwd}>Already have an Account? Log In</Text>
        </TouchableOpacity>

        <View style={{flex:1}}></View>

        <Text style={[styles.ForgetPwd,{alignSelf:'center',marginBottom:20}]}>
            <Text>
              By registering, you are agreeing to our
            </Text>
            <Text style={{color:'#69D2E7'}} onPress={this._navigate_to_terms}>
              {' Terms of use '}
            </Text>
            <Text>
              {' and '}
            </Text>
            <Text style={{color:'#69D2E7'}} onPress={this._navigate_to_privacy}>
            Privacy Policy
            </Text>
        </Text>
        <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  }

  _register_btn = () => {
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
    .then((response) => {
        if(!response.ok){
            response.json().then((obj)=>{
                let message = '';
                for(var k in obj){
                    message += k + ' : ' + obj[k][0] + '\n'
                }
                this.setState({ErrorMsg: message});
                this.setState({visible: false});
                throw Error(message)
            });
        }
        return response.json()
    })
    .then((responseJson) => {
      var loginPromise = api.login(email, password);
      loginPromise.then((res) => {
        this.setState({visible: false});
        if (res == true){
          this.props.navigator.push({
            component: UserProfile,
            passProps: {
              name: 'UserProfile',
              toggleTabBar: this.props.toggleTabBar,
              _logout: this.props._logout,
              controller: this.props.controller,
            }
          });
        } else {
            console.log(res)
            this.setState({ErrorMsg: res.non_field_errors});
        }


      });
    })
    .catch((e) => {
        console.log(e.message)
        // this.setState({ErrorMsg: e.message});
        return False
    });
  }

  _navigate_to_login = () => {
    this.props.navigator.pop();
}

    _navigate_to_terms = () => {
        this.props.navigator.push({
          component: WebViewer,
          passProps: {
            name: 'WebViewer',
            address: 'https://popilicity.com/static/terms.html'
          }
        });
    }

    _navigate_to_privacy = () => {
        this.props.navigator.push({
          component: WebViewer,
          passProps: {
            name: 'WebViewer',
            address: 'https://popilicity.com/static/privacypolicy.htm'
          }
        });
    }

};
import styles from '../styles/PopilicityStyles'

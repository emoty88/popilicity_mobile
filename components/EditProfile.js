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

var ImagePicker = require('react-native-image-picker');
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Wall from '../components/Wall';
import Landing from '../components/Landing';

import API from '../components/ApiClient';
var api = new API();

export default class EditProfile extends React.Component {

  componentWillMount(){
    this.setState({visible: false});

    this.setState({name: this.props.profile.user.first_name });
    this.setState({location: this.props.profile.location.name});
    this.setState({interest: this.props.profile.interest.name});
    this.setState({image: SETTINGS.SITE_URL + this.props.profile.user.image_path});
    // console.log(this.props.profile);
  }

  render() {
    let leftButton =(
        <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
            <Text style={styles.navBarButtonText}>Cancel</Text>
        </TouchableOpacity>
    );

    let rightButton =(
        <TouchableOpacity onPress={()=>{
            this._saveUserProfile();
            // console.log('saved');
        }}>
        <Text style={styles.navBarButtonText}>Save</Text>
        </TouchableOpacity>
    );

    let imageComp = (
      <TouchableOpacity onPress={this.openImagePicker} style={[styles.LoginImage,{justifyContent:'center'}]}>
        <Icon
        style={{alignSelf:'center'}}
        name="camera"
        size={60}
        color={'#dde4e6'}
        />
      </TouchableOpacity>
    );

    if (this.state.image != '') {
      imageComp = (
        <TouchableOpacity onPress={this.openImagePicker}>
          <Image
           style={styles.LoginImage}
           source={{uri: this.state.image}}
         />
       </TouchableOpacity>
      );
    }

    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
          <NavigationBar
            leftButton={leftButton}
            rightButton={rightButton}
            navigate2Wall = {this.props.navigate2Wall}
          />
          <View style={{backgroundColor:'#fafafa',height: 240, alignSelf: 'stretch',borderBottomWidth: 1, borderBottomColor: '#dbdbdb',justifyContent: 'center', alignItems: 'center',}}>
            {imageComp}
            <TouchableOpacity onPress={this.openImagePicker}>
            <Text style={[styles.navBarButtonText,{marginTop:20}]}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'row',alignSelf:'stretch'}}>
            <View style={{flex:1, height: 40,
                    paddingLeft:10,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center'}}>
                <Text style={{fontSize:16}}>
                    Name
                </Text>
            </View>
            <View style={{flex:3, height:10, }}>
                <TextInput
                   style={{height: 40,
                           marginTop: 10,
                           marginBottom: 10,}}
                   onChangeText={(text) => {
                     this.setState({name:text});
                   }}
                   value={this.state.name}
                 />
                 <View style={styles.Line}></View>
             </View>
          </View>

          <View style={{flexDirection: 'row',alignSelf:'stretch'}}>
            <View style={{flex:1, height: 40,
                    paddingLeft:10,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center'}}>
                <Text style={{fontSize:16}}>
                    Location
                </Text>
            </View>
            <View style={{flex:3, height:10, }}>
                <TextInput
                   style={{height: 40,
                           marginTop: 10,
                           marginBottom: 10,}}
                   onChangeText={(text) => {
                     this.setState({location:text});
                   }}
                   value={this.state.location}
                 />
                 <View style={styles.Line}></View>
             </View>
          </View>

          <View style={{flexDirection: 'row',alignSelf:'stretch'}}>
            <View style={{flex:1, height: 40,
                    paddingLeft:10,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center'}}>
                <Text style={{fontSize:16}}>
                    Interest
                </Text>
            </View>
            <View style={{flex:3, height:10, }}>
                <TextInput
                   style={{height: 40,
                           marginTop: 10,
                           marginBottom: 10,}}
                   onChangeText={(text) => {
                     this.setState({interest:text});
                   }}
                   value={this.state.interest}
                 />
                 <View style={styles.Line}></View>
             </View>
          </View>

          <View>

          <TouchableOpacity style={styles.LoginBtn} onPress={this.props._logout}>
            <Text style={styles.LoginBtnText} >Log Out</Text>
          </TouchableOpacity>
          </View>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  }

  _saveUserProfile =  async () => {
    this.setState({visible: true});
    let location = this.state.location;
    let interest = this.state.interest;
    let image = this.state.image;
    let name = this.state.name;
    const token = await AsyncStorage.getItem('@authToken:token');

    let options = {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        first_name: name,
      })
    };

    fetch(SETTINGS.API_URL + 'users/' + this.props.profile.user.id +'/', options)
    .then((response) => response.json())
    .then((responseJson) => {
        data = {
          location: {name: location},
          interest: {name: interest},
        }
        if (image.startsWith("data:image")){
            data.image = image
        }
        let options = {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + token
        },
        body: JSON.stringify(data)
      };

      fetch(SETTINGS.API_URL + 'profiles/' + this.props.profile.id + '/', options)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({visible: false});
        this.props.navigator.pop();
      })
      .catch((error) => {
        console.error(error);
        return error
      });
    })
    .catch((error) => {
      console.error(error);
      return error
    });

  }

  openImagePicker = () => {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Profile Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        //let source = { uri: response.uri };

        // You can also display the image using data:
        //let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: 'data:image/jpeg;base64,' + response.data
        });
      }
    });
  }
};
import styles from '../styles/PopilicityStyles'

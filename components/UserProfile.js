import React from 'react';
SETTINGS = require('../components/Settings');
import{
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

var ImagePicker = require('react-native-image-picker');
import NavigationBar from '../components/NavigationBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Wall from '../components/Wall';

export default class UserProfile extends React.Component {
    constructor(props){
      super(props);
    }

  componentWillMount(){
    this.setState({location:''});
    this.setState({interest:''});
    this.setState({image:''});
  }

  render() {
    let imageComp = (
      <TouchableHighlight onPress={this.openImagePicker} style={[styles.LoginImage,{justifyContent:'center'}]}>
        <Icon
        style={{alignSelf:'center'}}
        name="camera"
        size={60}
        color={'#dde4e6'}
        />
      </TouchableHighlight>
    );
    if (this.state.image != '') {
      imageComp = (
        <TouchableHighlight onPress={this.openImagePicker}>
          <Image
           style={styles.LoginImage}
           source={{uri: this.state.image}}
         />
       </TouchableHighlight>
      );
    }
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
          <NavigationBar/>
          <View style={{backgroundColor:'#fafafa',height: 240, alignSelf: 'stretch',borderBottomWidth: 1, borderBottomColor: '#dbdbdb',justifyContent: 'center', alignItems: 'center',}}>
              {imageComp}
          </View>

         <TextInput
            style={styles.textInput}
            placeholder="Location"
            onChangeText={(text) => {
              this.setState({location:text});
            }}
          />
          <View style={styles.Line}></View>

          <TextInput
             style={styles.textInput}
             placeholder="Interest"
             onChangeText={(text) => {
               this.setState({interest:text});
             }}
           />
           <View style={styles.Line}></View>



        <TouchableHighlight style={styles.LoginBtn} onPress={this._saveUserProfile}>
          <Text style={styles.LoginBtnText} >SAVE</Text>
        </TouchableHighlight>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  }

  _saveUserProfile =  async () => {
    this.setState({visible: true});
    let location = this.state.location;
    let interest = this.state.interest;
    let image = this.state.image;
    const token = await AsyncStorage.getItem('@authToken:token');

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + token
      },
      body: JSON.stringify({
        location: {name: location},
        interest: {name: interest},
        image: image,
      })
    };
    // console.log(options);
    fetch(SETTINGS.API_URL + 'profiles/', options)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.toggleTabBar();
      this.setState({visible: false});
      this.props.navigator.push({
        component: Wall,
        passProps: {
          name: 'Wall',
          toggleTabBar: this.props.toggleTabBar,
          _logout: this.props._logout,
          controller: this.props.controller,
        }
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

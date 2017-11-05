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
    this.setState({location:'',
        interest:'',
        image:'',
        ErrorMsg:'',
    });
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
           <Text>{this.state.ErrorMsg}</Text>


        <TouchableHighlight style={styles.LoginBtn} onPress={this._saveUserProfile}>
          <Text style={styles.LoginBtnText} >SAVE</Text>
        </TouchableHighlight>

      <Spinner visible={this.state.visible} textStyle={{color: '#FFF'}} />
      </View>

    );
  }

  _saveUserProfile =  async () => {
    // this.setState({visible: true});
    let location = this.state.location;
    let interest = this.state.interest;
    let image = this.state.image;
    if (this.state.image == ''){
        image = "iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTRGNDU4NUFGRTM1MTFFNDg5RURGM0NGQURFREE3MkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTRGNDU4NUJGRTM1MTFFNDg5RURGM0NGQURFREE3MkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5NEY0NTg1OEZFMzUxMUU0ODlFREYzQ0ZBREVEQTcyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5NEY0NTg1OUZFMzUxMUU0ODlFREYzQ0ZBREVEQTcyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvUbMFsAAAIfUExURer4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a8ilatBzAyf/ZVllt7/5tikhAGlq4Q2V/HHgDyONuk4NfHJo6/allXrzd3fjrlJDHx378+3NFdj+4WubQgDSehf4/fNXuf0H7j/d0CvU8IdHTzl3FX8jnHFqpNHXJwunh8+fe0W/HNw89E5P4y9ONo6P72rfG/PTIks+f7o7E0uTDQAXfznUdsfK8jY/P+uTX3RkZVmyA+Die8L1e+8aL7b3fU9+/Noj/8rSkmQLwMV6/7Z+3YIzsxaPf/vV3/wbG947ueaptZ+2ns7camQQwHfaP+WburK8BNkGIAAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABAIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAosv8IMACQzo2z1pdfTAAAAABJRU5ErkJggg=="
    } else {
        image = this.state.image;
    }
    // console.log(image);
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
    .then((response) => {
        if(!response.ok){
            console.log('response not ok');
            response.json().then((obj)=>{
                let message = '';
                for(var k in obj){
                    message += k + ' : ' + obj[k]['name'][0] + '\n'
                }
                this.setState({ErrorMsg: message});
                this.setState({visible: false});
                throw Error(message);
            });
        }
        return response.json()
    })
    .then((responseJson) => {
        //response.json()
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
      console.log(error);
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

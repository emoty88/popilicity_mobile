import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  CameraRoll,
  ScrollView,
  AlertIOS
} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import CameraPhotoEdit from '../components/CameraPhotoEdit';

import RNPhotosFramework from 'react-native-photos-framework';


import API from '../components/ApiClient'
var api = new API();

export default class LibraryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], image:false };

  }

  componentWillMount() {
    let leftButton =(
    <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
      <Text style={styles.navBarButtonText}>Cancel</Text>
    </TouchableOpacity>)
    this.setState({leftButton: leftButton});

    let rightButton =(
    <TouchableOpacity onPress={this.librarImageChoose}>
      <Text style={styles.navBarButtonText}>Next</Text>
    </TouchableOpacity>)
    this.setState({rightButton: rightButton});

    RNPhotosFramework.authorizationStatus().then((statusObj) => {
        this.setState({isAuthorized: statusObj.isAuthorized})
        if(statusObj.isAuthorized) {
            this.getAssets();
        }
    });

  }

  getAssets = () => {
      RNPhotosFramework.getAssets({
        //Example props below. Many optional.
        // You can call this function multiple times providing startIndex and endIndex as
        // pagination.
        startIndex: 0,
        endIndex: 100,

        fetchOptions : {
          // Media types you wish to display. See table below for possible options. Where
          // is the image located? See table below for possible options.
          sourceTypes: ['userLibrary'],
          prepareForSizeDisplay: (60,60),

          sortDescriptors : [
            {
              key: 'creationDate',
            }
          ]
        }
      }).then((response) => {
        //console.log('image setted');
      //   console.log(response.assets)
        this.setState({images : response.assets});
        this.setState({image : response.assets[0]});
        //console.log(response.assets[0]);
      });
  }

  librarImageChoose = () => {
    if(this.state.image === false ){
        AlertIOS.alert(
         'Image not found',
         'Sorry! There is no selected image. Please check, Library Access permissions.'
        );
    } else {
        let spliettedID = this.state.image.localIdentifier.split('/');
        let path = 'assets-library://asset/asset.JPG?id='+spliettedID[0]+'&ext=JPG'

        NativeModules.RNAssetResizeToBase64.assetToResizedBase64(path, 1200, 1200, (err, base64) => {
            let photoObj = {path: path, base64: 'data:image/jpg;base64,' + base64 };
            this.props.navigator.push({
              component: CameraPhotoEdit,
              passProps: {
                name: 'Camera',
                photo: photoObj,
                toggleTabBar: this.props.toggleTabBar,
                controller: this.props.controller
              }
            });
        });
    }

  }

  renderImage(asset, index) {
    return (
      <TouchableOpacity style={styles.libraryImage} key={index} onPress={()=> {this.setState({image: asset})} }>
        <Image source={asset.image} style={styles.libraryImage}></Image>
      </TouchableOpacity>
    );
  }

  render(){
    return (
      <View style={[styles.container, {backgroundColor:'#ffffff'}]}>
        <NavigationBar
          leftButton={this.state.leftButton}
          rightButton={this.state.rightButton}
          navigate2Wall = {this.props.navigate2Wall}
        />

        <View style={[styles.cameraArea,]}>
          <Image style={styles.cameraArea} source={this.state.image.image} ></Image>
        </View>

        <ScrollView style={{width:375}}>
          <View style={styles.libraryimageGrid} >
            { this.state.images.map(this.renderImage.bind(this)) }
          </View>
        </ScrollView>
      </View>
    );
  }

  logImageError = (err) => {
    console.log(err);
  }

};
import styles from '../styles/PopilicityStyles'

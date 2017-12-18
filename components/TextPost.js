import React from 'react';
SETTINGS = require('../components/Settings');

import{
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  ScrollView,
  ImageBackground

} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import CameraPhotoDetail from '../components/CameraPhotoDetail';

import API from '../components/ApiClient'
var api = new API();

export default class TextPost extends React.Component {
    componentWillMount(){

        this.setState({backgrounds:[], image:{id:1, path:'/static/images/orange_background.png', name:'The Orange'}, text:''})
        api.call('textpostbackgrounds').then((res) => {
            // console.log(res);
            // console.log(typeof res);
            this.setState({backgrounds: res})
        });
    }

    render(){
        let leftButton =(
            <TouchableOpacity onPress={()=>{this.props.navigator.pop(); this.props.toggleTabBar(); }}>
            <Text style={styles.navBarButtonText}>Cancel</Text>
            </TouchableOpacity>
        )

        let rightButton =(
            <TouchableOpacity onPress={this.sendTextPost}>
            <Text style={styles.navBarButtonText}>Next</Text>
            </TouchableOpacity>
        )

        return (
            <View style={styles.container}>
                <NavigationBar
                  leftButton={leftButton}
                  rightButton={rightButton}
                  navigate2Wall = {this.props.navigate2Wall}
                />
                <ImageBackground style={styles.cameraArea} source={{uri: SETTINGS.SITE_URL + this.state.image.path}}>
                    <View style={{width: Dimensions.get('window').width,
                                  height: Dimensions.get('window').width,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  padding:5
                              }} >
                        <TextInput
                            multiline
                            autoFocus={true}
                            style={{alignSelf:'stretch', color:'#fff', fontSize:25, fontWeight:'bold', textAlign:'center'}}
                            placeholder={'Type your message!'}
                            onChangeText={(text) => {
                              this.setState({text:text});
                            }}
                        />
                    </View>
                </ImageBackground>


                <ScrollView style={{width: Dimensions.get('window').width}}>
                  <View style={styles.libraryimageGrid} >
                    { this.state.backgrounds.map(this._renderItem.bind(this)) }
                  </View>
                </ScrollView>

            </View>
        );
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = (item) => {
        return(
        <TouchableOpacity style={styles.libraryImage} key={item.id} onPress={()=> {this._onPressItem(item)} }>
          <Image source={{uri:SETTINGS.SITE_URL + item.path}} style={styles.libraryImage}></Image>
        </TouchableOpacity>
        )
    };

    _onPressItem = (item) => {
        // updater functions are preferred for transactional updates
        this.setState({image:item})
    };

    sendTextPost = () => {
        let photoObj = {type:'text', image: this.state.image, text:this.state.text};
        this.props.navigator.push({
          component: CameraPhotoDetail,
          passProps: {
            name: 'Camera',
            photo: photoObj,
            toggleTabBar: this.props.toggleTabBar,
            controller: this.props.controller
          }
        });
    }
};

import styles from '../styles/PopilicityStyles'

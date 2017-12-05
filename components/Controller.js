"use strict";
import React from 'react';
import{
  AsyncStorage,
  ActionSheetIOS,
  AlertIOS,
} from 'react-native';

import ProfileDetail from '../components/ProfileDetail';
import API from '../components/ApiClient'
var api = new API();

export default class Controller extends React.Component {
    postUploading = false;
    postImage = null;
    uploadedPost = false;

    constructor(props){
      super(props);
    }


    test = () => {
        return this.testVar
    }

    changeTestVar = () => {
        this.uploadingPost = 'Uploading...';
    }

    NavigateUserProfile = (_nav, user) => {

        let route = {
          component: ProfileDetail,
          passProps: {
            user: user
          }
        };
        _nav.push(route);
    }

    Navigate2Wall = (_nav) => {
        let route = {
          component: Wall,
          passProps: {
            user: user
          }
        };
        _nav.push(route);
    }

    publishPost = (image, comment, interest, location) => {
        this.postImage = image;
        this.postUploading = true;

        let publishPromise = api.publishPost(image, comment, interest, location);
        publishPromise.then((res) => {
            console.log('asd');
            this.postUploading = false;
            this.uploadedPost = res;
            this.postImage = null;
        });
    }

    loadPosts = (page=1) => {
        this.uploadedPost = false;
        return api.get_posts(page);
    }

    loadPost = (ID) => {
        return api.get_post(ID);
    }

    flagPost = (userID, postID, userName) => {
        var BUTTONS = [
            'Report this post',
            'Block this user',
            'Cancel',
        ];
        var DESTRUCTIVE_INDEX = 1;
        var CANCEL_INDEX = 2;
        ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
        },
        (buttonIndex) => {
            console.log(buttonIndex);
            if(buttonIndex == 1){
                this.blockUser(userID, userName);
            } else if (buttonIndex == 0){
                this.reportPost(postID);
            }

        });
    }

    reportPost = (postID) => {
        AlertIOS.prompt(
          'Reason',
          'Explain why you are reporting this post?',
          text => api.reportPost(postID, text)
        );
    }

    blockUser = (id, name) =>{
        AlertIOS.alert(
            'Block ' + name + ' ?',
            'You will no longer see this user posts.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {
                    api.blockUser(id).then((data) => {
                        if ('non_field_errors' in data)
                        {
                            AlertIOS.alert(
                                'Blocking Error',
                                'You cannot block yourself.'
                            );
                        }
                        //this.props.updateWallFunc();
                    });
                }},
              ]
            );
    }
};

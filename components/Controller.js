"use strict";
import React from 'react';
import{
  AsyncStorage,
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
            this.postUploading = false;
            this.uploadedPost = res;
            this.postImage = null;
        });
    }

    loadPosts = (page=1) => {
        return api.get_posts(page);
    }
};

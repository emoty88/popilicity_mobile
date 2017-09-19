"use strict";
import React from 'react';
import{
  AsyncStorage,
} from 'react-native';

import ProfileDetail from '../components/ProfileDetail';


export default class Controller extends React.Component {
  test = () => {
    console.log('arrow function fired');
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
};

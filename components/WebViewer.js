"use strict";
import React from 'react';

import{
  View,
  StyleSheet,
  TouchableOpacity,
  WebView,
  ScrollView
} from 'react-native';

import NavigationBar from '../components/NavigationBar';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../components/ApiClient'
var api = new API();

export default class WebViewer extends React.Component {
    componentWillMount(){
      this.setState({htmlContent:''});
    }

    componentDidMount(){
        let options = {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain',
          }
        };

        let page = fetch(this.props.address, options);
        page.then((html)=>{
            this.setState({htmlContent:html._bodyText});
        });
    }

    render(){
        let leftButton =(
            <TouchableOpacity onPress={()=>{this.props.navigator.pop();}}>
                <Icon name="chevron-left" size={15} color="#2980b9" />
            </TouchableOpacity>);

        return (
            <View>
                <NavigationBar
                  leftButton={leftButton}
                />
                <ScrollView>
                    <HTMLView
                        style={{flex:1,padding:10}}
                        value={this.state.htmlContent}
                        stylesheet={htmlStyles}
                      />
                </ScrollView>
            </View>
        );
    }
};
const htmlStyles = StyleSheet.create({
  p: {
    margin:0,
    padding:0,
  },
});
import styles from '../styles/PopilicityStyles'

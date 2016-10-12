import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import API from '../api.js';

export default class QRCodeScreen extends Component {
  render() {
    return (
      <TouchableHighlight 
        style={styles.container}
        underlayColor="gray"
        onPress={ this.handleStartPress }
        >
        <Image style={styles.image} source={require('../assets/qrcode.png')}/>
      </TouchableHighlight>
    );
  }

  handleStartPress() {
    console.log('hi');
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    alignItems: 'stretch'
  }
});

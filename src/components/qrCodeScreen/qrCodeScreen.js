import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Vibration
} from 'react-native';
import Button from '../../common/button';
import Camera from 'react-native-camera';

export default class QrCodeScreen extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    this.barCodeFlag = true;
    return (
      <Camera 
        onBarCodeRead={ this.onBarCodeRead.bind(this) } 
        style={ styles.camera }
        >
        <View style={ styles.rectangleContainer }>
          <View style={ styles.rectangle }/>
        </View>
         <Button 
          text={ 'Cancel' } 
          onPress={ this.handleQRCapturePress.bind(this) }
          />
      </Camera>
    );
  }

  onBarCodeRead(result) {
    if (this.barCodeFlag) {
      this.barCodeFlag = false;
      this.props.navigator.pop();
      this.props.onSucess(JSON.parse(result.data));
    }
  }

  handleQRCapturePress() {
    this.props.navigator.pop();
    console.log('hihi clicked');
  }
}

const styles = StyleSheet.create({
  camera: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  qrCancel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  }
});

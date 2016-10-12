import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
import Panel from './components/panel';
import QRCodeScreen from './components/qrCodeScreen';
import API from './api.js';

export default class Main extends Component {
 constructor(props) {
   super(props)
    this.state = {
      serverUrl: '203.69.6.129',
      agentID: '100',
      agentTheme: '無路播場景',
      agentState: '無路播狀態',
      // agentState: 'Online',
      // agentState: 'Pause',
      // agentState: 'Capturing',
      // agentState: 'Shutdown',
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          />
        <View style={ styles.header }>
          <Image 
            style={ styles.logo } 
            source={ require('./assets/logo.png') }/>
          <Text style={ styles.agentTheme }>場景: { this.state.agentTheme }</Text>
          <Text style={ styles.agentState }>狀態: { this.state.agentState }</Text>
        </View>
        <View style={ styles.panel }>
          <Panel 
            agentTheme={ this.state.agentTheme } 
            serverUrl={ this.state.serverUrl }
            agentID={ this.state.agentID }
            agentState={ this.state.agentState }/>
        </View>
        <View style={ styles.capture }>
          <TouchableHighlight 
            style={styles.qrCaptureDiv}
            underlayColor="gray"
            onPress={ this.handleQRCapturePress.bind(this) }
            >
            <Image style={styles.qrCaptureImage} source={require('./assets/qrcode.png')}/>
          </TouchableHighlight>
          <Text style={ styles.qrCaptureInfo }>按下並掃描QR Code.</Text>
        </View>
      </View>
    );
  }

  handleQRCapturePress() {
    console.log('handleQRCapture press')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#63c9d7',
    marginTop: 20,
    alignItems: 'center'
  },
  panel: {
    flex: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  capture: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qrCaptureDiv: {
    flex: 2,
    justifyContent: 'center',
  },
  qrCaptureImage: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    alignItems: 'stretch'
  },
  qrCaptureInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    borderWidth: 2,
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#5cb85c'
  },
  pauseButton: {
    borderColor: '#f0ad4e'
  },
  resumeButton: {
    borderColor: '#5cb85c'
  },
  stopButton: {
    borderColor: '#d9534f'
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    width: 40,
    height: 40,
    marginLeft: 10
  },
  agentTheme: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30
  },
  agentState: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

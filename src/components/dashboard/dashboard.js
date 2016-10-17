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
import Panel from '../panel';
import QRCodeScreen from '../qrCodeScreen/qrCodeScreen';
import API from '../../api.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      serverUrl: '',
      agentID: '',
      agentTheme: '無錄播場景',
      agentThemeId: '',
      agentState: '無錄播狀態',
      agentName: ''
    }
    setInterval(() => {
      if (this.state.agentID) {
        this.getAgentState();
      }
    }, 10000);
  }

  render() {
    let panelAgentName;
    if (this.state.agentName) {
      panelAgentName = <Text style={ styles.panelAgentText }>錄播主機名稱: { this.state.agentName }</Text>;
    }
    return (
      <View style={ styles.container }>
        <StatusBar
          backgroundColor="#63c9d7"
          barStyle="light-content"
          />
        <View style={ styles.header }>
          <Image 
            style={ styles.logo } 
            source={ require('../../assets/logo.png') }/>
          <Text style={ styles.agentTheme }>場景: { this.state.agentTheme }</Text>
          <Text style={ styles.agentState }>狀態: { this.state.agentState }</Text>
        </View>
        <View  style={ styles.panelAgentName }>
          { panelAgentName }
        </View>
        <View style={ styles.panel }>
         
          <Panel 
            agentTheme={ this.state.agentTheme } 
            serverUrl={ this.state.serverUrl }
            agentID={ this.state.agentID }
            agentState={ this.state.agentState }
            onPanelButtonClickSuccess={ this.handlePanelButtonClickSuccess.bind(this) }/>
        </View>
        <View style={ styles.capture }>
          <TouchableHighlight 
            style={styles.qrCaptureDiv}
            underlayColor="gray"
            onPress={ this.handleQRCapturePress.bind(this) }
            >
            <Image style={styles.qrCaptureImage} source={require('../../assets/qrcode.png')}/>
          </TouchableHighlight>
          <Text style={ styles.qrCaptureInfo }>按下並掃描QR Code.</Text>
        </View>
      </View>
    );
  }

  handleQRCapturePress() {
    this.props.navigator.push({
        name: 'qrCodeScreen',
        passProps: {
          onSucess: this.onQrSucess.bind(this),
        }
      });
  }

  handlePanelButtonClickSuccess() {
    this.getAgentState();
  }

  onQrSucess(result) {
    if (result.serverUrl && result.id && result.scenesName && result.scenesNum) {
      this.setState({
        serverUrl: result.serverUrl,
        agentID: result.id,
        agentTheme: result.scenesName,
        agentThemeId: result.scenesNum
      });
      this.setTheme();
      this.getAgentState();
    }
  }

  setTheme() {
    let changeScenesByIdUrl = `http://${this.state.serverUrl}/${API.changeScenesById}?id=${this.state.agentID}&scenesNum=${this.state.agentThemeId}`;
    fetch(changeScenesByIdUrl).then((response) => {
      return response.json();
    }).then((json) => {
      console.log('changeScenesByIdUrl', json);
    })
  }

  getAgentState() {
    console.log('getAgentState');
    let agentSearchByIdUrl = `http://${this.state.serverUrl}/${API.agentSearchById}?id=${this.state.agentID}`;
    fetch(agentSearchByIdUrl).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.info == 'SUCCESS') {
        this.setState({
          agentState: json.data[0].status,
          agentName: json.data[0].name
        });
      }
    })
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
    alignItems: 'center'
  },
  panelAgentName: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  panelAgentText: {
    fontSize: 18
  },
  panel: {
    flex: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  capture: {
    flex: 9,
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

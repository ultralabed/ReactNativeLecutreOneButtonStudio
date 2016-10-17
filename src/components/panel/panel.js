import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import API from '../../api.js';

const AGENTSTATE = {
  ONLINE: 'Online',
  PAUSE: 'Pause',
  CAPTURING: 'Capturing',
  SHUTDOWN: 'Shutdown',
}

export default class Panel extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let viewState1, viewState2;
    let start = (
      <TouchableHighlight 
          underlayColor="gray"
          onPress={ this.handleStartPress.bind(this) }
          style={ [styles.button, styles.startButton] }
          >
          <Text>
            錄影
          </Text>
      </TouchableHighlight>
    );
    let pause = (
      <TouchableHighlight 
          underlayColor="gray"
          onPress={ this.handlePausePress.bind(this) }
          style={ [styles.button, styles.pauseButton] }
          >
          <Text>
            暫停
          </Text>
        </TouchableHighlight>
    );
    let resume = (
      <TouchableHighlight 
        underlayColor="gray"
        onPress={ this.handleResumePress.bind(this) }
        style={ [styles.button, styles.resumeButton] }
        >
        <Text>
          繼續
        </Text>
      </TouchableHighlight>
    );
    let stop = (
      <TouchableHighlight 
        underlayColor="gray"
        onPress={ this.handleStopPress.bind(this) }
        style={ [styles.button, styles.stopButton] }
        >
        <Text>
          停止
        </Text>
      </TouchableHighlight>
    );
    if (this.props.agentState == '無錄播狀態') {
      viewState1 = (<Text> 請使用 QR Code 掃瞄器掃描場景。 </Text>);
    } else if (this.props.agentState == AGENTSTATE.ONLINE) {
      viewState1 = start;
      viewState2 = stop;
    } else if (this.props.agentState == AGENTSTATE.PAUSE) {
      viewState1 = resume;
      viewState2 = stop;
    } else if (this.props.agentState == AGENTSTATE.CAPTURING) {
      viewState1 = pause;
      viewState2 = stop;
    } else if (this.props.agentState == AGENTSTATE.SHUTDOWN) {
      viewState1 = (<Text> 錄播主機未開機或攝影機關閉。 </Text>);
    }
    return (
      <View style={ styles.container }>
        {viewState1}
        {viewState2}
      </View>
    );
  }

  handleStartPress() {
    let url = `http://${this.props.serverUrl}/${API.startCaptureById}?id=${this.props.agentID}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.props.onPanelButtonClickSuccess();
    })
  }

  handlePausePress() {
    let url = `http://${this.props.serverUrl}/${API.pauseCaptureById}?id=${this.props.agentID}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.props.onPanelButtonClickSuccess();
    })
  }

  handleResumePress() {
    let url = `http://${this.props.serverUrl}/${API.resumeCaptureById}?id=${this.props.agentID}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.props.onPanelButtonClickSuccess();
    })
  }

  handleStopPress() {
    let url = `http://${this.props.serverUrl}/${API.stopCaptureById}?id=${this.props.agentID}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((json) => {
      this.props.onPanelButtonClickSuccess();
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
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
  init: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

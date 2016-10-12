import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

export default class styles {
  return  (StyleSheet.create({
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
}))
} 
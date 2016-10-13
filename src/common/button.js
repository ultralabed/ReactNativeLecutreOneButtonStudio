import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

module.exports = React.createClass({
  render: function() {
    return (
      <TouchableHighlight 
        style={ styles.button }
        underlayColor={ 'gray' }
        onPress={ this.props.onPress }
        >
        <Text style={ styles.buttonText }>{ this.props.text }</Text>
      </TouchableHighlight>
    );
  }
});

let styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    marginBottom: 50
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  }
});

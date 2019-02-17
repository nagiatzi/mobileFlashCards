import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { addNewDeck } from '../actions/Deck';

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add New Deck',
    headerStyle: {
      backgroundColor: 'white',
      height:40,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    text:''
  }

  handlePress = () => {
    const questionId = this.state.text
    this.props.dispatch(addNewDeck(this.state.text))
     .then(() => {
       this.props.navigation.navigate('DeckDetail', { questionId });
     })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of the new deck?</Text>
        <TextInput
          style={styles.textInput}
          selectionColor={"black"}
          placeholder="Deck Title"
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress()}>
          <Text style={styles.btnText}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1
  },
  question: {
    textAlign:"center",
    fontSize:35,
    color: 'grey'
  },
  textInput: {
    height:100,
    borderWidth: 2,
    textAlign:"center",
    fontSize:40,
    color: 'grey',
    marginTop: 30,
    marginLeft: 7,
    marginRight: 7,
  },
  btn: {
    alignItems:"center",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'blue',
    borderBottomWidth: 1,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 50,
    backgroundColor: 'white',
    height:50
  },
  btnText: {
    fontSize:30,
    color:'blue',
  }
});

export default withNavigation(connect()(AddDeck));

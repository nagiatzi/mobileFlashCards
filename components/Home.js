import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView} from 'react-native';
import { connect } from 'react-redux'
import * as APIclient from '../utils/api'
import { handleInitialData } from '../actions/InitialData'
import Deck from './Deck'

class Home extends Component {
  static navigationOptions = {
    title: 'Mobile Flash Cards App',
    headerStyle: {
      backgroundColor: 'cornflowerblue',
      color: 'white',
      height:40,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignSelf:'center'
    },
  };

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { questionIds, questions} = this.props
    return (
      <ScrollView>
        {questionIds.map((id) => (
          <Deck
            questionId={id}
            key={id}
            />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  deck: {
    marginTop: 20,
    marginBottom: 20,
    color:'black',
  }
});

function mapStateToProps (questions) {
  const questionIds = Object.keys(questions)
  return {
    questions,
    questionIds
  }
}

export default connect(mapStateToProps)(Home)

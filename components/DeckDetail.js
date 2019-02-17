import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { deleteDeck } from '../actions/Deck';

class DeckDetail extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'white',
      height:40,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  handlePress = (button, questionId) => {
    switch(button) {
      case 'Add Card':
        this.props.navigation.navigate('AddCard', { questionId });
        break
      case 'Start Quiz':
        this.props.navigation.navigate('Quiz', { questionId });
        break
      case 'Delete Deck':
        this.props.dispatch(deleteDeck(questionId))
          this.props.navigation.navigate('Home');
        break
      default:
        return
    }
  }

  render() {
    const questionId = this.props.navigation.getParam('questionId', 'NO-ID');
    const { questions } = this.props
    return (
      <View>
        <Text style={styles.question}>{questionId}</Text>
        <Text style={styles.cards}>{ questions[questionId].questions.length } Cards </Text>
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress('Add Card', questionId)}>
          <Text style={styles.btnText}>
            Add Card
          </Text>
        </TouchableOpacity>
        { questions[questionId].questions.length > 0 && (
          <TouchableOpacity style={styles.btn} onPress={() => this.handlePress('Start Quiz', questionId)}>
            <Text style={styles.btnText}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress('Delete Deck', questionId)}>
          <Text style={styles.btnText}>
            Delete Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    marginTop:100,
    textAlign:"center",
    fontSize:40,
    color: 'black'
  },
  cards: {
    textAlign:"center",
    fontSize:20,
    color: 'grey'
  },
  btn: {
    alignItems:"center",
    borderWidth: 1,
    borderRadius: 2,
    borderBottomWidth: 1,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: 'white',
    height:50
  },
  btnText: {
    fontSize:30,
    color:'black',
  }
});

function mapStateToProps (questions) {
  return {
    questions,
  }
}

export default withNavigation(connect(mapStateToProps)(DeckDetail));

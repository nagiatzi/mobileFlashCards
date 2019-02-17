import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { setLocalNotification } from '../utils/helpers';

class QuizResults extends React.Component {
  static navigationOptions = {
    title: `Quiz Results`,
    headerStyle: {
      backgroundColor: 'white',
      height:40,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  componentDidMount() {
    setLocalNotification()
  }

  getPercentage = (correctAnswers, total) => {
    return (correctAnswers / total) * 100
  }

  handlePress = (action, questionId) => {
    switch(action) {
      case 'Restart Quiz':
        this.props.navigation.navigate('Quiz', { questionId });
        break
      case 'Go to Deck':
        this.props.navigation.navigate('DeckDetail', {
                 questionId
               });
        break
      default:
        return
    }
  }

  render() {
    const { totalQuestions, correctQuestions, questionId } = this.props
    return (
      <View>
        <Text style={styles.deck}>{questionId}</Text>
        <Text style={styles.result}>You obtained {Math.trunc(this.getPercentage(correctQuestions, totalQuestions))} %</Text>
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress('Restart Quiz', questionId)}>
          <Text style={styles.btnText}>
            Restart Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress('Go to Deck', questionId)}>
          <Text style={styles.btnText}>
            Back to Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps (questions) {
  return {
    questions,
  }
}

const styles = StyleSheet.create({
  deck: {
    marginTop:100,
    textAlign:"center",
    fontSize:40,
    color: 'black'
  },
  result: {
    textAlign:"center",
    fontSize:20,
    color: 'green'
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

export default withNavigation(connect(mapStateToProps)(QuizResults));

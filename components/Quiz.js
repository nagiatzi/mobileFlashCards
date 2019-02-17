import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import QuizResults from './QuizResults';

class Quiz extends React.Component {
  static navigationOptions = {
    title: `Quiz`,
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
    totalQuestions: 0,
    counter: 0,
    correctAnswers: 0,
    showAnswer: false
  }

  componentDidMount() {
    this.setState({
      totalQuestions: this.props.questions[this.props.navigation.getParam('questionId','NO-ID')].questions.length,
    })
  }

  showAnswer = () => {
    this.setState({
      showAnswer: true
    })
  }

  resetCounter = () => {
    this.setState({
      counter: 0,
      correctAnswers: 0,
      showAnswer: false
    })
  }

  checkAnswer = (answer) => {
    switch(answer) {
      case 'correct':
        this.setState({
          counter: this.state.counter + 1,
          correctAnswers: this.state.correctAnswers + 1,
          showAnswer: false
        })
        break
      case 'incorrect':
        this.setState({
          counter: this.state.counter + 1,
          showAnswer: false
        })
        break
      default:
        break
    }
  }

  componentWillReceiveProps() {
    this.resetCounter();
  }

  render() {
    const questionId = this.props.navigation.getParam('questionId', 'NO-ID');
    const { questions } = this.props
    if (this.state.counter === this.state.totalQuestions) {
      return (
        <QuizResults
          totalQuestions={this.state.totalQuestions}
          correctQuestions={this.state.correctAnswers}
          questionId={questionId}
          />
      )
    }

    return (
      <View>
        {(!this.state.showAnswer)
          ?
          <View>
            <Text style={styles.question}>{questions[questionId].questions[this.state.counter].question}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => this.showAnswer()}>
                <Text style={styles.btnText}>
                  Show Answer
                </Text>
              </TouchableOpacity>
          </View>
          :
          <View>
            <Text style={styles.question}>{questions[questionId].questions[this.state.counter].answer}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => this.checkAnswer('correct')}>
              <Text style={styles.btnText}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.checkAnswer('incorrect', questionId)}>
              <Text style={styles.btnText}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  question: {
    marginTop:80,
    textAlign:"center",
    fontSize:25,
    color: 'black',
    paddingLeft: 3,
    paddingRight: 3	
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

export default withNavigation(connect(mapStateToProps)(Quiz));

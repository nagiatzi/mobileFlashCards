import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { addNewCard } from '../actions/Card';

class AddCard extends React.Component {
  static navigationOptions = {
    title: `Add Card`,
    headerStyle: {
      backgroundColor: 'white',
      height:40,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  state = {
    question:'',
    answer:''
  }

  createQuestionObject = (question, answer) => {
    return {
      question,
      answer
    }
  }

  handlePress = (questionId) => {
    const question = this.createQuestionObject(this.state.question, this.state.answer)
    this.props.dispatch(addNewCard(questionId, question))
    this.props.navigation.navigate('DeckDetail', { questionId });
  }

  render() {
    const questionId = this.props.navigation.getParam('questionId', 'NO-ID');
    const { questions } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          selectionColor={"black"}
          placeholder="Add Question"
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={styles.textInput}
          selectionColor={"black"}
          placeholder="Add Answer"
          onChangeText={(answer) => this.setState({answer})}
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.handlePress(questionId)}>
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
    marginTop: 24,
    flex: 1,
  },
  question: {
    textAlign:"center",
    fontSize:40,
    color: 'grey'
  },
  textInput: {
    height:100,
    borderWidth: 2,
    textAlign:"center",
    fontSize:20,
    color: 'grey',
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  btn: {
    alignItems:"center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'blue',
    borderBottomWidth: 1,
    shadowColor: 'blue',
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

function mapStateToProps (questions) {
  return {
    questions,
  }
}

export default withNavigation(connect(mapStateToProps)(AddCard));

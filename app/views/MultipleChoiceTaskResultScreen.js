import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, Button, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class MultipleChoiceTaskResultScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    const result = this.props.navigation.getParam('result', []);
    const task = this.props.model.tasks[this.props.currentTask];
    const correctlySelected = result.filter(code => task.correctAnswers.includes(code));
    const wronglySelected = result.filter(code => !task.correctAnswers.includes(code));
    const wronglyLeft = task.correctAnswers.filter(elem => !result.includes(elem));

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Elementos correctamente seleccionados</Text>
        <ScrollView>
          {correctlySelected.map((item, index) => <Text key={index}>{task.options.find(elem => elem.code == item).text}</Text>)}
        </ScrollView>
        <Text style={styles.text}>Elementos incorrectamente seleccionados</Text>
        <ScrollView>
          {wronglySelected.map((item, index) => <Text key={index}>{task.options.find(elem => elem.code == item).text}</Text>)}
        </ScrollView>
        <Text style={styles.text}>Elementos que debían ser seleccionados</Text>
        <ScrollView>
          {wronglyLeft.map((item, index) => <Text key={index}>{task.options.find(elem => elem.code == item).text}</Text>)}
        </ScrollView>
        <Button
          title="Continuar"
          onPress={() => {
            this.props.navigation.navigate('TaskResult', {"answer": result});
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});

const mapStateToProps = state => {
  const { model, currentTask } = state;
  return { model, currentTask };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleChoiceTaskResultScreen);

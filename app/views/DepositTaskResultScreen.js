import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, Button, BackHandler } from 'react-native';
import { nextTask } from '../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';

class DepositTaskResultScreen extends Component {
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
    const collectTasks = this.props.model.tasks.filter(task => task.type == "collect");
    const collectElements = collectTasks.map(task => task.elements).flat();
    const thisDepositElements = collectElements.filter(elem => elem.deposits == task.code).map(elem => elem.code);
    const correctlyDeposited = result.filter(code => thisDepositElements.includes(code));
    const wronglyDeposited = result.filter(code => !thisDepositElements.includes(code));

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Elementos correctamente depositados</Text>
        <ScrollView>
          {correctlyDeposited.map((item, index) => <Text key={index}>{collectElements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Text style={styles.text}>Elementos incorrectamente depositados</Text>
        <ScrollView>
          {wronglyDeposited.map((item, index) => <Text key={index}>{collectElements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Button
          title="Continuar"
          onPress={() => {
            this.props.navigation.navigate('TaskResult');
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
      nextTask,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepositTaskResultScreen);

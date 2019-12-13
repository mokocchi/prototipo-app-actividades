import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  StyleSheet,
  Button,
  BackHandler,
  TextInput,
} from 'react-native';
import { setTaskResult } from '../redux/actions';

class TextInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  constructor(props) {
    super(props);
    const task = this.props.model.tasks[this.props.currentTask];
    const result = this.props.taskResults.find((item)=>task.code==item.code);
    this.state = {
      text: result != null? result.result : ''
    }
  }

  render() {
    const task = this.props.model.tasks[this.props.currentTask];
    const number = task.type == "numberInput";
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>
        <TextInput placeholder={number?"Ingresa el número":"Ingresa texto"} keyboardType={number?"decimal-pad":"default"} onChangeText={(text) => this.setState({ text })} value={this.state.text}></TextInput>
        <Button
          title="Continuar"
          onPress={() => {
            if(this.state.text!='') {
              this.props.setTaskResult(task.code, this.state.text, task.type);
            }            
            this.props.navigation.navigate("TaskResult");
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
  const { model, currentTask, taskResults } = state;
  return { model, currentTask, taskResults };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTaskResult,
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextInputTaskScreen);

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
import NextTaskButtons from '../components/NextTaskButtons';
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Typography } from '../assets/styles';

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
    const result = this.props.taskResults.find((item) => task.code == item.code);
    this.state = {
      text: result != null ? result.result : ''
    }
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    const number = task.type == "numberInput";
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.text}><Icon name={number ? "calculator" : "font"} size={Typography.textSize} /> {task.instruction}</Text>
        <TextInput placeholder={number ? t("TextInputTask_001") : t("TextInputTask_002")} keyboardType={number ? "decimal-pad" : "default"} onChangeText={(text) => this.setState({ text })} value={this.state.text}></TextInput>
        <NextTaskButtons condition={this.state.text} setTaskResult={this.props.setTaskResult} navigate={this.props.navigation.navigate} task={task} result={this.state.text} />
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container
  },
  text: {
    ...text
  },
  title: {
    ...title
  }
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

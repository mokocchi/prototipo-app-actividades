import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';
import Select from '../components/Select';
import Header from '../components/Header';

class SelectInputTaskScreen extends Component {
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
    this.state = {
      value: ""
    };
  }

  render() {
    const t = this.props.screenProps.t;
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.instruction}</Text>
          <View>
            <Select items={task.elements} labelField="name" valueField="code" selectedValue={this.state.value}
              onChange={(itemValue) => this.setState({ value: itemValue })} placeholder={t("SelectInputTask_001")} />
          </View>

          <NextTaskButtons condition={this.state.value} result={this.state.value} task={task} answer={[this.state.value]}
            setTaskResult={this.props.setTaskResult} navigate={this.props.navigation.navigate} />
          
          <View />
        </View >
      </>
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
  const { model, currentTask } = state;
  return { model, currentTask };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTaskResult
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectInputTaskScreen);

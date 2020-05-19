import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler } from 'react-native';
import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';
import Header from '../components/Header';
import title from './styles/title';
import container from './styles/container';
import text from './styles/text';

class SimpleTaskScreen extends Component {
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
    t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.instruction}</Text>
          <NextTaskButtons condition={true} task={task} result={true}
            setTaskResult={this.props.setTaskResult} navigate={this.props.navigation.navigate} />
          <View />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...container
  },
  title: {
    ...title
  },
  text: {
    ...text
  },
});

const mapStateToProps = state => {
  const { model, currentTask } = state;
  return { model, currentTask };
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
)(SimpleTaskScreen);

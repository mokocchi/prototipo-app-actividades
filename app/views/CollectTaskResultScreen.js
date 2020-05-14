import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, Button, BackHandler } from 'react-native';
import { nextTask } from '../redux/actions';
import { ScrollView } from 'react-native-gesture-handler';

class CollectTaskResultScreen extends Component {
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
    const t = this.props.screenProps.t;
    const result = this.props.navigation.getParam('result', []);
    const task = this.props.model.tasks[this.props.currentTask];
    const correctlyCollected = result.filter(code => task.validElements.includes(code));
    const wronglyCollected = result.filter(code => !task.validElements.includes(code));
    const wronglyLeft = task.validElements.filter(elem => !result.includes(elem));

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t("CollectTaskResult_001")}</Text>
        <ScrollView>
          {correctlyCollected.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Text style={styles.text}>{t("CollectTaskResult_002")}</Text>
        <ScrollView>
          {wronglyCollected.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Text style={styles.text}>{t("CollectTaskResult_003")}</Text>
        <ScrollView>
          {wronglyLeft.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Button
          title={t("CollectTaskResult_004")}
          onPress={() => {
            this.props.navigation.navigate("TaskResult", {correct: (wronglyCollected.length + wronglyLeft.length) === 0});
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
)(CollectTaskResultScreen);

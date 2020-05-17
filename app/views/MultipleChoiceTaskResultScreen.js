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
    const t = this.props.screenProps.t;
    const result = this.props.navigation.getParam('result', []);
    const task = this.props.model.tasks[this.props.currentTask];
    const correctlySelected = result.filter(code => task.validElements.includes(code));
    const wronglySelected = result.filter(code => !task.validElements.includes(code));
    const wronglyLeft = task.validElements.filter(elem => !result.includes(elem));

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t("MultipleChoiceTaskResult_001")}</Text>
        <ScrollView>
          {correctlySelected.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
    <Text style={styles.text}>{t("MultipleChoiceTaskResult_002")}</Text>
        <ScrollView>
          {wronglySelected.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Text style={styles.text}>{t("MultipleChoiceTaskResult_003")}</Text>
        <ScrollView>
          {wronglyLeft.map((item, index) => <Text key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
        </ScrollView>
        <Button
          title={t("MultipleChoiceTaskResult_004")}
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

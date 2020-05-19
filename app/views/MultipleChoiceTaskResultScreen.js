import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, ScrollView } from 'react-native';
import Button from '../components/Button';
import container from './styles/container';
import text from './styles/text';
import subtitle from './styles/subtitle';
import title from './styles/title';
import Header from '../components/Header';

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
      <>
        <Header />
        <View style={styles.container}>
          <ScrollView scrollEnabled>
            <Text style={styles.subtitle}>{t("MultipleChoiceTaskResult_001")}</Text>
            <ScrollView>
              {correctlySelected.map((item, index) => <Text style={styles.text} key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
            </ScrollView>
            <Text style={styles.subtitle}>{t("MultipleChoiceTaskResult_002")}</Text>
            <ScrollView>
              {wronglySelected.map((item, index) => <Text style={styles.text} key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
            </ScrollView>
            <Text style={styles.subtitle}>{t("MultipleChoiceTaskResult_003")}</Text>
            <ScrollView>
              {wronglyLeft.map((item, index) => <Text style={styles.text} key={index}>{task.elements.find(elem => elem.code == item).name}</Text>)}
            </ScrollView>
          </ScrollView>
          <Button
            title={t("MultipleChoiceTaskResult_004")}
            onPress={() => {
              this.props.navigation.navigate('TaskResult', { "answer": result, correct: (wronglySelected.length + wronglyLeft.length) === 0 });
            }}></Button>
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
  text: {
    ...text
  },
  subtitle: {
    ...subtitle
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

    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleChoiceTaskResultScreen);

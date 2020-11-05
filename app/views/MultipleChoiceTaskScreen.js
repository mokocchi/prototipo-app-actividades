import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { setTaskResult } from '../redux/actions';
import SkipTaskButton from '../components/SkipTaskButton';
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';
import Header from '../components/Header';
import Button from '../components/Button';

class MultipleChoiceTaskScreen extends Component {
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
    const checked = props.model.tasks[props.currentTask].elements.map(item => false);
    this.state = {
      checked: checked,
    };
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        <ScrollView>
          {task.elements.map((element, index) => (
            <ListItem
              key={index}
              title={element.name}
              bottomDivider
              checkBox={{
                checkedColor: 'green',
                uncheckedColor: 'red',
                checked: this.state.checked[index],
                onPress: () =>
                  this.setState(state => {
                    const checked = state.checked.map((item, j) => {
                      if (j == index) {
                        return !item;
                      } else {
                        return item;
                      }
                    });
                    return {
                      checked,
                    };
                  }),
              }}
              onPress={() =>
                this.setState(state => {
                  const checked = state.checked.map((item, j) => {
                    if (j == index) {
                      return !item;
                    } else {
                      return item;
                    }
                  });
                  return {
                    checked,
                  };
                })
              }
            />
          ))}
        </ScrollView>

        <Button
          title={t("MultipleChoiceTask_001")}
          onPress={() => {
            var result = task.elements.filter((item, index) => this.state.checked[index]).map(item => item.code);
            this.props.setTaskResult(task.code, result, task.type);
            if (task.validElements) {
              this.props.navigation.navigate('MultipleChoiceTaskResult', { result: result });
            } else {
              this.props.navigation.navigate("TaskResult", { "answer": result });
            }
          }}></Button>
        <SkipTaskButton navigate={this.props.navigation.navigate} optional={task.optional} />
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
)(MultipleChoiceTaskScreen);

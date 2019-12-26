import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Image, StyleSheet, Button, BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

class ResultByScoreScreen extends Component {
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
    var total = 0;
    const resultRows = result.map((element, index) => {
      const value = task.byScore[0].scores[Object.keys(element)[0]] *
        Object.values(result.find(item => Object.keys(item)[0] == Object.keys(element)[0]))[0];
      total += value;
      return (<Text style={styles.text} key={index}>
        {task.elements.find(item => {
          return item.code == Object.keys(element)[0];
        }).name}
        : {value}
      </Text>);
    });
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.byScore[0].name}</Text>
        <Text style={styles.text}>{task.byScore[0].message}</Text>
        <Text style={styles.text}>{t("ResultByScore_001")} {total}</Text>
        <View style={{flex:0.2}}></View>
        <ScrollView>
          {resultRows}
        </ScrollView>
        <Button
          title={t("ResultByScore_002")}
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
  const {model, currentTask} = state;
  return {model, currentTask};
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
)(ResultByScoreScreen);

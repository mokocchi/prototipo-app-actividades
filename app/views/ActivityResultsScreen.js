import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, ScrollView } from 'react-native';

class ActivityResultsScreen extends Component {
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
    let { t, locale } = this.props.screenProps;
    const activity = this.props.model.educationalActivity;
    const taskResults = this.props.taskResults;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{activity.name}</Text>
        <Text style={styles.text}>{activity.goal}</Text>
        <ScrollView>
          {
            taskResults.map((item, index) =>
            <View key={index}>
                <Text>{t("ActivityResults_001")} {this.props.model.tasks.find(task => task.code == item.code).name}</Text>
                <Text>{t("ActivityResults_002")}</Text>
                <Text>
                  {JSON.stringify(item.result, undefined, 2)}
                </Text>
                <Text></Text>
              </View>             
            )}
        </ScrollView>
        <Button
          title={t("ActivityResults_003")}
          onPress={() => {
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
  const { model, taskResults } = state;
  return { model, taskResults };
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
)(ActivityResultsScreen);

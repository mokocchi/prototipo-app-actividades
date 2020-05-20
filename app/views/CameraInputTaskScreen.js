import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, Image, StyleSheet, BackHandler, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';
import Button from '../components/Button';
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';
import Header from '../components/Header';

class CameraInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  handleTakePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    })
  }

  constructor(props) {
    super(props);
    const task = this.props.model.tasks[this.props.currentTask];
    const result = this.props.taskResults.find((item) => task.code == item.code);
    if (result != null) { console.log(result.result.uri); }

    this.state = {
      photo: result == null ? null : result.result,
    }

  }

  render() {
    const t = this.props.screenProps.t;
    const { photo } = this.state;
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.instruction}</Text>
          {photo == null ?
            (<Button title={t("CameraInputTask_001")} onPress={this.handleTakePhoto} />)
            : (
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300, alignSelf: "center" }}
              />
            )}
          <NextTaskButtons condition={photo} task={task} result={photo}
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
      setTaskResult
    },
    dispatch,
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraInputTaskScreen);

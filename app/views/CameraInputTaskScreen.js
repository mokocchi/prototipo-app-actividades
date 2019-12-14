import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Image, StyleSheet, Button, BackHandler, TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker'
import {setTaskResult} from '../redux/actions';

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
    const result = this.props.taskResults.find((item)=>task.code==item.code);
    if(result!=null){console.log(result.result.uri);}
    
    this.state = {
      photo: result == null? null : result.result,
    }
  
  }

  render() {
    const t = this.props.screenProps.t;
    const { photo } = this.state;
    const activity = this.props.model.educationalActivity;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>
        { photo == null ?  
          (<Button title={t("CameraInputTask_001")} onPress={this.handleTakePhoto} />)
          : (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300, alignSelf: "center" }}
          />
        )}
        <Button
          title={t("CameraInputTask_002")}
          onPress={() => {
            if(photo){
              this.props.setTaskResult(task.code, photo, task.type)
            }
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
  const {model, currentTask, taskResults} = state;
  return {model, currentTask, taskResults};
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

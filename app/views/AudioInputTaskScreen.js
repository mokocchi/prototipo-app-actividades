import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, Button, PermissionsAndroid } from 'react-native';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';

import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';

const filename = "audio.mp4";

class AudioInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this._requestRecordAudioPermission();
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
      playPauseButton: t("AudioInputTask_003"),
      recordButton: t("AudioInputTask_002"),

      playing: false,
      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: false,

      error: null
    };
  }

  _toggleRecord() {
    if (this.rec && this.rec.isRecording) {
      this.rec.stop((err) => {
        if (err) {
          console.log(err)
          this.setState({
            error: err.message
          })
          return;
        }
        this.setState({
          recordButton: t("AudioInputTask_002"),
          playButtonDisabled: false,
        });
      });
      this.player = new Player(filename);
    } else {
      this.rec = new Recorder(filename).record();
      this.setState({ recordButton: t("AudioInputTask_005"), playButtonDisabled: true, stopButtonDisabled: true });
    }
  }

  _playPause() {
    this.player.prepare();
    console.log(this.rec.fsPath)
    this.setState({ stopButtonDisabled: false, recordButtonDisabled: true, playPauseButton: t("AudioInputTask_006"), playButtonDisabled: true, filePath: this.rec.fsPath })
    this.player.play(() => {
      this.setState({
        playing: true
      })
    })
      .on('ended', () => {
        this.setState({ stopButtonDisabled: true, recordButtonDisabled: false, playPauseButton: t("AudioInputTask_003"), playButtonDisabled: false });
      });
  }

  _stop() {
    this.player.stop(() => {
      this.setState({
        playPauseButton: t("AudioInputTask_003"),
        recordButtonDisabled: false,
        playButtonDisabled: false,
        playing: false
      });
      this.player.seek(0);
    });
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  render() {
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        <View>
          <Button title={this.state.recordButton} disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()} />
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.buttonContainer}>
            <Button title={this.state.playPauseButton} disabled={this.state.playButtonDisabled} onPress={() => this._playPause()} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={t("AudioInputTask_004")} disabled={this.state.stopButtonDisabled} onPress={() => this._stop()} />
          </View>
        </View>


        <NextTaskButtons condition={this.state.filePath} result={this.state.filePath} task={task}
          navigate={this.props.navigation.navigate} setTaskResult={this.props.setTaskResult} />
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
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
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
)(AudioInputTaskScreen);

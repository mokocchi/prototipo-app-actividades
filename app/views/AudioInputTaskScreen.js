import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, BackHandler, PermissionsAndroid } from 'react-native';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';

import { setTaskResult } from '../redux/actions';
import NextTaskButtons from '../components/NextTaskButtons';
import Header from '../components/Header';
import Button from '../components/Button'
import container from './styles/container';
import text from './styles/text';
import title from './styles/title';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Typography } from '../assets/styles';

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
      playPauseButtonIcon: false,
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
    this.setState({
      stopButtonDisabled: false,
      recordButtonDisabled: true,
      playPauseButton: "",
      playPauseButtonIcon: <Icon name="music" size={Typography.buttonFontSize} />,
      playButtonDisabled: true,
      filePath: this.rec.fsPath
    })
    this.player.play(() => {
      this.setState({
        playing: true
      })
    })
      .on('ended', () => {
        this.setState({ stopButtonDisabled: true, recordButtonDisabled: false, playPauseButton: t("AudioInputTask_003"), playPauseButtonIcon: null, playButtonDisabled: false });
      });
  }

  _stop() {
    this.player.stop(() => {
      this.setState({
        playPauseButton: t("AudioInputTask_003"),
        playPauseButtonIcon: null,
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
      <>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.text}>{task.instruction}</Text>

          <View>
            <Button title={this.state.recordButton} disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()} />
          </View>

          <View style={styles.flexContainer}>
            <View style={styles.buttonContainer}>
              <Button title={this.state.playPauseButton} icon={this.state.playPauseButtonIcon} disabled={this.state.playButtonDisabled} onPress={() => this._playPause()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title={t("AudioInputTask_004")} disabled={this.state.stopButtonDisabled} onPress={() => this._stop()} />
            </View>
          </View>


          <NextTaskButtons condition={this.state.filePath} result={this.state.filePath} task={task}
            navigate={this.props.navigation.navigate} setTaskResult={this.props.setTaskResult} />
          <View><Text /></View>
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

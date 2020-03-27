import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { setTaskResult } from '../redux/actions';
import MapView, { Marker } from 'react-native-maps';

class GPSInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.requestGPSPermission();
  }

  async requestGPSPermission() {
    t = this.props.screenProps.t;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: t("PositionedTask_001"),
          message: t("PositionedTask_002"),
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((pos) => {
          this.setState({
            location: pos, granted: true
          })
        },
          error => {
            Alert.alert('Error', JSON.stringify(error));
            Geolocation.getCurrentPosition((pos) => {
              this.setState({
                location: pos, granted: true,
                region: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0,
                }
              })
            }, null, { enableHighAccuracy: false })
          }
          ,
          { enableHighAccuracy: true, timeout: 30000 }
        );
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  constructor(props) {
    super(props);
    const task = this.props.model.tasks[this.props.currentTask];
    const result = this.props.taskResults.find((item) => task.code == item.code);
    if (result != null) { console.log(result.result.uri); }
    this.state = {
      granted: false,
      location: null,
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }
    }
    this.requestGPSPermission = this.requestGPSPermission.bind(this);
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>


        {this.state.granted ?
          <View>
            <Text>{JSON.stringify(this.state.location.coords)}</Text>
            <MapView
              provider={"google"}
              style={styles.map}
              scrollEnabled={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={false}
              initialRegion={this.state.region}
            >
              <Marker
                title="This is a title"
                description="This is a description"
                coordinate={this.state.region}
              />
            </MapView>
          </View>
          : <Text>Buscando ubicación...</Text>}


        <Button
          title={t("CameraInputTask_002")}
          onPress={() => {
            if (this.state.pos) {
              this.props.setTaskResult(task.code, this.state.location.coords, task.type)
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
  map: {
    width: 250,
    height: 250,
    alignSelf: "center"
  },
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
)(GPSInputTaskScreen);

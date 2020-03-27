import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { setTaskResult } from '../redux/actions';
import MapView, { Marker } from 'react-native-maps';

class GPSInputTaskScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }
  handlePress = () => {
    Alert.alert(
      'Se necesita usar el gps',
      'Tenés el GPS prendido?',
      [
        { text: 'No usar GPS', onPress: () => this.setState({ select: true }), style: 'cancel' },
        { text: 'Sí', onPress: () => this.requestGPSPermission() },
      ],
      { cancelable: false }
    )
    this.setState({
      read: true
    })
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
        try {
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
          },
            error => {
              console.log(error.message);
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
              }, null, { enableHighAccuracy: false, timeout: 5000 })
            }
            ,
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } catch (error) {
          console.log(error.message)
        }
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
      read: false,
      select: false,
      granted: false,
      location: null,
      coordinate: null,
      region: {
        latitude: -34.9036428,
        longitude: -57.9377245,
        latitudeDelta: 0.0025,
        longitudeDelta: 0,
      }
    }
    this.requestGPSPermission = this.requestGPSPermission.bind(this);
  }

  handleLongPress = (e) => {
    const region = e.nativeEvent.coordinate;
    region.latitudeDelta = 0.005;
    region.longitudeDelta = 0;
    this.setState({
      coordinate: region
    })
  }

  render() {
    const t = this.props.screenProps.t;
    const task = this.props.model.tasks[this.props.currentTask];
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.instruction}</Text>

        {!this.state.read && <Button title={"Obtener ubicación"} onPress={this.handlePress} />}
        {this.state.select && <Text>Tocá el mapa para elegir tu ubicación (presión larga marca el lugar)</Text>}
        {this.state.read && !this.state.select && !this.state.granted && <Text>Buscando ubicación...</Text>}
        <View>
          <MapView
            provider={"google"}
            style={styles.map}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={false}
            rotateEnabled={true}
            region={this.state.coordinate || this.state.region}
            initialRegion={this.state.region}
            onLongPress={this.handleLongPress}
          >
            <Marker
              title="Tu ubicación"
              coordinate={(this.state.select && this.state.coordinate) || this.state.region}
            />
          </MapView>
        </View>
        {this.state.read && !this.state.select && <Text>También podés ajustar la ubicación tocando el mapa</Text>}

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

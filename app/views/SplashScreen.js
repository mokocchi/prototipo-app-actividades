import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import * as RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadModel } from '../redux/actions'

class SplashScreen extends Component {
    loadJSON(that) {
        async function requestStoragePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': 'Permisos',
                    'message': 'Se necesita permiso para usar el almacenamiento'
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo2/configuracion/ConfiguracionPrototipo2.4.json').then(data => {
                        that.props.loadModel(JSON.parse(data));
                        that.props.navigation.navigate('Welcome');
                    })
                    .catch(err => {
                        console.log(err.message, err.code);
                    });
                } else {
                    console.log("permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        }
        requestStoragePermission()
    }
    componentDidMount () {
        this.loadJSON(this)
    }
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>Resuelvo Explorando</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    },
    text: {
        textAlign: "center",
        color: "white"
    }
})

const mapStateToProps = (state) => {
    const { model } = state
    return { model }
  };

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      loadModel,
    }, dispatch)
  );

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
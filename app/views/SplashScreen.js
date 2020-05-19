import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    PermissionsAndroid,
    ActivityIndicator
} from 'react-native';
import * as RNFS from 'react-native-fs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadModel } from '../redux/actions';
import * as Colors from '../assets/styles/colors'
import text from './styles/text';

class SplashScreen extends Component {
    loadJSON(that) {
        async function requestStoragePermission() {
            t = that.props.screenProps.t;
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': t("Splash_001"),
                    'message': t("Splash_002")
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    RNFS.readDir(RNFS.ExternalStorageDirectoryPath + '/Prototipo4/configuracion')
                        .then((result) => {
                            result = result.map((file) => file.name);
                            that.props.navigation.navigate("SelectFile", { files: result });
                        })
                } else {
                    console.log("permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        }
        requestStoragePermission()
    }
    componentDidMount() {
        this.loadJSON(this)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>DEHIA</Text>
                <ActivityIndicator/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: Colors.loadingBackground
    },
    text: {
        ...text,
        color: Colors.loadingText
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
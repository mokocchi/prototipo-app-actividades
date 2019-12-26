import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, Button, BackHandler, Picker, PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import { loadModel } from '../redux/actions';

class SelectFileScreen extends Component {
    loadJSON(that,t) {
        async function requestStoragePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': t("SelectFile_002"),
                    'message': t("SelectFile_003")
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const file = that.state.value;
                    RNFS.readFile(RNFS.ExternalStorageDirectoryPath + '/Prototipo3/configuracion/' + file).then(data => {
                        parsedJSON = JSON.parse(data);
                        that.props.loadModel(parsedJSON);
                        that.props.screenProps.setLocale(parsedJSON.language);
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
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true;
    }

    constructor(props) {
        super(props);
        const files = this.props.navigation.getParam("files", [])
        if (files.length > 0) {
            this.state = {
                value: files[0]
            };
        } else {
            this.state = "";
        }
    }

    render() {
        let { t } = this.props.screenProps;
        const files = this.props.navigation.getParam("files", [])
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{t("SelectFile_001")}</Text>
                <Text style={styles.text}>{t("SelectFile_004")}</Text>
                <View>
                    <Picker
                        selectedValue={this.state.value}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ value: itemValue })}
                    >
                        {files.map((file, index) =>
                            <Picker.Item key={index} label={file} value={file} />
                        )}
                    </Picker>
                    {
                        files.length > 0 ? null : <Text>{t("SelectFile_005")}</Text>
                    }
                </View>

                <Button
                    title={t("SelectFile_006")}
                    onPress={() => {
                        if (this.state.value != "") {
                            this.loadJSON(this, t);
                        }
                    }}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'skyblue',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
});

const mapStateToProps = state => {
    const { } = state;
    return {};
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            loadModel
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectFileScreen);

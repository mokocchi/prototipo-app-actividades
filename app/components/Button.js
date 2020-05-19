import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing, Typography } from '../assets/styles';

const AppButton = ({ title, onPress, disabled }) => (
    <Button title={title} titleStyle={styles.title} onPress={!disabled ? onPress : null}
        buttonStyle={[styles.button, disabled && styles.disabledButton]} />
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.buttonBackgroundColor,
        marginHorizontal: Spacing.buttonHorizontalMargin,
    },
    disabledButton: {
        backgroundColor: Colors.disabedButtonBackgroundColor
    },
    title: {
        color: Colors.buttonTextColor,
        fontSize: Typography.buttonFontSize
    }
})

export default AppButton;
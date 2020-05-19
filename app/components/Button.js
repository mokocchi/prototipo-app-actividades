import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing, Typography } from '../assets/styles';

const AppButton = ({ title, onPress, disabled, visited }) => (
    <Button title={title} titleStyle={styles.title} onPress={!disabled ? onPress : null}
        buttonStyle={[styles.button, disabled && styles.disabledButton, visited && styles.visitedButton]} />
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.buttonBackgroundColor,
        marginHorizontal: Spacing.buttonHorizontalMargin,
    },
    disabledButton: {
        opacity: 0.5
    },
    visitedButton: {
        backgroundColor: Colors.appSecondary
    },
    title: {
        color: Colors.buttonTextColor,
        fontSize: Typography.buttonFontSize
    },
})

export default AppButton;
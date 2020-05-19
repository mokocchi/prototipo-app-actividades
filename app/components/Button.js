import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing, Typography } from '../assets/styles';

const AppButton = ({ title, onPress }) => (
    <Button title={title} titleStyle={styles.title} onPress={onPress} buttonStyle={styles.button} />
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.buttonBackgroundColor,
        marginHorizontal: Spacing.buttonHorizontalMargin,
    },
    title: {
        color: Colors.buttonTextColor,
        fontSize: Typography.buttonFontSize
    }
})

export default AppButton;
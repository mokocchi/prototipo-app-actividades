import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../assets/styles';
import { appDark } from '../assets/styles/colors';

const AppButton = ({ title, onPress, disabled, variant, icon }) => (
    <Button icon={icon} title={title} titleStyle={styles.title}
        onPress={!disabled ? onPress : null}
        buttonStyle={[styles.button, disabled && styles.disabledButton, variant && styles.variantButton]} />
)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.buttonBackgroundColor,
        marginHorizontal: Spacing.buttonHorizontalMargin,
    },
    disabledButton: {
        opacity: 0.5
    },
    variantButton: {
        backgroundColor: appDark
    },
    title: {
        color: Colors.buttonTextColor,
        fontSize: Typography.buttonFontSize
    },
})

export default AppButton;
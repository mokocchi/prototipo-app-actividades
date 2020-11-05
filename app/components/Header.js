import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/styles';

const Header = () => (
    <View style={styles.header}>
        <Text style={styles.headerText}>DEHIA</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.headerBackground,
        paddingVertical: 10
    },
    headerText: {
        color: Colors.headerText,
        fontSize: 20,
        textAlign: "center"
    }
})

export default Header;
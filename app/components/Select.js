import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-community/picker';

const Select = ({ items, valueField, labelField, placeholder, onChange, noItemsText, selectedValue = "" }) => (
    <View style={styles.pickerContainer}>
        {
            items.length > 0 ?
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onChange}
                >
                    <Picker.Item key={-1} label={placeholder} value={""} />
                    {
                        items.map((item, index) =>
                            <Picker.Item key={index} label={item[labelField]} value={item[valueField]}/>
                        )
                    }
                </Picker>
                : <Text>{noItemsText}</Text>
        }
    </View>
)

const styles = StyleSheet.create({
    pickerContainer: {
        marginHorizontal: 30
    },
})

export default Select;
import React from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-community/picker';

const Select = ({ items, valueField, labelField, placeholder, onChange, noItemsText, selectedValue = "" }) => (
    <View>
        {
            items.length > 0 ?
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onChange}
                >
                    <Picker.Item key={-1} label={placeholder} value={""} />
                    {
                        items.map((item, index) =>
                            <Picker.Item key={index} label={item[labelField]} value={item[valueField]} />
                        )
                    }
                </Picker>
                : <Text>{noItemsText}</Text>
        }
    </View>
)

export default Select;
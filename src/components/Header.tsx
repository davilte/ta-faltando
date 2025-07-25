import React from 'react';
import { ImageBackground, ImageStyle, StyleProp, StyleSheet, View, Text, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: React.ReactNode;
}

export const Header = ({ style, className, children }: Props) => {


    return (
        <View className={`flex-row items-center h-16 mx-6 mt-4 ${className}`}>
            {children}
        </View>
    );
};
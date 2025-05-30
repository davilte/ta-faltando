import React from 'react';
import { ImageBackground, ImageStyle, StyleProp, StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: React.ReactNode;
}

const markers = [
    require('~/assets/images/marker1.png'),
    require('~/assets/images/marker2.png'),
    require('~/assets/images/marker3.png'),
];

export const DoodleMarker = ({ style, className, children }: Props) => {

    const randomIndex = Math.floor(Math.random() * markers.length);
    const randomMarker = markers[randomIndex];

    return (
        <ImageBackground
            source={randomMarker}
            resizeMode="stretch"
            className={`${className} self-center items-center px-2 py-1 w-full`}
            style={[style]}
        >
            {children}
        </ImageBackground>
    );
};
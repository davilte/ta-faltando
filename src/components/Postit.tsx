import React from 'react';
import { ImageBackground, ImageStyle, StyleProp, StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: React.ReactNode;
}

const postits = [
    require('~/src/assets/images/postit1.png'),
    require('~/src/assets/images/postit2.png'),
    require('~/src/assets/images/postit3.png'),
    require('~/src/assets/images/postit4.png'),

];

export const Postit = ({ style, className, children }: Props) => {

    const randomIndex = Math.floor(Math.random() * postits.length);
    const randomPostit = postits[randomIndex];

    return (
        <ImageBackground
            source={randomPostit}
            resizeMode="cover"
            className={`${className} aspect-[1] p-4`}
            style={[style]}
        >
            {children}
        </ImageBackground>
    );
};
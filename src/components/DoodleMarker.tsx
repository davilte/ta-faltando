import React from 'react';
import { ImageBackground, ImageStyle, StyleProp, StyleSheet, View, Text, ViewStyle } from 'react-native';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    align?: 'start' | 'center' | 'end';
    children?: React.ReactNode;
}

const markers = [
    require('~/src/assets/images/marker1.png'),
    require('~/src/assets/images/marker2.png'),
    require('~/src/assets/images/marker3.png'),
];

export const DoodleMarker = ({ style, className, align = 'start', children }: Props) => {

    const randomIndex = Math.floor(Math.random() * markers.length);
    const randomMarker = markers[randomIndex];

    const alignmentMap: Record<'start' | 'center' | 'end', 'flex-start' | 'center' | 'flex-end'> = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
    };

    return (
        <ImageBackground
            source={randomMarker}
            resizeMode="stretch"
            className={`${className} px-2 py-1`}
            style={[{ alignSelf: alignmentMap[align] }, style]}

        >
            {children}
        </ImageBackground>
    );
};
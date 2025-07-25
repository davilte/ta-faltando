import React from 'react';
import { ImageStyle, StyleProp, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    style?: StyleProp<ImageStyle>;
    className?: string;
  }
  

export const DoodleUnderline = ({ style, className }: Props) => {
    return (
        <Image
            source={require('~/src/assets/images/underline.png')}
            contentFit="contain"
            className={className}
            style={[styles.underline, style]}
        />
    );
};

const styles = StyleSheet.create({
    underline: {
        height: 5,
        width: '100%',
        marginTop: -5,
    },
});
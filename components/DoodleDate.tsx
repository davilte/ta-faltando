import React from 'react';
import { ImageBackground, ImageStyle, StyleProp, StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Image } from 'expo-image';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
}

export const DoodleDate = ({ style, className }: Props) => {
    const hoje = new Date();
    const dia = hoje.getDate().toString().padStart(2, '0');
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // meses são 0-indexados
    const ano = hoje.getFullYear().toString();
    return (
        <ImageBackground
            source={require('~/assets/images/date.png')}
            resizeMode="stretch"
            className={className}
            style={[{ width: 116, height: 24 }, style]}
        >
            <View className='flex-row w-full h-full justify-around items-center'>
                <Text className='text-xl ps-2 doodle'>{dia}</Text>
                <Text className='text-xl ps-2 doodle'>{mes}</Text>
                <Text className='text-xl ps-1 doodle'>{ano}</Text>
            </View>
        </ImageBackground>
    );
};
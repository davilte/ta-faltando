import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: React.ReactNode;
}

const NotebookLine = ({ style, className, children }: Props) => {
    return (
        <View className={`${className} h-16 w-full border-b border-gray-300 flex-row items-center`}
            style={[style]}>
            {children}
        </View>
    )
}

export default NotebookLine
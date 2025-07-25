import React from 'react';
import { View, Dimensions } from 'react-native';

export const NotebookBackground: React.FC = () => {
  const screenHeight = Dimensions.get('window').height;
  const lineSpacing = 50;
  const numberOfLines = Math.ceil(screenHeight / lineSpacing);
  const topOffset = 70;

  return (
    <View className="absolute inset-0 bg-white">
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <View
          key={index}
          className="absolute w-[90%] border-b border-gray-300 left-[5%]"
          style={{ top: index * lineSpacing + topOffset }}
        />
      ))}
    </View>
  );
};
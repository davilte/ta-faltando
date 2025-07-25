import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { ImageSourcePropType } from 'react-native';

type DoodleCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
  checkmarkImage?: ImageSourcePropType;
};

export const DoodleCheckbox = ({
  checked,
  onToggle,
  size = 24,
  className = '',
  checkmarkImage,
}: DoodleCheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`overflow-hidden items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        source={require('~/src/assets/images/doodle-checkbox.png')}
        contentFit="contain"
        style={{ width: size, height: size, position: 'absolute' }}
      />

      {checked && (
        checkmarkImage ? (
          <Image
            source={checkmarkImage}
            contentFit="contain"
            style={{ width: size * 0.6, height: size * 0.6 }}
          />
        ) : (
          <Text className="text-black text-lg font-bold">✓</Text>
        )
      )}
    </TouchableOpacity>
  );
}

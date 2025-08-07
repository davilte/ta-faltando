import React from 'react';
import { View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
    style?: StyleProp<ViewStyle>;
    className?: string;
    children?: React.ReactNode;
    onDelete: () => void;
}

const RightAction = ({
    progress,
    dragX,
    onDelete
}: {
    progress: SharedValue<number>;
    dragX: SharedValue<number>;
    onDelete: () => void;
}) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: dragX.value + 50 }],
    }));

    return (
        <Reanimated.View style={animatedStyle}>
            <TouchableOpacity onPress={onDelete}>
                <View className="w-[50px] h-[50px] bg-red-600 flex items-center justify-center">
                    <Text className="doodle-bold text-white">Excluir</Text>
                </View>
            </TouchableOpacity>
        </Reanimated.View>
    );
};

const SwipeToDelete = ({ style, className, children, onDelete }: Props) => {
    return (
        <View className={`${className}`} style={style}>
            <ReanimatedSwipeable
                containerStyle={{ alignItems: 'center' }}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={(progress, dragX) => (
                    <RightAction progress={progress} dragX={dragX} onDelete={onDelete} />
                )}
            >
                {children}
            </ReanimatedSwipeable>
        </View>
    );
};

export default SwipeToDelete;

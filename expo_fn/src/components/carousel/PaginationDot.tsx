import React from 'react';
import { ColorSchemeName, View } from 'react-native';
import Colors from '@/src/constants/Colors';
import Animated, { SharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

type PaginationDotProps = {
  index: number;
  backgroundColor: string;
  length: number;
  animValue: SharedValue<number>;
  isRotate?: boolean;
  colorScheme: ColorSchemeName;
}

const PaginationDot: React.FC<PaginationDotProps> = ({ 
  animValue,
  index,
  length,
  backgroundColor,
  colorScheme,
  isRotate
}) => {
  const width = 10;
  
  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }
    
    return {
      transform: [{
        translateX: interpolate(animValue.value, inputRange, outputRange, Extrapolation.CLAMP),
      }],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        width: width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        transform: [{ rotateZ: isRotate ? "90deg" : "0deg" }],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default PaginationDot;

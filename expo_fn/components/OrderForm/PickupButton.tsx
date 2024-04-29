import React from 'react';
import { ColorSchemeName, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { UseFormRegister } from 'react-hook-form';
import { Order } from '@/models';

type PickupButtonProps = {
    colorScheme: ColorSchemeName;
    isCollapsed2: boolean;
    setIsCollapsed1: React.Dispatch<React.SetStateAction<boolean>>
    setIsCollapsed2: React.Dispatch<React.SetStateAction<boolean>>
    setIsCollapsed3: React.Dispatch<React.SetStateAction<boolean>>
    register:  UseFormRegister<Order>
    formValue: Order
    setFormValue: React.Dispatch<React.SetStateAction<Order>>
};

const PickupButton: React.FC<PickupButtonProps> = ({
    colorScheme,
    isCollapsed2,
    setIsCollapsed1,
    setIsCollapsed2,
    setIsCollapsed3,
    register,
    formValue,
    setFormValue
}) => { 
const height2 = useSharedValue(80);
const handlePress2 = useDebounce(() => {
    if (isCollapsed2) {
      formValue.pickupDateTime !== "" ? (
        height2.value = withSpring(350, {damping: 15})
      ) : (
        height2.value = withSpring(350, {damping: 15})
      )
    } else {
        formValue.pickupDateTime !== "" ? (
        height2.value = withSpring(100, {damping: 15})
      ) : (
        height2.value = withSpring(80, {damping: 15})
      )
    };
    setIsCollapsed1(true);
    setIsCollapsed2(!isCollapsed2);
    setIsCollapsed3(true);
  }, 100);
  return (
    <Animated.View
        style={[
          styles.surface,
          { height: height2,
            backgroundColor:
            formValue.pickupDateTime !== "" ? Colors[colorScheme ?? "light"].tertiary
              : Colors[colorScheme ?? "light"].surfaceContainer,
          },
        ]}>
        <TouchableOpacity style={styles.expandBtn}
          onPress={ handlePress2 }
        >
          <View style={styles.btnTitle}>
            <FontAwesome
              name="clock-o"
              size={28}
              color={ formValue.pickupDateTime !== "" ? Colors.light.text
                : Colors[colorScheme ?? "light"].text
              }
            />
            <Text
              style={[
                styles.btnText,
                { color: formValue.pickupDateTime !== "" ? Colors.light.text
                  : Colors[colorScheme ?? "light"].text
                },
              ]}
            >
              第二步：上門收衫時間
            </Text>
            <FontAwesome
              name={isCollapsed2 ? "chevron-down" : "chevron-up"}
              size={16}
              color={ formValue.pickupDateTime !== "" ? Colors.light.text
                : Colors[colorScheme ?? "light"].text
              }
            />
          </View>
          <Text style={ styles.info }
            lightColor={ Colors.light.outline }
            darkColor={ Colors.light.outline }
          >
            {formValue.pickupDateTime !== "" ? formValue.pickupDateTime : null}
          </Text>
        </TouchableOpacity>
      </Animated.View>
  )
}

export default PickupButton

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        maxHeight: 350,
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "flex-start",
      },
    expandBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
    },
    btnTitle: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    btnText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    inputBox: {
        width: "100%",
        gap: 20,
    },
    info: {
        fontSize: 16,
    },
})
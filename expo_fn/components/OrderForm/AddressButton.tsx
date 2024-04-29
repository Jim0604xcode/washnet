import React from 'react';
import { ColorSchemeName, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { TextInput } from 'react-native-paper';
import { UseFormRegister } from 'react-hook-form';
import { Order } from '@/models';

type AddressButtonProps = {
    colorScheme: ColorSchemeName;
    isCollapsed1: boolean;
    setIsCollapsed1: React.Dispatch<React.SetStateAction<boolean>>
    setIsCollapsed2: React.Dispatch<React.SetStateAction<boolean>>
    setIsCollapsed3: React.Dispatch<React.SetStateAction<boolean>>
    addressIsFilled: boolean;
    register:  UseFormRegister<Order>
    formValue: Order
    setFormValue: React.Dispatch<React.SetStateAction<Order>>
};

const AddressButton: React.FC<AddressButtonProps> = ({
    colorScheme,
    isCollapsed1,
    setIsCollapsed1,
    setIsCollapsed2,
    setIsCollapsed3,
    addressIsFilled,
    register,
    formValue,
    setFormValue
}) => { 
const height1 = useSharedValue(80);
const handlePress1 = useDebounce(() => {
    if (isCollapsed1) {
      height1.value = withSpring(350, {damping: 15})
    } else {
      addressIsFilled ? (
        height1.value = withSpring(100, {damping: 15})
      ) : (
        height1.value = withSpring(80, {damping: 15})
      )
    };
    setIsCollapsed1(!isCollapsed1);
    setIsCollapsed2(true);
    setIsCollapsed3(true);
  }, 100);
  return (
    <Animated.View
        style={[
          styles.surface,
          { height: height1,
            backgroundColor:
              addressIsFilled ? Colors[colorScheme ?? "light"].tertiary
              : Colors[colorScheme ?? "light"].surfaceContainer,
          },
        ]}>
      <TouchableOpacity style={styles.expandBtn}
        onPress={ handlePress1 }
      >
        <View style={styles.btnTitle}>
          <FontAwesome
            name="map-pin"
            size={28}
            color={ addressIsFilled ? Colors.light.text
              : Colors[colorScheme ?? "light"].text
            }
          />
          <Text
            style={[
              styles.btnText,
              { color: addressIsFilled ? Colors.light.text
                : Colors[colorScheme ?? "light"].text
              },
            ]}
          >
            第一步：填寫地址
          </Text>
          <FontAwesome
            name={isCollapsed1 ? "chevron-down" : "chevron-up"}
            size={16}
            color={ addressIsFilled ? Colors.light.text
              : Colors[colorScheme ?? "light"].text
            }
          />
        </View>
        <Text style={ styles.info }
          lightColor={ Colors.light.outline }
          darkColor={ Colors.light.outline }
        >
          {addressIsFilled ? formValue.fullAddress : null}
        </Text>
      </TouchableOpacity>
      { isCollapsed1 ? ( null ) : (
        <View style={styles.inputBox}>
          <TextInput
            mode="outlined"
            label="地區"
            placeholder="請填寫地區"
            {...register("district")}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                let newFormValue = { ...formValue };
                newFormValue.district = v;
                newFormValue.fullAddress =
                  newFormValue.district +
                  newFormValue.street +
                  newFormValue.building;
                return newFormValue;
              });
            }}
            value={formValue.district}
            style={{
                backgroundColor: addressIsFilled ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
          <TextInput
            mode="outlined"
            label="街道"
            placeholder="請填寫街道"
            {...register("street")}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                let newFormValue = { ...formValue };
                newFormValue.street = v;
                newFormValue.fullAddress =
                  newFormValue.district +
                  newFormValue.street +
                  newFormValue.building;
                return newFormValue;
              });
            }}
            value={formValue.street}
            style={{
                backgroundColor: addressIsFilled ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
          <TextInput
            mode="outlined"
            label="大廈"
            placeholder="請填寫大廈名稱"
            {...register("building",
              { required: true }
            )}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                const newFormValue = { ...formValue };
                newFormValue.building = v;
                newFormValue.fullAddress =
                  newFormValue.district +
                  newFormValue.street +
                  newFormValue.building;
                return newFormValue;
              });
            }}
            value={formValue.building}
            style={{
                backgroundColor: addressIsFilled ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
        </View>
      )}
    </Animated.View>
  )
}

export default AddressButton

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
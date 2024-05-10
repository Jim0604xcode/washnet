import React from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { TextInput } from 'react-native-paper';
import { UseFormRegister } from 'react-hook-form';
import { FormButtonControls, FormInputFlags, Order } from '@/models';

type AddressButtonProps = {
    formBtnCtrls: FormButtonControls;
    formInputFlags: FormInputFlags;
    register:  UseFormRegister<Order>
    formValue: Order
    setFormValue: React.Dispatch<React.SetStateAction<Order>>
};

const AddressButton: React.FC<AddressButtonProps> = ({
    formBtnCtrls,
    formInputFlags,
    register,
    formValue,
    setFormValue
}) => {
const colorScheme = useColorScheme(); 

const {
  height1,
  height2,
  height3,
  isOpen1,
  isOpen2,
  isOpen3,
  setIsOpen1,
  setIsOpen2,
  setIsOpen3,
} = formBtnCtrls;

const { hasAddress, hasPickupDateTime, hasDeliveryDateTime } = formInputFlags;

const handlePress1 = useDebounce(() => {
  if (isOpen1 === false) {
    height1.value = withSpring(350, { damping: 15 });
  } else if (isOpen1 === true) {
    hasAddress ? 
      (height1.value = withSpring(100, { damping: 15 }))
    : (height1.value = withSpring(80, { damping: 15 }));
  }
  setIsOpen1(!isOpen1);
  if (isOpen2 === true) {
    hasPickupDateTime ?
      (height2.value = withSpring(100, { damping: 14 }))
    : (height2.value = withSpring(80, { damping: 14 }));
    setIsOpen2(false);
  }
  if (isOpen3 === true) {
    hasDeliveryDateTime ?
      (height3.value = withSpring(100, { damping: 14 }))
    : (height3.value = withSpring(80, { damping: 14 }));
    setIsOpen3(false);
  }
}, 100);

  return (
    <Animated.View
      style={[
        styles.surface,
        { height: height1,
          backgroundColor:
            hasAddress ? Colors[colorScheme ?? "light"].tertiary
            : Colors[colorScheme ?? "light"].surfaceContainer,
        },
      ]}>
      <TouchableOpacity 
        style={styles.openBtn}
        onPress={ handlePress1 }
        >
        <View style={styles.btnTitle}>
          <FontAwesome
            name="map-marker"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text
            style={[
              styles.btnText,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            第一步：填寫地址
          </Text>
          <FontAwesome
            name={isOpen1 ? "chevron-up" : "chevron-down"}
            size={16}
            color={Colors[colorScheme ?? "light"].text}

          />
        </View>
        <Text style={ styles.info }
          lightColor={ Colors.light.outline }
          darkColor={ Colors.dark.outline }
        >
          {hasAddress ? formValue.fullAddress : null}
        </Text>
      </TouchableOpacity>
      { isOpen1 ? (
        <View style={styles.inputBox}>
          <TextInput
            mode="outlined"
            label="地區"
            placeholder="請填寫地區"
            {...register("district",
              { required: true }
            )}
            value={formValue.district}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                let newFormValue = { ...formValue };
                newFormValue.district = v;
                newFormValue.fullAddress = `${v} ${formValue.street} ${formValue.building}`;
                return newFormValue;
              });
            }}
            autoCapitalize='words'
            style={{
                backgroundColor: hasAddress ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            outlineColor= {Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
          <TextInput
            mode="outlined"
            label="街道"
            placeholder="請填寫街道"
            {...register("street",
              { required: true }
            )}
            value={formValue.street}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                let newFormValue = { ...formValue };
                newFormValue.street = v;
                newFormValue.fullAddress = `${formValue.district} ${v} ${formValue.building}`;
                return newFormValue;
              });
            }}
            autoCapitalize='words'
            autoComplete='street-address'
            style={{
                backgroundColor: hasAddress ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            outlineColor= {Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
          <TextInput
            mode="outlined"
            label="大廈"
            placeholder="請填寫大廈名稱"
            {...register("building",
              { required: true }
            )}
            value={formValue.building}
            onChangeText={(v: string) => {
              setFormValue((formValue) => {
                const newFormValue = { ...formValue };
                newFormValue.building = v;
                newFormValue.fullAddress = `${formValue.district} ${formValue.street} ${v}`;
                return newFormValue;
              });
            }}
            autoCapitalize='words'
            style={{
                backgroundColor: hasAddress ? Colors[colorScheme ?? "light"].tertiary
                  : Colors[colorScheme ?? "light"].surfaceContainer,
                borderColor: Colors[colorScheme ?? "light"].outline,
              }}
            outlineColor= {Colors[colorScheme ?? "light"].outline}
            activeOutlineColor={Colors[colorScheme ?? "light"].tint}
          />
        </View>
        ) : ( null )
      }
    </Animated.View>
  )
}

export default AddressButton

const styles = StyleSheet.create({
  surface: {
      minHeight: 80,
      maxHeight: 350,
      borderRadius: 14,
      paddingVertical: 20,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%"
    },
  openBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 80,
  },
  btnTitle: {
    width: "100%",
    height: 40,
    paddingLeft: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBox: {
    width: '100%',
    gap: 20,
  },
  info: {
    fontSize: 16,
  },
})
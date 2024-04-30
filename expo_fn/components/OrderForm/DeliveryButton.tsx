import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { UseFormRegister } from 'react-hook-form';
import { FormButtonControls, FormInputFlags, Order } from '@/models';
import dayjs from 'dayjs';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { IconButton } from 'react-native-paper';

type DeliveryButtoProps = {
    formBtnCtrls: FormButtonControls;
    formInputFlags: FormInputFlags;
    register:  UseFormRegister<Order>
    formValue: Order
    setFormValue: React.Dispatch<React.SetStateAction<Order>>
};

const DeliveryButton: React.FC<DeliveryButtoProps> = ({
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
  
  const handlePress3 = useDebounce(() => {
    if (!isOpen3) {
      height3.value = withSpring(175, { damping: 15 });
    } else if (isOpen3) {
      hasDeliveryDateTime ? 
        (height3.value = withSpring(100, { damping: 15 }))
      : (height3.value = withSpring(80, { damping: 15 }));
    }
    setIsOpen3(!isOpen3);

    if (isOpen1) {
      hasAddress ? 
      (height1.value = withSpring(100, { damping: 14 }))
    : (height1.value = withSpring(80, { damping: 14 }));
      setIsOpen1(false);
    }

    if (isOpen2) {
      hasPickupDateTime ?
      (height2.value = withSpring(100, { damping: 14 }))
    : (height2.value = withSpring(80, { damping: 14 }));
      setIsOpen2(false);
    }
  }, 100);

  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [deliveryTime, setDeliveryTime] = useState<Date>(new Date());
  const dayAfterTomorrow = dayjs().add(2, 'days').toDate();

  const setDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || deliveryDate;
    setDeliveryDate(currentDate); // Update the date state
    if (event.type === "set") {
      // Combine date and time if needed here, or just set the date
      const combinedDateTime = dayjs(currentDate)
        .hour(dayjs(deliveryTime).hour())
        .minute(dayjs(deliveryTime).minute())
        .format('YYYY-MM-DD, h:mm A');
      setFormValue(prev => ({ ...prev, deliveryDateTime: combinedDateTime }));
    }
  };

  const setTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || deliveryTime;
    setDeliveryTime(currentTime); // Update the time state
    if (event.type === "set") {
      // Assume date is already set and only time is updated
      const combinedDateTime = dayjs(deliveryDate)
        .hour(dayjs(currentTime).hour())
        .minute(dayjs(currentTime).minute())
        .format('YYYY-MM-DD, h:mm A');

      setFormValue(prev => ({ ...prev, deliveryDateTime: combinedDateTime }));
    }
  };

  const clearDateTime = useCallback(
    () => {
      setFormValue(prev => ({ ...prev, deliveryDateTime: "" }));
    },
    [setFormValue],
  );
  
  
  return (
    <Animated.View
        style={[
          styles.surface,
          { height: height3,
            backgroundColor:
            hasDeliveryDateTime ? Colors[colorScheme ?? "light"].tertiary
              : Colors[colorScheme ?? "light"].surfaceContainer,
          },
        ]}>
        <TouchableOpacity style={styles.openBtn}
          onPress={ handlePress3 }
          >
          <View style={styles.btnTitle}>
            <FontAwesome
              name="truck"
              size={28}
              color={Colors[colorScheme ?? "light"].text}
            />
            <Text
              style={[
                styles.btnText,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              第三步：送回衣服時間
            </Text>
            <FontAwesome
              name={isOpen2 ? "chevron-up" : "chevron-down"}
              size={16}
              color={Colors[colorScheme ?? "light"].text}
            />
          </View>
          <Text style={ styles.info }
            lightColor={ Colors.light.outline }
            darkColor={ Colors.dark.outline }
          >
            {hasDeliveryDateTime ? formValue.deliveryDateTime : null}
          </Text>
        </TouchableOpacity>

      <View style={[styles.dateTimeInput, {opacity: isOpen3 ? 1 : 0}]}
        {...register("deliveryDateTime", {required: true})}
      >
        <RNDateTimePicker
          mode="date"
          disabled={!isOpen3}
          value={deliveryDate}
          onChange={setDate}
          minimumDate={dayAfterTomorrow}
          accentColor={Colors[colorScheme?? 'light'].tint}
          textColor={Colors[colorScheme?? 'light'].text}
          positiveButton={{label: '確定', textColor: Colors[colorScheme?? 'light'].tint}}
          neutralButton={{label: '重設', textColor: Colors[colorScheme?? 'light'].outline}}
          negativeButton={{label: '取消', textColor: Colors[colorScheme?? 'light'].outline}}
          locale='zh'
        />
        <RNDateTimePicker
          mode="time"
          value={deliveryTime}
          disabled={!isOpen3}
          onChange={setTime}
          accentColor={Colors[colorScheme?? 'light'].tint}
          textColor={Colors[colorScheme?? 'light'].text}
          positiveButton={{label: '確定', textColor: Colors[colorScheme?? 'light'].tint}}
          neutralButton={{label: '重設', textColor: Colors[colorScheme?? 'light'].outline}}
          negativeButton={{label: '取消', textColor: Colors[colorScheme?? 'light'].outline}}
          minuteInterval={5}
        />
        <IconButton 
          icon={'close'} 
          iconColor={Colors[colorScheme?? 'light'].outline}
          onPress={
            clearDateTime
          }
        />
      </View>
    </Animated.View>
  )
};

export default DeliveryButton;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    maxHeight: 500,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
  },
  dateTimeInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
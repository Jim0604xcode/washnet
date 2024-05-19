import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { UseFormSetValue } from 'react-hook-form';
import { FormButtonControls, FormInputFlags, Order, OtherOrders } from '@/models';
import dayjs from 'dayjs';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { IconButton } from 'react-native-paper';
import { parseAndAddDays } from '@/utils/parseAndAddDays';
import { useTranslation } from 'react-i18next';

type DeliveryButtoProps = {
    formBtnCtrls: FormButtonControls;
    formInputFlags: FormInputFlags;
    formValue: Order | OtherOrders;
    setFormValue: UseFormSetValue<Order> | UseFormSetValue<OtherOrders>
};

const DeliveryButton: React.FC<DeliveryButtoProps> = ({
    formBtnCtrls,
    formInputFlags,
    formValue,
    setFormValue
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
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
  
 const cbHandlePress3 = useCallback(() => {
  if (!isOpen3) {
    height3.value = withSpring(175, { damping: 17 });
  } else if (isOpen3) {
    hasDeliveryDateTime ? 
      (height3.value = withSpring(110, { damping: 15 }))
    : (height3.value = withSpring(80, { damping: 15 }));
  }
  setIsOpen3(!isOpen3);

  if (isOpen1) {
    hasAddress ? 
    (height1.value = withSpring(120, { damping: 14 }))
  : (height1.value = withSpring(80, { damping: 14 }));
    setIsOpen1(false);
  }

  if (isOpen2) {
    hasPickupDateTime ?
    (height2.value = withSpring(110, { damping: 14 }))
  : (height2.value = withSpring(80, { damping: 14 }));
    setIsOpen2(false);
  }
  },[isOpen1, isOpen2, isOpen3, height1, height2, height3, hasAddress, hasPickupDateTime, hasDeliveryDateTime])

 const handlePress3 = useDebounce(()=>{cbHandlePress3()}, 100)

  const dayAfterTomorrow = dayjs().add(2, 'days').toDate();
  const dayAfterPickup = useMemo(() =>
     parseAndAddDays(formValue.pickupDateTime, 'YYYY-MM-DD ddd h:mm A', 1)
  , [formValue.pickupDateTime]);
  const [deliveryDate, setDeliveryDate] = useState<Date>(dayAfterTomorrow);
  const [deliveryTime, setDeliveryTime] = useState<Date>(dayAfterTomorrow);

  const setDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || deliveryDate;
    setDeliveryDate(currentDate); // Update the date state
    if (event.type === "set") {
      // Combine date and time if needed here, or just set the date
      const combinedDateTime = dayjs(currentDate)
        .hour(dayjs(deliveryTime).hour())
        .minute(dayjs(deliveryTime).minute())
        .format('YYYY-MM-DD ddd h:mm A');
      setFormValue('deliveryDateTime', combinedDateTime);
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
        .format('YYYY-MM-DD ddd h:mm A');

        setFormValue('deliveryDateTime', combinedDateTime);
      }
  };

  const clearDateTime = useCallback(
    () => {
      setFormValue('deliveryDateTime', '');
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
              : Colors[colorScheme ?? "light"].surfaceContainer
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
              {t('orderForm.delivery')}
            </Text>
            <FontAwesome
              name={isOpen3 ? "chevron-up" : "chevron-down"}
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

      <View style={[styles.dateTimeInput, {opacity: isOpen3 ? 1 : 0}]}>
        <RNDateTimePicker
          mode="date"
          disabled={!isOpen3}
          value={deliveryDate}
          onChange={setDate}
          minimumDate={dayAfterPickup ?? dayAfterTomorrow}
          accentColor={Colors[colorScheme?? 'light'].tint}
          textColor={Colors[colorScheme?? 'light'].text}
          positiveButton={{label: t('orderForm.confirm'), textColor: Colors[colorScheme?? 'light'].tint}}
          neutralButton={{label: t('orderForm.reset'), textColor: Colors[colorScheme?? 'light'].outline}}
          negativeButton={{label: t('orderForm.cancel'), textColor: Colors[colorScheme?? 'light'].outline}}
          locale={t('orderForm.locale')}
        />
        <RNDateTimePicker
          mode="time"
          value={deliveryTime}
          disabled={!isOpen3}
          onChange={setTime}
          accentColor={Colors[colorScheme?? 'light'].tint}
          textColor={Colors[colorScheme?? 'light'].text}
          positiveButton={{label: t('orderForm.confirm'), textColor: Colors[colorScheme?? 'light'].tint}}
          neutralButton={{label: t('orderForm.reset'), textColor: Colors[colorScheme?? 'light'].outline}}
          negativeButton={{label: t('orderForm.cancel'), textColor: Colors[colorScheme?? 'light'].outline}}
          minuteInterval={30}
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
    minHeight: 80,
    maxHeight: 175,
    borderRadius: 14,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 24,
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
    fontSize: 18,
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
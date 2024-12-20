import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import { Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import Animated, { FadeInUp, withSpring } from 'react-native-reanimated';
import { useDebounce } from "@/utils/useDebounce";
import { UseFormSetValue } from 'react-hook-form';
import { FormButtonControls, FormInputFlags, Order, OtherOrders } from '@/models';
import dayjs from 'dayjs';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Button,  } from 'react-native-paper';
import { parseAndAddDays } from '@/utils/parseAndAddDays';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/context/UserContext';
import Timeslots from "@/components/orderForm/Timeslots";


type DeliveryButtoProps = {
    formBtnCtrls: FormButtonControls;
    formInputFlags: FormInputFlags;
    formValue: Order | OtherOrders;
    setFormValue: UseFormSetValue<Order> | UseFormSetValue<OtherOrders>;
    initMaxHeight: number;
};

const DeliveryButton: React.FC<DeliveryButtoProps> = ({
    formBtnCtrls,
    formInputFlags,
    formValue,
    setFormValue,
    initMaxHeight
}) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { userState } = useUser();

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
      height3.value = withSpring(Platform.OS === "ios" ? 250 : 220, { damping: 17 });
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
     parseAndAddDays(formValue.pickupDateTime, 'YYYY-MM-DD ddd', 1)
  , [formValue.pickupDateTime]);
  const [deliveryDate, setDeliveryDate] = useState<Date>(dayAfterTomorrow);
  const [deliveryTime, setDeliveryTime] = useState({
    AM: false,
    PM: false,
    EV: false,
  });

  const clearDateTime = useCallback(() => {
    setFormValue('pickupDateTime', "");
  }, [setFormValue]);

  const getTrueDeliveryKey = useCallback((timeslot: { AM: boolean; PM: boolean; EV: boolean; }
    ) => {
    for (const [key, value] of Object.entries(timeslot)) {
      if (value === true ) { return key; }
    }
      return null;
  },[])

  const setDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || deliveryDate;
      setDeliveryDate(currentDate); // Update the date state
      const trueDeliveryTime = getTrueDeliveryKey(deliveryTime);
      if (event.type === "set") {
        if (trueDeliveryTime) {
          const combinedDateTime =
            `${dayjs(currentDate).format("YYYY-MM-DD ddd")} ${trueDeliveryTime}`;
          setFormValue('deliveryDateTime', combinedDateTime)
        }
      }
    }, [deliveryDate, deliveryTime.AM, deliveryTime.PM, deliveryTime.EV, setFormValue]
  );
  const setTime = useCallback(
    (key: keyof typeof deliveryTime) => {
      setDeliveryTime((prev) => {
        const newState = { AM: false, PM: false, EV: false };
        newState[key] = !prev[key];
        const trueDeliveryTime = getTrueDeliveryKey(newState);
        if (trueDeliveryTime) {
          const combinedDateTime = `${dayjs(deliveryDate).format("YYYY-MM-DD ddd")} ${trueDeliveryTime}`;
          setFormValue('deliveryDateTime', combinedDateTime);
        } else {
        // Clear the formValue.pickupDateTime if no checkbox is selected
        clearDateTime();
      }
        return newState;
      });
    },
    [deliveryDate, deliveryTime, setFormValue, getTrueDeliveryKey, clearDateTime]
  );
  
  const openAndriodDatePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      value: deliveryDate,
      onChange: setDate,
      mode: "date",
      display: "spinner",
      minimumDate: dayAfterPickup ?? dayAfterTomorrow,
      positiveButton: {
        label: t('orderForm.confirm'),
        textColor: Colors[colorScheme ?? "light"].tint,
      },
      negativeButton: {
        label: t('orderForm.cancel'),
        textColor: Colors[colorScheme ?? "light"].outline,
      },
    })}, [deliveryDate, setDate, dayAfterPickup, dayAfterTomorrow]);

  return (
    <Animated.View
        style={[
          styles.surface,
          { 
            height: height3,
            maxHeight: initMaxHeight,
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
          {hasDeliveryDateTime ?
            <Text style={ styles.info }
              lightColor={ Colors.light.outline }
              darkColor={ Colors.dark.outline }
            >
              {formValue.deliveryDateTime}
            </Text>
          : null}
        </TouchableOpacity>
        {isOpen3 ? (
        <Animated.View
          style={styles.dateTimeInput}
          entering={FadeInUp.duration(400)}
        >
          {(Platform.OS === "ios") ? (
            <RNDateTimePicker
              mode="date"
              disabled={!isOpen3}
              value={deliveryDate}
              onChange={setDate}
              minimumDate={dayAfterPickup ?? dayAfterTomorrow}
              accentColor={Colors[colorScheme ?? "light"].tint}
              textColor={Colors[colorScheme ?? "light"].text}
              display="spinner"
              locale={t('orderForm.locale')}
              style={{height: 90, width: 'auto'}}
            />

            ) : (Platform.OS === 'android') ? (
            <Button
              mode="outlined"
              textColor={hasDeliveryDateTime ? 
                Colors[colorScheme??'light'].tert 
              : Colors[colorScheme ?? 'light'].tint}
              onPress={openAndriodDatePicker}
              labelStyle={{
                fontSize: 16,
                color: hasDeliveryDateTime ? 
                  Colors[colorScheme??'light'].tert 
                : Colors[colorScheme ?? 'light'].tint
              }}
              style={{ opacity: isOpen3 ? 1 : 0,
                borderColor: hasDeliveryDateTime ? 
                  Colors[colorScheme??'light'].tert 
                : Colors[colorScheme ?? 'light'].tint,
                width: '100%'
              }}
              disabled={!isOpen3}
            >
              {t('orderForm.date')}
            </Button>

            ) : (null)
          }
          <Timeslots
            time={deliveryTime}
            onSetTime={setTime}
            hasDateTimeSet={hasDeliveryDateTime}
          />
        </Animated.View>
        ) : (null)
      }
    </Animated.View>
  )
};

export default DeliveryButton;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    minHeight: 80,
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
    flex: 1,
    width: 280,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10
  },
})
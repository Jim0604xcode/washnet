import { useCallback, useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { withSpring, FadeInUp } from "react-native-reanimated";
import { useDebounce } from "@/utils/useDebounce";
import { FormButtonControls, FormInputFlags, Order, OtherOrders } from "@/models";
import dayjs from "dayjs";
import RNDateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { parseAndAddDays } from "@/utils/parseAndAddDays";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";
import Timeslots from "@/components/orderForm/Timeslots";

type PickupButtonProps = {
  formBtnCtrls: FormButtonControls;
  formInputFlags: FormInputFlags;
  formValue: Order | OtherOrders;
  setFormValue: UseFormSetValue<Order> | UseFormSetValue<OtherOrders>;
  initMaxHeight: number;
};

const tomorrow = dayjs().add(1, "days").toDate();
const twoWeeksFromNow = dayjs().add(14, "days").toDate();

const PickupButton: React.FC<PickupButtonProps> = ({
  formBtnCtrls,
  formInputFlags,
  formValue,
  setFormValue,
  initMaxHeight
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

  const cbHandlePress2 = useCallback(() => {
    if (isOpen2 === false) {
      height2.value = withSpring(Platform.OS === "ios" ? 250 : 220, { damping: 15 });
    } else if (isOpen2 === true) {
      hasPickupDateTime
        ? (height2.value = withSpring(110, { damping: 15 }))
        : (height2.value = withSpring(80, { damping: 15 }));
    }
    setIsOpen2(!isOpen2);

    if (isOpen1 === true) {
      hasAddress
        ? (height1.value = withSpring(120, { damping: 14 }))
        : (height1.value = withSpring(80, { damping: 14 }));
      setIsOpen1(false);
    }

    if (isOpen3 === true) {
      hasDeliveryDateTime
        ? (height3.value = withSpring(110, { damping: 14 }))
        : (height3.value = withSpring(80, { damping: 14 }));
      setIsOpen3(false);
    }
  }, [
    isOpen1,
    isOpen2,
    isOpen3,
    hasPickupDateTime,
    hasAddress,
    hasDeliveryDateTime,
    height1,
    height2,
    height3,
    setIsOpen1,
    setIsOpen2,
    setIsOpen3,
    withSpring,
  ]);

  const handlePress2 = useDebounce(() => {
    cbHandlePress2();
  }, 100);

  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  const [pickupTime, setPickupTime] = useState({
    AM: false,
    PM: false,
    EV: false,
  });

  const clearDateTime = useCallback(() => {
    setFormValue('pickupDateTime', "");
  }, [setFormValue]);

  const getTruePickupKey = useCallback((timeslot: { AM: boolean; PM: boolean; EV: boolean; }
    ) => {
    for (const [key, value] of Object.entries(timeslot)) {
      if (value === true ) { return key; }
    }
      return null;
  },[])

  const setDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || pickupDate;
      setPickupDate(currentDate); // Update the date state
      const truePickupTime = getTruePickupKey(pickupTime);
      if (event.type === "set") {
        if (truePickupTime) {
          const combinedDateTime =
           `${dayjs(currentDate).format("YYYY-MM-DD ddd")} ${truePickupTime}`;
          setFormValue('pickupDateTime', combinedDateTime)
        }
      };
    }, [pickupDate, pickupTime.AM, pickupTime.PM, pickupTime.EV, setFormValue]
  );

  const setTime = useCallback(
    (key: keyof typeof pickupTime) => {
      setPickupTime((prev) => {
        const newState = { AM: false, PM: false, EV: false };
        newState[key] = !prev[key];
        const truePickupTime = getTruePickupKey(newState);
        if (truePickupTime) {
          const combinedDateTime = `${dayjs(pickupDate).format("YYYY-MM-DD ddd")} ${truePickupTime}`;
          setFormValue('pickupDateTime', combinedDateTime);
        } else {
        // Clear the formValue.pickupDateTime if no checkbox is selected
        clearDateTime();
      }
        return newState;
      });
    },
    [pickupDate, pickupTime, setFormValue, getTruePickupKey, clearDateTime]
  );

  const dayBeforeDelivery = useMemo(() => {
    return parseAndAddDays(
      formValue.deliveryDateTime,
      "YYYY-MM-DD ddd",
      -1
    );
  }, [formValue.deliveryDateTime]);

  const openAndriodDatePicker = useCallback(() => {
    DateTimePickerAndroid.open({
      value: pickupDate,
      onChange: setDate,
      mode: "date",
      display: "spinner",
      minimumDate: tomorrow,
      maximumDate: dayBeforeDelivery ? dayBeforeDelivery : twoWeeksFromNow,
      positiveButton: {
        label: t('orderForm.confirm'),
        textColor: Colors[colorScheme ?? "light"].tint,
      },
      negativeButton: {
        label: t('orderForm.cancel'),
        textColor: Colors[colorScheme ?? "light"].outline,
      },
  
  })}, [pickupDate, setDate, tomorrow, dayBeforeDelivery, twoWeeksFromNow]);

  return (
    <Animated.View
      style={[
        styles.surface,
        {
          height: height2,
          maxHeight: initMaxHeight,
          backgroundColor: hasPickupDateTime
            ? Colors[colorScheme ?? "light"].tertiary
            : Colors[colorScheme ?? "light"].surfaceContainer,
        },
      ]}
    >
      <TouchableOpacity style={styles.openBtn} onPress={handlePress2}>
        <View style={styles.btnTitle}>
          <FontAwesome
            name="clock-o"
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text
            style={[
              styles.btnText,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            {t('orderForm.pickup')}
          </Text>
          <FontAwesome
            name={isOpen2 ? "chevron-up" : "chevron-down"}
            size={16}
            color={Colors[colorScheme ?? "light"].text}
          />
        </View>
        { hasPickupDateTime ?
          <Text
            style={styles.info}
            lightColor={Colors.light.outline}
            darkColor={Colors.dark.outline}
          >
          {formValue.pickupDateTime}
          </Text>
        : null }
      </TouchableOpacity>
    {isOpen2 ?
      <Animated.View
        style={[styles.dateTimeInput]}
        entering={FadeInUp.duration(400)}
      >
        {(Platform.OS === "ios") ? (
          <RNDateTimePicker
            mode="date"
            value={pickupDate}
            onChange={setDate}
            minimumDate={tomorrow}
            maximumDate={dayBeforeDelivery ? dayBeforeDelivery : twoWeeksFromNow}
            accentColor={Colors[colorScheme ?? "light"].tint}
            textColor={Colors[colorScheme ?? "light"].text}
            display="spinner"
            locale={t('orderForm.locale')}
            style={{height: 90, width: 'auto'}}
          />
          ) : (Platform.OS === 'android') ? (
          <Button
            mode="outlined"
            textColor={hasPickupDateTime ? 
              Colors[colorScheme??'light'].tert 
            : Colors[colorScheme ?? 'light'].tint}
            onPress={openAndriodDatePicker}
            labelStyle={{
              fontSize: 16,
              color: hasPickupDateTime ? 
                Colors[colorScheme??'light'].tert 
              : Colors[colorScheme ?? 'light'].tint
            }}
            style={{
              borderColor: hasPickupDateTime ? 
                Colors[colorScheme??'light'].tert 
              : Colors[colorScheme ?? 'light'].tint,
              width: '100%',
              height: 40,
            }}
          >
            {t('orderForm.date')}
          </Button>
          ) : (null)
        }
        <Timeslots
          time={pickupTime}
          onSetTime={setTime}
          hasDateTimeSet={hasPickupDateTime}
        />
      </Animated.View>
      : null}
    </Animated.View>
  );
};

export default PickupButton;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    minHeight: 80,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  openBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
});

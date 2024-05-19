import { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { Text } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { withSpring } from "react-native-reanimated";
import { useDebounce } from "@/utils/useDebounce";
import { FormButtonControls, FormInputFlags, Order, OtherOrders } from "@/models";
import dayjs from "dayjs";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { IconButton } from "react-native-paper";
import { parseAndAddDays } from "@/utils/parseAndAddDays";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";

type PickupButtonProps = {
  formBtnCtrls: FormButtonControls;
  formInputFlags: FormInputFlags;
  formValue: Order | OtherOrders;
  setFormValue: UseFormSetValue<Order> | UseFormSetValue<OtherOrders>
};

const PickupButton: React.FC<PickupButtonProps> = ({
  formBtnCtrls,
  formInputFlags,
  formValue,
  setFormValue,
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
      height2.value = withSpring(175, { damping: 15 });
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
  ]);
  const handlePress2 = useDebounce(() => {
    cbHandlePress2();
  }, 100);

  const tomorrow = dayjs().add(1, "days").toDate();
  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  const [pickupTime, setPickupTime] = useState<Date>(tomorrow);

  const setDate = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate || pickupDate;
      setPickupDate(currentDate); // Update the date state
      if (event.type === "set") {
        // Combine date and time if needed here, or just set the date
        const combinedDateTime = dayjs(currentDate)
          .hour(dayjs(pickupTime).hour())
          .minute(dayjs(pickupTime).minute())
          .format("YYYY-MM-DD ddd h:mm A");
        setFormValue('pickupDateTime', combinedDateTime );
      }
    },
    [pickupDate, pickupTime, setFormValue]
  );

  const dayBeforeDelivery = useMemo(() => {
    return parseAndAddDays(
      formValue.deliveryDateTime,
      "YYYY-MM-DD ddd h:mm A",
      -1
    );
  }, [formValue.deliveryDateTime]);

  const setTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime || pickupTime;
    setPickupTime(currentTime); // Update the time state
    if (event.type === "set") {
      // Assume date is already set and only time is updated
      const combinedDateTime = dayjs(pickupDate)
        .hour(dayjs(currentTime).hour())
        .minute(dayjs(currentTime).minute())
        .format("YYYY-MM-DD ddd h:mm A");
        setFormValue('pickupDateTime', combinedDateTime );
    }
  };

  const oneWeekFromNow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  const clearDateTime = useCallback(() => {
    setFormValue('pickupDateTime', "");
  }, [setFormValue]);

  return (
    <Animated.View
      style={[
        styles.surface,
        {
          height: height2,
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
        <Text
          style={styles.info}
          lightColor={Colors.light.outline}
          darkColor={Colors.dark.outline}
        >
          {hasPickupDateTime ? formValue.pickupDateTime : null}
        </Text>
      </TouchableOpacity>

      <View
        style={[styles.dateTimeInput, { opacity: isOpen2 ? 1 : 0 }]}
      >
        <RNDateTimePicker
          mode="date"
          disabled={!isOpen2}
          collapsable={false}
          value={pickupDate}
          onChange={setDate}
          minimumDate={tomorrow}
          maximumDate={dayBeforeDelivery ? dayBeforeDelivery : oneWeekFromNow}
          accentColor={Colors[colorScheme ?? "light"].tint}
          textColor={Colors[colorScheme ?? "light"].text}
          positiveButton={{
            label: t('orderForm.confirm'),
            textColor: Colors[colorScheme ?? "light"].tint,
          }}
          neutralButton={{
            label: t('orderForm.reset'),
            textColor: Colors[colorScheme ?? "light"].outline,
          }}
          negativeButton={{
            label: t('orderForm.cancel'),
            textColor: Colors[colorScheme ?? "light"].outline,
          }}
          locale={t('orderForm.locale')}
        />
        <RNDateTimePicker
          mode="time"
          value={pickupTime}
          disabled={!isOpen2}
          collapsable={false}
          onChange={setTime}
          
          accentColor={Colors[colorScheme ?? "light"].tint}
          textColor={Colors[colorScheme ?? "light"].text}
          positiveButton={{
            label: t('orderForm.confirm'),
            textColor: Colors[colorScheme ?? "light"].tint,
          }}
          neutralButton={{
            label: t('orderForm.reset'),
            textColor: Colors[colorScheme ?? "light"].outline,
          }}
          negativeButton={{
            label: t('orderForm.cancel'),
            textColor: Colors[colorScheme ?? "light"].outline,
          }}
          minuteInterval={30}
        />
        <IconButton
          icon={"close"}
          iconColor={Colors[colorScheme ?? "light"].outline}
          onPress={clearDateTime}
        />
      </View>
    </Animated.View>
  );
};

export default PickupButton;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    minHeight: 80,
    maxHeight: 175,
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

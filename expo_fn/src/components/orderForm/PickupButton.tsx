import { useCallback, useMemo, useReducer, useState } from "react";
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
import Animated, { withSpring } from "react-native-reanimated";
import { useDebounce } from "@/utils/useDebounce";
import { FormButtonControls, FormInputFlags, Order, OtherOrders } from "@/models";
import dayjs from "dayjs";
import RNDateTimePicker, { DateTimePickerEvent, DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { parseAndAddDays } from "@/utils/parseAndAddDays";
import { useTranslation } from "react-i18next";
import { UseFormSetValue } from "react-hook-form";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useUser } from "@/context/UserContext";

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

  const cbHandlePress2 = useCallback(() => {
    if (isOpen2 === false) {
      height2.value = withSpring(220, { damping: 15 });
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
    setShowDatePicker(!showDatePicker)
  }, 100);

  const tomorrow = dayjs().add(1, "days").toDate();
  const twoWeeksFromNow = dayjs().add(14, "days").toDate();

  const [pickupDate, setPickupDate] = useState<Date>(tomorrow);
  // const [pickupTime, setPickupTime] = useState<Date>(tomorrow);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        const combinedDateTime = `${dayjs(currentDate).format("YYYY-MM-DD ddd")} ${truePickupTime}`;
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
      minimumDate: tomorrow,
      maximumDate: dayBeforeDelivery ? dayBeforeDelivery : twoWeeksFromNow,

      positiveButton: {
        label: t('orderForm.confirm'),
        textColor: Colors[colorScheme ?? "light"].tint,
      },
      negativeButton: {
        label: t('orderForm.cancel'),
        textColor: Colors[colorScheme ?? "light"].outline,
      }
  
  })}, [pickupDate, setDate, tomorrow, dayBeforeDelivery, twoWeeksFromNow]);

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
          { hasPickupDateTime ? formValue.pickupDateTime : null }
        </Text>
      </TouchableOpacity>

      <View
        style={[styles.dateTimeInput, { opacity: isOpen2 ? 1 : 0 }]}
      >
        { Platform.OS === "ios" ? (
          <RNDateTimePicker
            mode="date"
            disabled={!isOpen2}
            value={pickupDate}
            onChange={setDate}
            minimumDate={tomorrow}
            maximumDate={dayBeforeDelivery ? dayBeforeDelivery : twoWeeksFromNow}
            accentColor={Colors[colorScheme ?? "light"].tint}
            textColor={Colors[colorScheme ?? "light"].text}
            display="spinner"
            locale={t('orderForm.locale')}
            style={{height: 50, width: 'auto'}}
          />) 
          : (null)
        }

      { Platform.OS === 'android' ? (
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
          style={{ opacity: isOpen2 ? 1 : 0,
            borderColor: hasPickupDateTime ? 
              Colors[colorScheme??'light'].tert 
            : Colors[colorScheme ?? 'light'].tint,
            width: '100%'
           }}
          disabled={!isOpen2}
        >
            選擇日期
        </Button>
        ) : (null)
      }
      <View style={{
          flexDirection: 'row',
          gap:  userState?.lng === "cn" ? 40 : 0,
          width: '100%',
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          opacity: isOpen2 ? 1 : 0
          }}>
        <BouncyCheckbox
          isChecked={pickupTime.AM}
          disabled={!isOpen2}
          onPress={()=>setTime("AM")}
          size={20}
          fillColor={hasPickupDateTime ? 
            Colors[colorScheme??'light'].tert 
          : Colors[colorScheme ?? 'light'].tint}
          unFillColor={Colors[colorScheme??'light'].surfaceContainer}
          text={t('orderForm.am')}
          iconStyle={{ borderColor: "green" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{
            fontSize: 16,
            marginLeft: -6,
            textDecorationLine: "none",
            color: pickupTime.AM ? 
              Colors[colorScheme??'light'].text 
            : Colors[colorScheme ?? 'light'].outline
          }}
          style={{flex: 1}}
        />
        <BouncyCheckbox
          isChecked={pickupTime.PM}
          disabled={!isOpen2}
          onPress={()=>{setTime("PM")}}
          size={20}
          fillColor={hasPickupDateTime ? 
            Colors[colorScheme??'light'].tert 
          : Colors[colorScheme ?? 'light'].tint}
          unFillColor={Colors[colorScheme??'light'].surfaceContainer}
          text={t('orderForm.pm')}
          iconStyle={{ borderColor: "green" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{
            fontSize: 16,
            marginLeft: -6,
            textDecorationLine: "none",
            color: pickupTime.PM ? 
              Colors[colorScheme??'light'].text 
            : Colors[colorScheme ?? 'light'].outline
          }}
          style={{flex: 1}}
        />
        <BouncyCheckbox
          isChecked={pickupTime.EV}
          disabled={!isOpen2}
          onPress={()=>{setTime("EV")}}
          size={20}
          fillColor={hasPickupDateTime ? 
            Colors[colorScheme??'light'].tert 
          : Colors[colorScheme ?? 'light'].tint}
          unFillColor={Colors[colorScheme??'light'].surfaceContainer}
          text={t('orderForm.ev')}
          iconStyle={{ borderColor: "green" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{
            fontSize: 16,
            marginLeft: -6,
            textDecorationLine: "none",
            color: pickupTime.EV ? 
              Colors[colorScheme??'light'].text 
            : Colors[colorScheme ?? 'light'].outline
            
          }}
          style={{flex: 1}}
        />
        </View>
      </View>
    </Animated.View>
  );
};

export default PickupButton;

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    minHeight: 80,
    maxHeight: 220,
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
    // backgroundColor: 'red'
  },
});

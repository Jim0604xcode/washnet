import Colors from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, useColorScheme } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox/build/dist/BouncyCheckbox'

type TimeSlotProps = {
    time: Record<string, boolean>;
    onSetTime: (key: "AM" | "PM" | "EV") => void
    hasDateTimeSet: boolean,
}

const Timeslots: React.FC<TimeSlotProps> = ({
    time,
    onSetTime,
    hasDateTimeSet,
}) => {
    const colorScheme = useColorScheme();
    const { userState } = useUser();
    const { t } = useTranslation();

  return (
    <View style={{
        flexDirection: 'row',
        gap:  userState?.lng === "cn" ? 40 : 0,
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        }}>
      <BouncyCheckbox
        isChecked={time.AM}
        onPress={()=>onSetTime("AM")}
        size={20}
        fillColor={hasDateTimeSet ? 
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
          color: time.AM ? 
            Colors[colorScheme??'light'].text 
          : Colors[colorScheme ?? 'light'].outline
        }}
        style={{flex: 1}}
      />
      <BouncyCheckbox
        isChecked={time.PM}
        onPress={()=>{onSetTime("PM")}}
        size={20}
        fillColor={hasDateTimeSet ? 
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
          color: time.PM ? 
            Colors[colorScheme??'light'].text 
          : Colors[colorScheme ?? 'light'].outline
        }}
        style={{flex: 1}}
      />
      <BouncyCheckbox
        isChecked={time.EV}
        onPress={()=>{onSetTime("EV")}}
        size={20}
        fillColor={hasDateTimeSet ? 
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
          color: time.EV ? 
            Colors[colorScheme??'light'].text 
          : Colors[colorScheme ?? 'light'].outline
          
        }}
        style={{flex: 1}}
      />
    </View>
  )
}

export default Timeslots
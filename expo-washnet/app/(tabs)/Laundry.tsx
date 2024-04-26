import { Dimensions, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import * as React from 'react';
import Colors from '@/constants/Colors'
import { View } from '@/components/Themed';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import CarouselSlide from '@/components/CarouselSlide';
import Pagination from '@/components/Pagination';
import OrderForm from '@/components/OrderForm';

const carouselData = [
  {
    title: '磅洗服務',
    info: '○ 自選時間上門收衫送衫',
    info2: '○ 只需兩天送達',
    info3: '○ 另設加急服務',
    info4: '○ $8/磅（免運費）',
    image: require('@/assets/images/drawing-1.png'),
  },
  {
    subtitle: '輕鬆洗衫｜每磅$8｜零煩惱',
    info: '○ 只需兩個工作天即可送回乾淨衣服',
    info2: '○ 特快洗衫只需一個工作天',
    info3: '○ （星期六、日及公眾假期前夕不適用）',
    info4: '○ 最低消費$160，不足10磅以10磅計算'
  },
  {
    subtitle: '磅洗類別',
    info: '○ 普通衣物不包厚毛巾、浴袍、毛毯、被子等',
    info2: '○ 以上厚重布料需額外處理並收取附加費',
    info3: '○ 窗簾、梳化袋、毛公仔 等請選擇其他清洗',
    info4: '○ 歡迎與我們聯絡了解詳情'
  }
]

export default function LaundryScreen() {
  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const progressValue = useSharedValue<number>(0);

  return (
    <ScrollView contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        gap: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
        overflow: 'scroll'
      }}
    >
      <View style={styles.carouselBox}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          autoPlayInterval={8000}
          data={carouselData}
          pagingEnabled={true}
          withAnimation={{
            type: "spring",
            config: {
              damping: 15,
            },
          }}
          scrollAnimationDuration={1000}
           onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          renderItem={({ index }) => (
            <CarouselSlide data={carouselData[index]} colorScheme={colorScheme} />
          )}
        />
        <Pagination 
          carouselData={carouselData}
          progressValue={progressValue}
          colorScheme={colorScheme}

        />
      </View>
      <OrderForm colorScheme={colorScheme} />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  carouselBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

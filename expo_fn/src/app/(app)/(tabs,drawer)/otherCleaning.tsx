import { Dimensions, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import * as React from 'react';
import Colors from '@/constants/Colors'
import { View } from '@/components/Themed';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import CarouselSlide from '@/components/carousel/CarouselSlide';
import Pagination from '@/components/carousel/Pagination';
import { useEffect, useState } from 'react';
import { OrderType } from '@/models';
import OtherOrderForm from '@/components/orderForm/OtherOrderForm';

export default function OtherCleaningTab() {
  const [block, setBlock] = useState<any[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [lwRes, fwRes, wsRes] = await Promise.all([
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/lw`),
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/fw`),
          fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/ws`)
        ]);

        const [lwData, fwData, wsData] = await Promise.all([
          lwRes.json(),
          fwRes.json(),
          wsRes.json()
        ]);

        if (!lwData.isErr && !fwData.isErr && !wsData.isErr) {
          const lwBlock = parseBlock(lwData.data.blocks);
          const fwBlock = parseBlock(fwData.data.blocks);
          const wsBlock = parseBlock(wsData.data.blocks);

          const allBlocks = lwBlock.concat(fwBlock, wsBlock);
          setBlock(allBlocks);
        } else {
          throw new Error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching slides', error);
      }
    };

    fetchData();
  }, []);

  const parseBlock = (blockData: any) => {
    const data = JSON.parse(blockData);
    let pages = 0;
    let header = data.filter((obj: any) => obj.type === 'header')[0]?.data.text;
    data.forEach((obj: any, index: number) => {
      if (obj.type === 'header') {
        obj.page = pages;
      }
      if (obj.type === 'list' || obj.type === 'checklist') {
        pages = pages + Math.ceil(obj.data.items.length / 4);
        obj.page = pages;
      }
      if (obj.type === 'paragraph') {
        pages++;
        obj.page = pages;
      }
    });

    const newData: any[] = [];
    data.forEach((obj: any, p: number) => {
      if (obj.type === 'list') {
        if (p > 0) {
          for (let x = 1; x <= obj.page - data[p - 1].page; x++) {
            newData.push({
              title: header,
              infos: obj.data.items.slice((x * 4) - 4, x * 4),
              type: 'list'
            });
          }
        }
      }
      if (obj.type === 'checklist') {
        if (p > 0) {
          for (let x = 1; x <= obj.page - data[p - 1].page; x++) {
            newData.push({
              title: header,
              infos: obj.data.items.slice(0, 4),
              type: 'checklist'
            });
          }
        }
      }
      if (obj.type === 'paragraph') {
        newData.push({
          title: header,
          infos: obj.data.text,
          type: 'paragraph'
        });
      }
    });

    return newData;
  };

  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const progressValue = useSharedValue<number>(0);

  return (
    <View style={[styles.container,{width: width}]}>
      <ScrollView 
          contentContainerStyle={[styles.scrollBox, {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }]}
        keyboardDismissMode = 'on-drag'
        keyboardShouldPersistTaps = 'handled'
        contentInsetAdjustmentBehavior = 'always'
      >
        <View style={styles.carouselBox}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            autoPlayInterval={8000}
            data={block}
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
            defaultIndex={0}
            renderItem={({ index }) => (
              <CarouselSlide data={block[index]} />
            )}

          />
          <Pagination 
            carouselData={block}
            progressValue={progressValue}
            colorScheme={colorScheme}
          />
        </View>
        <OtherOrderForm orderType={[
            OrderType.BAGS,
            OrderType.HOME_TEXTILES,
            OrderType.SHOES
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollBox: {
    alignItems: 'center',
    gap: 40,
  },
  carouselBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
});
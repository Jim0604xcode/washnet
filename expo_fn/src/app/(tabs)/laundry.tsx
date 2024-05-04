import { Dimensions, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import * as React from 'react';
import Colors from '@/src/constants/Colors'
import { View } from '@/src/components/Themed';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import CarouselSlide from '@/src/components/carousel/CarouselSlide';
import Pagination from '@/src/components/carousel/Pagination';
import OrderForm from '@/src/components/orderForm/OrderForm';
import { useEffect, useState } from 'react';

// const carouselData = [
//   {
//     title: '磅洗服務',
//     info: '○ 自選時間上門收衫送衫',
//     info2: '○ 只需兩天送達',
//     info3: '○ 另設加急服務',
//     info4: '○ $8/磅（免運費）',
//     image: require('@/assets/images/drawing-1.png'),
//   },
//   {
//     subtitle: '輕鬆洗衫｜每磅$8｜零煩惱',
//     info: '○ 只需兩個工作天即可送回乾淨衣服',
//     info2: '○ 特快洗衫只需一個工作天',
//     info3: '○ （星期六、日及公眾假期前夕不適用）',
//     info4: '○ 最低消費$160，不足10磅以10磅計算',
//   },
//   {
//     subtitle: '磅洗類別',
//     info: '○ 普通衣物不包厚毛巾、浴袍、毛毯、被子等',
//     info2: '○ 以上厚重布料需額外處理並收取附加費',
//     info3: '○ 窗簾、梳化袋、毛公仔 等請選擇其他清洗',
//     info4: '○ 歡迎與我們聯絡了解詳情',
//   }
// ]

export default function LaundryScreen() {
  const [block,setBlock] = useState<any[]>([])

  useEffect(()=>{
    const main = async () =>{
      try {
        
        let res = await fetch(process.env.BNHOST+"/theme/getEditor/pw")
        let json = await res.json()
        
        if(!json.isErr){
          json.data.blocks = await JSON.parse(json.data.blocks)
          // console.log(json.data.blocks)
          let pages = 0
           
          const data = [...json.data.blocks]
          let header:string = data.filter(obj=>obj.type==="header")[0].data.text
          data.forEach((obj:any,index:number)=>{
            if(obj.type==="header"){
              Object.assign(obj,{page:pages})
            }
            if(obj.type==="list" || obj.type==="checklist"){
              pages = pages + Math.ceil(obj.data.items.length / 4)
              Object.assign(obj,{page:pages})
            }
            if(obj.type==="paragraph"){
              pages++
              Object.assign(obj,{page:pages})
            }
          })
          // console.log(pages)
          // console.log(data)


          let newData:any = []
          data.forEach((obj:any,p:number)=>{
            
              if(obj.type==="list"){
                if(p>0){
                  for(let x=1;x<=obj.page-data[p-1].page;x++){
                    // console.log('list',obj.data.items.slice((x*4)-4,x*4),x)
                    newData.push({
                      title:header,
                      infos: obj.data.items.slice((x*4)-4,x*4),
                      type:"list"

                    })

                  }  
                }
              }
              
              if(obj.type==="checklist"){
              
                if(p>0){
                  for(let x=1;x<=obj.page-data[p-1].page;x++){
                    // console.log('ck',obj.data.items.slice((x*4)-4,x*4),x)
                    newData.push({
                      title:header,
                      infos: obj.data.items.slice(0,4),
                      type:"checklist"
                    })

                  }  
                }
              }

              if(obj.type==="paragraph"){
                newData.push({
                  title:header,
                  infos: obj.data.text,
                  type:"paragraph"
                })
              }
            
            p++

          })
          // console.log(newData)

          
          
          setBlock(newData)
        }
    
      } catch (error:any) {
        console.log(error.message)
      }
    }
    main()
  },[])



  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const progressValue = useSharedValue<number>(0);

  return (
    <ScrollView contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].background,
        overflow: 'scroll',
      }}
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
          
          renderItem={({ index }) => (
            <CarouselSlide data={block[index]} colorScheme={colorScheme} />
          )}
        />
        <Pagination 
          carouselData={block}
          progressValue={progressValue}
          colorScheme={colorScheme}
        />
      </View>
      <OrderForm />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  carouselBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
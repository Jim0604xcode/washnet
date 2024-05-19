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
          const lwBlocks = parseBlocks(lwData.data.blocks);
          const fwBlocks = parseBlocks(fwData.data.blocks);
          const wsBlocks = parseBlocks(wsData.data.blocks);

          const allBlocks = [...lwBlocks, ...fwBlocks, ...wsBlocks];
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

  const parseBlocks = (blocksData: any) => {
    const data = JSON.parse(blocksData);
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

  // const lwBlock = React.useMemo(async()=>{
  //   try {
  //     let res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/lw`)
  //     let json = await res.json()
  //     if(!json.isErr){
  //       json.data.blocks = await JSON.parse(json.data.blocks)
  //       // console.log(json.data.blocks)
  //       let pages = 0
         
  //       const data = [...json.data.blocks]
  //       let header:string = data.filter(obj=>obj.type==="header")[0].data.text
  //       data.forEach((obj:any,index:number)=>{
  //         if(obj.type==="header"){
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="list" || obj.type==="checklist"){
  //           pages = pages + Math.ceil(obj.data.items.length / 4)
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="paragraph"){
  //           pages++
  //           Object.assign(obj,{page:pages})
  //         }
  //       })
  //       // console.log(pages)
  //       // console.log(data)
  //       let newData:any = []
  //       data.forEach((obj:any,p:number)=>{
          
  //           if(obj.type==="list"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('list',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice((x*4)-4,x*4),
  //                   type:"list"
  //                 })
  //               }  
  //             }
  //           }
  //           if(obj.type==="checklist"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('ck',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice(0,4),
  //                   type:"checklist"
  //                 })

  //               }  
  //             }
  //           }
  //           if(obj.type==="paragraph"){
  //             newData.push({
  //               title:header,
  //               infos: obj.data.text,
  //               type:"paragraph"
  //             })
  //           }
  //         p++
  //       })
  //       // console.log(newData)
  //       return newData
  //     }
  //   } catch (error:any) {
  //     console.log(error.message)
  //   }
  // },[])

  // const fwBlock = React.useMemo(async()=>{
  //   try {
  //     let res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/fw`)
  //     let json = await res.json()
  //     if(!json.isErr){
  //       json.data.blocks = await JSON.parse(json.data.blocks)
  //       // console.log(json.data.blocks)
  //       let pages = 0
          
  //       const data = [...json.data.blocks]
  //       let header:string = data.filter(obj=>obj.type==="header")[0].data.text
  //       data.forEach((obj:any,index:number)=>{
  //         if(obj.type==="header"){
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="list" || obj.type==="checklist"){
  //           pages = pages + Math.ceil(obj.data.items.length / 4)
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="paragraph"){
  //           pages++
  //           Object.assign(obj,{page:pages})
  //         }
  //       })
  //       // console.log(pages)
  //       // console.log(data)
  //       let newData:any = []
  //       data.forEach((obj:any,p:number)=>{
          
  //           if(obj.type==="list"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('list',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice((x*4)-4,x*4),
  //                   type:"list"
  //                 })
  //               }  
  //             }
  //           }
  //           if(obj.type==="checklist"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('ck',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice(0,4),
  //                   type:"checklist"
  //                 })

  //               }  
  //             }
  //           }
  //           if(obj.type==="paragraph"){
  //             newData.push({
  //               title:header,
  //               infos: obj.data.text,
  //               type:"paragraph"
  //             })
  //           }
  //         p++
  //       })
  //       // console.log(newData)
  //       return newData
  //     }
  //   } catch (error:any) {
  //     console.log(error.message)
  //   }
  // },[])

  // const wsBlock = React.useMemo(async()=>{
  //   try {
  //     let res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/theme/getEditor/ws`)
  //     let json = await res.json()
  //     if(!json.isErr){
  //       json.data.blocks = await JSON.parse(json.data.blocks)
  //       // console.log(json.data.blocks)
  //       let pages = 0
          
  //       const data = [...json.data.blocks]
  //       let header:string = data.filter(obj=>obj.type==="header")[0].data.text
  //       data.forEach((obj:any,index:number)=>{
  //         if(obj.type==="header"){
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="list" || obj.type==="checklist"){
  //           pages = pages + Math.ceil(obj.data.items.length / 4)
  //           Object.assign(obj,{page:pages})
  //         }
  //         if(obj.type==="paragraph"){
  //           pages++
  //           Object.assign(obj,{page:pages})
  //         }
  //       })
  //       // console.log(pages)
  //       // console.log(data)
  //       let newData:any = []
  //       data.forEach((obj:any,p:number)=>{
          
  //           if(obj.type==="list"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('list',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice((x*4)-4,x*4),
  //                   type:"list"
  //                 })
  //               }  
  //             }
  //           }
  //           if(obj.type==="checklist"){
  //             if(p>0){
  //               for(let x=1;x<=obj.page-data[p-1].page;x++){
  //                 // console.log('ck',obj.data.items.slice((x*4)-4,x*4),x)
  //                 newData.push({
  //                   title:header,
  //                   infos: obj.data.items.slice(0,4),
  //                   type:"checklist"
  //                 })

  //               }  
  //             }
  //           }
  //           if(obj.type==="paragraph"){
  //             newData.push({
  //               title:header,
  //               infos: obj.data.text,
  //               type:"paragraph"
  //             })
  //           }
  //         p++
  //       })
  //       // console.log(newData)
  //       return newData
  //     }
  //   } catch (error:any) {
  //     console.log(error.message)
  //   }
  // },[])
    
  // useEffect(()=>{
  //   Promise.all([lwBlock, fwBlock, wsBlock]).then(res=>{
  //     const allArrays = res[0].concat(res[1],res[2])
  //     setBlock(allArrays)
  //   }).catch(err=>console.log(err.message))
  // },[fwBlock, wsBlock, lwBlock]);

  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();
  const progressValue = useSharedValue<number>(0);

  return (
    <View style={[styles.container,{width: width}]}>
      <ScrollView 
          contentContainerStyle={{
          alignItems: 'center',
          gap: 20,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
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
  carouselBox: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
});
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("languague").del();
    await knex("orders").del();
    await knex("staff_meta").del();
    await knex("customer_meta").del();
    await knex("users").del();

    // Inserts seed entries
    
    await knex("users").insert([
        {
            id:'PASxk06xVwXXcK5cH8Wyj5zHoah1',
            display_name:'test',
            mobile:'51823007',
            email: 'test@gmail.com',
            password: '$2a$10$JUN9Uqt7uEiToHKcaIGroO5HNTtrIDOh/WdJbwyW.iAN7j2SIY0Wq',
            role:'admin'
        },
        {
            id:'dKZ7MVCGhCc9kJ1JYeob6qXlYcF3',
            display_name:'tony',
            mobile:'51823008',
            email: 'tony@gmail.com',
            password: '$2a$10$m7hvMDhAT0s.huoG4L1X/.QpqiguGHEF5uQ1gThs.HjWerAYNYhtu',        
            role:'customer'
        },
        
    ]);
    
    await knex("customer_meta").insert([{
      area:'九龍',
      street:'馬頭圍',
      location:'曦景閣(A座) 17/F 22室',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3"
    }])
    await knex("staff_meta").insert([
    {
      work_location:"home",
      staff_id:'PASxk06xVwXXcK5cH8Wyj5zHoah1'
    },
    // {
    //   work_location:"car",
    //   staff_id:'dKZ7MVCGhCc9kJ1JYeob6qXlYcF4'
    // },
    // {
    //   work_location:"Pa li",
    //   staff_id:'dKZ7MVCGhCc9kJ1JYeob6qXlYcF5'
    // }
  ])
    const ordersData = []
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍曦景閣(A座) 17/F 22室',
        remarks:'remark2',
        status:'w_pickup',
        customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'dc',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍曦景閣(A座) 17/F 22室',
        remarks:'remark2',
        status:'w_pickup',
        customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
      order_type:'ws',
      pc:1,
      tel:"24708888",
      pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
      delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
      full_address:'九龍馬頭圍曦景閣(A座) 17/F 22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
      order_type:'lw',
      pc:1,
      tel:"51823008",
      pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
      delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
      full_address:'九龍馬頭圍曦景閣(A座) 17/F 22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
      order_type:'cs',
      pc:1,
      tel:"51823008",
      pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
      delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
      full_address:'九龍馬頭圍曦景閣(A座) 17/F 22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    await knex("orders").insert(ordersData)

    const languageData = []
    languageData.push({
      type:"portal",
      cn:JSON.stringify({
            aos:{
                  header:"訂單系統",
                  search:"搜尋",
                  tableHeader:["訂單編號","訂單狀態","磅洗","乾洗","洗鞋","皮革 / 洗袋","收衣日期及時段","收衣日期及時段","大區","細區","站","地址","備註"],
                  pagination1:"行",
                  pagination2:"共",
                  pagination3:"頁",
                  resetBtn:"重設",
                  addBtn:"新增",
                  closeBtn:"關閉",
                  modalHeaderAdd:"新增訂單",
                  modalHeaderEdit:"修改訂單",
                  modalHeaderFilter:"過濾",
                },
                as:{
                  header:"頁面系統"
                },
                ass:{
                  header:"管理系統",
                  search:"搜尋",
                  tableHeader:["用戶編號","名稱","電話","郵件","角色"],
                  pagination1:"行",
                  pagination2:"共",
                  pagination3:"頁",
                  resetBtn:"重設",
                  addBtn:"新增",
                  closeBtn:"關閉",
                  modalHeaderAdd:"新增用戶",
                  modalHeaderEdit:"修改用戶",
                  modalHeaderFilter:"過濾",
                },
                ats:{
                  header:"設定"
                }, 
                adminFooterBtn1:"訂單系統",
                adminFooterBtn2:"頁面系統",
                adminFooterBtn3:"管理系統",
                adminFooterBtn4:"設定",
                adminMenuHeader:"選項"
      
      }),
      eng:JSON.stringify({
                aos:{
                  header:"Order System",
                  search:"Search",
                  tableHeader:["Order Id","Order Status","Pound Wash","Dry Cleaning","Wash Shoes","Leather Wash Bag","Pickup Date Time","Pickup Date Time","Area","District","Station","Address","Remarks"],
                  pagination1:" rows ",
                  pagination2:"in total ",
                  pagination3:" pages",
                  resetBtn:"Reset",
                  addBtn:"Add",
                  closeBtn:"Close",
                  modalHeaderAdd:"Add New Order",
                  modalHeaderEdit:"Edit Order",
                  modalHeaderFilter:"Filter",
                },
                as:{
                  header:"Page System"
                },
                ass:{
                  header:"Manage System",
                  search:"Search",
                  tableHeader:["User ID","Username","Tel","Email","Role"],
                  pagination1:" rows ",
                  pagination2:"in total ",
                  pagination3:" pages",
                  resetBtn:"Reset",
                  addBtn:"Add",
                  closeBtn:"Close",
                  modalHeaderAdd:"Add New User",
                  modalHeaderEdit:"Edit User",
                  modalHeaderFilter:"Filter",
                },
                ats:{
                  header:"Setting"
                }, 
                adminFooterBtn1:"Order System",
                adminFooterBtn2:"Page System",
                adminFooterBtn3:"Manage System",
                adminFooterBtn4:"Setting", 
                adminMenuHeader:"Menu"           

      })
    })
    languageData.push({
      type:"footer",
      cn:JSON.stringify({

      }),
      eng:JSON.stringify({

      }),
    })

    await knex("languague").insert(languageData)
    // await knex("languague").insert([
    //     {
    //         cn:JSON.stringify({
    //             cls:{
    //                 switchLan:"中/英",
    //                 cardTitle:"所需服務",
    //                 cardSubTitle:"(可選擇多於一個)",
                    
    //                 selectedBtnText1:"選取",
    //                 selectedBtnText2:"已選取",
    //                 confirmBtnText:"繼續",
    //                 ModalTitle:"下單",
    //                 header:"洗衣服務",
    //                 backBtn:"上一頁",
    //                 priceLtTitle:"價格表",

    //                 flowTitle:"怎樣運作",
    //                 step1Title:"下單",
    //                 step1Des:"選擇適合您日程時間",
    //                 step2Title:"訂單已收衣",
    //                 step2Des:"您的衣物將被領取並發送至我們的清潔護理站",
    //                 step3Title:"訂單已清潔並送回",
    //                 step3Des:"清潔好的衣物將在指定的送貨日期交給您",
                    
    //                 formTitle:"訂單",
                    
                    
        
    //                 formSubTitle:
    //                     "每單最低消費為港幣$120",
                        
        
    //                 itemsSelectBtn:
    //                     "請選擇項目（可多選)",
                        
    //                 serviceList:[
    //                   {
    //                     key:"p",
    //                     name:"磅洗:"  
    //                   },
    //                   {
    //                     key:"d",
    //                     name:"乾 / 濕洗:"  
    //                   },
    //                   {
    //                     key:"w",
    //                     name:"洗鞋服務:",
    //                   },
    //                   {
    //                     key:"l",
    //                     name:"乾洗皮革 / 洗袋",
    //                   },
    //                 ],    
        
    //                 itemTotal:
    //                     "合共(件):",
                        
        
    //                 pickUpDateTimeItem:
    //                     "收衣日期及時段",
                        
        
    //                 pickUpDateTimeButton:
    //                     "請選擇收衣日期及時段",
                        
        
    //                 pickUpDateTimeModal:{
    //                     title:
    //                         "請選擇收衣日期及時段",
                            
                        
    //                     btn:
    //                         "關閉",
                            
                            
    //                 },
    //                 userAddress:{
    //                     title:
    //                         "取貨地址"
                            
    //                     ,
    //                     area:
    //                         "大區"    
    //                     ,
    
    //                     district:
    //                         "細區"   
    //                     ,
    
    //                     station:
    //                         "站"
                            
    //                     ,
    //                     address:
    //                         "地址"
                            
    //                     ,
    
    //                     addressList:[
    //                         {
    //                           key:"1",
    //                           area:"港島",
    //                           area_child:[
    //                             {
    //                               key:"1-1",
    //                               district:"中西區",
    //                               district_child:[
    //                                 {
    //                                   key:"1-1-1",
    //                                   station:"堅尼地城",
    //                                 },
    //                                 {
    //                                   key:"1-1-2",
    //                                   station:"石塘咀",
    //                                 },
    //                                 {
    //                                   key:"1-1-3",
    //                                   station:"西營盤",
    //                                 },
    //                                 {
    //                                   key:"1-1-4",
    //                                   station:"上環",
    //                                 },
    //                                 {
    //                                   key:"1-1-5",
    //                                   station:"中環",
    //                                 },
    //                                 {
    //                                   key:"1-1-6",
    //                                   station:"金鐘",
    //                                 },
    //                                 {
    //                                   key:"1-1-7",
    //                                   station:"半山區",
    //                                 },
    //                                 {
    //                                   key:"1-1-8",
    //                                   station:"山頂",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-2",
    //                               district:"灣仔區",
    //                               district_child:[
    //                                 {
    //                                   key:"1-2-1",
    //                                   station:"灣仔",
    //                                 },
    //                                 {
    //                                   key:"1-2-2",
    //                                   station:"銅鑼灣",
    //                                 },
    //                                 {
    //                                   key:"1-2-3",
    //                                   station:"跑馬地",
    //                                 },
    //                                 {
    //                                   key:"1-2-4",
    //                                   station:"大坑",
    //                                 },
    //                                 {
    //                                   key:"1-2-5",
    //                                   station:"掃桿埔",
    //                                 },
    //                                 {
    //                                   key:"1-2-6",
    //                                   station:"渣甸山",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-3",
    //                               district:"東區",
    //                               district_child:[
    //                                 {
    //                                   key:"1-3-1",
    //                                   station:"天后",
    //                                 },
    //                                 {
    //                                   key:"1-3-2",
    //                                   station:"寶馬山",
    //                                 },
    //                                 {
    //                                   key:"1-3-3",
    //                                   station:"北角",
    //                                 },
    //                                 {
    //                                   key:"1-3-4",
    //                                   station:"鰂魚涌",
    //                                 },
    //                                 {
    //                                   key:"1-3-5",
    //                                   station:"西灣河",
    //                                 },
    //                                 {
    //                                   key:"1-3-6",
    //                                   station:"筲箕灣",
    //                                 },
    //                                 {
    //                                   key:"1-3-7",
    //                                   station:"柴灣",
    //                                 },
    //                                 {
    //                                   key:"1-3-8",
    //                                   station:"小西灣",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-4",
    //                               district:"南區",
    //                               district_child:[
    //                                 {
    //                                   key:"1-4-1",
    //                                   station:"薄扶林",
    //                                 },
    //                                 {
    //                                   key:"1-4-2",
    //                                   station:"香港仔",
    //                                 },
    //                                 {
    //                                   key:"1-4-3",
    //                                   station:"鴨脷洲",
    //                                 },
    //                                 {
    //                                   key:"1-4-4",
    //                                   station:"黃竹坑",
    //                                 },
    //                                 {
    //                                   key:"1-4-5",
    //                                   station:"壽臣山",
    //                                 },
    //                                 {
    //                                   key:"1-4-6",
    //                                   station:"淺水灣",
    //                                 },
    //                                 {
    //                                   key:"1-4-7",
    //                                   station:"舂磡角",
    //                                 },
    //                                 {
    //                                   key:"1-4-8",
    //                                   station:"赤柱",
    //                                 },
    //                                 {
    //                                   key:"1-4-9",
    //                                   station:"大潭",
    //                                 },
    //                                 {
    //                                   key:"1-4-10",
    //                                   station:"石澳",
    //                                 },
    //                               ]
    //                             },
    //                           ]
    //                         },
    //                         {
    //                           key:"2",
    //                           area:"九龍",
    //                           area_child:[
    //                             {
    //                               key:"2-1",
    //                               district:"油尖旺區",
    //                               district_child:[
    //                                 {
    //                                   key:"2-1-1",
    //                                   station:"尖沙咀",
    //                                 },
    //                                 {
    //                                   key:"2-1-2",
    //                                   station:"油麻地",
    //                                 },
    //                                 {
    //                                   key:"2-1-3",
    //                                   station:"西九龍填海區",
    //                                 },
    //                                 {
    //                                   key:"2-1-4",
    //                                   station:"京士柏",
    //                                 },
    //                                 {
    //                                   key:"2-1-5",
    //                                   station:"旺角",
    //                                 },
    //                                 {
    //                                   key:"2-1-6",
    //                                   station:"大角咀",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-2",
    //                               district:"深水埗區",
    //                               district_child:[
    //                                 {
    //                                   key:"2-2-1",
    //                                   station:"美孚",
    //                                 },
    //                                 {
    //                                   key:"2-2-2",
    //                                   station:"荔枝角",
    //                                 },
    //                                 {
    //                                   key:"2-2-3",
    //                                   station:"長沙灣",
    //                                 },
    //                                 {
    //                                   key:"2-2-4",
    //                                   station:"深水埗",
    //                                 },
    //                                 {
    //                                   key:"2-2-5",
    //                                   station:"石硤尾",
    //                                 },
    //                                 {
    //                                   key:"2-2-6",
    //                                   station:"又一村",
    //                                 },
    //                                 {
    //                                   key:"2-2-7",
    //                                   station:"大窩坪",
    //                                 },
    //                                 {
    //                                   key:"2-2-8",
    //                                   station:"昂船洲",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-3",
    //                               district:"九龍城區",
    //                               district_child:[
    //                                 {
    //                                   key:"2-3-1",
    //                                   station:"紅磡",
    //                                 },
    //                                 {
    //                                   key:"2-3-2",
    //                                   station:"土瓜灣",
    //                                 },
    //                                 {
    //                                   key:"2-3-3",
    //                                   station:"馬頭角",
    //                                 },
    //                                 {
    //                                   key:"2-3-4",
    //                                   station:"馬頭圍",
    //                                 },
    //                                 {
    //                                   key:"2-3-5",
    //                                   station:"啟德",
    //                                 },
    //                                 {
    //                                   key:"2-3-6",
    //                                   station:"九龍城",
    //                                 },
    //                                 {
    //                                   key:"2-3-7",
    //                                   station:"何文田",
    //                                 },
    //                                 {
    //                                   key:"2-3-8",
    //                                   station:"九龍塘",
    //                                 },
    //                                 {
    //                                   key:"2-3-9",
    //                                   station:"筆架山",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-4",
    //                               district:"黃大仙區",
    //                               district_child:[
    //                                 {
    //                                   key:"2-4-1",
    //                                   station:"新蒲崗",
    //                                 },
    //                                 {
    //                                   key:"2-4-2",
    //                                   station:"黃大仙",
    //                                 },
    //                                 {
    //                                   key:"2-4-3",
    //                                   station:"東頭",
    //                                 },
    //                                 {
    //                                   key:"2-4-4",
    //                                   station:"橫頭磡",
    //                                 },
    //                                 {
    //                                   key:"2-4-5",
    //                                   station:"樂富",
    //                                 },
    //                                 {
    //                                   key:"2-4-6",
    //                                   station:"鑽石山",
    //                                 },
    //                                 {
    //                                   key:"2-4-7",
    //                                   station:"慈雲山",
    //                                 },
    //                                 {
    //                                   key:"2-4-8",
    //                                   station:"牛池灣",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-5",
    //                               district:"觀塘",
    //                               district_child:[
    //                                 {
    //                                   key:"2-5-1",
    //                                   station:"坪石",
    //                                 },
    //                                 {
    //                                   key:"2-5-2",
    //                                   station:"九龍灣",
    //                                 },
    //                                 {
    //                                   key:"2-5-3",
    //                                   station:"牛頭角",
    //                                 },
    //                                 {
    //                                   key:"2-5-4",
    //                                   station:"佐敦",
    //                                 },
    //                                 {
    //                                   key:"2-5-5",
    //                                   station:"觀塘",
    //                                 },
    //                                 {
    //                                   key:"2-5-6",
    //                                   station:"秀茂坪",
    //                                 },
    //                                 {
    //                                   key:"2-5-7",
    //                                   station:"藍田",
    //                                 },
    //                                 {
    //                                   key:"2-5-8",
    //                                   station:"油塘",
    //                                 },
    //                                 {
    //                                   key:"2-5-9",
    //                                   station:"鯉魚門",
    //                                 },
    //                               ]
    //                             },
    //                           ]    
    //                         },
    //                         {
    //                           key:"3",
    //                           area:"新界",
    //                           area_child:[
    //                             {
    //                               key:"3-1",
    //                               district:"葵青區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-1-1",
    //                                   station:"葵涌",
    //                                 },
    //                                 {
    //                                   key:"3-1-2",
    //                                   station:"青衣",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-2",
    //                               district:"荃灣區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-2-1",
    //                                   station:"荃灣",
    //                                 },
    //                                 {
    //                                   key:"3-2-2",
    //                                   station:"梨木樹",
    //                                 },
    //                                 {
    //                                   key:"3-2-3",
    //                                   station:"汀九",
    //                                 },
    //                                 {
    //                                   key:"3-2-4",
    //                                   station:"深井",
    //                                 },
    //                                 {
    //                                   key:"3-2-5",
    //                                   station:"青龍頭",
    //                                 },
    //                                 {
    //                                   key:"3-2-6",
    //                                   station:"馬灣",
    //                                 },
    //                                 {
    //                                   key:"3-2-7",
    //                                   station:"欣澳",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-3",
    //                               district:"屯門區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-3-1",
    //                                   station:"大欖涌",
    //                                 },
    //                                 {
    //                                   key:"3-3-2",
    //                                   station:"掃管笏",
    //                                 },
    //                                 {
    //                                   key:"3-3-3",
    //                                   station:"屯門",
    //                                 },
    //                                 {
    //                                   key:"3-3-4",
    //                                   station:"藍地",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-4",
    //                               district:"元朗區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-4-1",
    //                                   station:"洪水橋",
    //                                 },
    //                                 {
    //                                   key:"3-4-2",
    //                                   station:"廈村",
    //                                 },
    //                                 {
    //                                   key:"3-4-3",
    //                                   station:"流浮山",
    //                                 },
    //                                 {
    //                                   key:"3-4-4",
    //                                   station:"天水圍",
    //                                 },
    //                                 {
    //                                   key:"3-4-5",
    //                                   station:"元朗",
    //                                 },
    //                                 {
    //                                   key:"3-4-6",
    //                                   station:"新田",
    //                                 },
    //                                 {
    //                                   key:"3-4-7",
    //                                   station:"落馬洲",
    //                                 },
    //                                 {
    //                                   key:"3-4-8",
    //                                   station:"錦田",
    //                                 },
    //                                 {
    //                                   key:"3-4-9",
    //                                   station:"石崗",
    //                                 },
    //                                 {
    //                                   key:"3-4-10",
    //                                   station:"八鄉",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-5",
    //                               district:"北區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-5-1",
    //                                   station:"粉嶺",
    //                                 },
    //                                 {
    //                                   key:"3-5-2",
    //                                   station:"聯和墟",
    //                                 },
    //                                 {
    //                                   key:"3-5-3",
    //                                   station:"上水",
    //                                 },
    //                                 {
    //                                   key:"3-5-4",
    //                                   station:"石湖墟",
    //                                 },
    //                                 {
    //                                   key:"3-5-5",
    //                                   station:"沙頭角",
    //                                 },
    //                                 {
    //                                   key:"3-5-6",
    //                                   station:"鹿頸",
    //                                 },
    //                                 {
    //                                   key:"3-5-7",
    //                                   station:"烏蛟騰",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-6",
    //                               district:"大埔區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-6-1",
    //                                   station:"大埔墟",
    //                                 },
    //                                 {
    //                                   key:"3-6-2",
    //                                   station:"大埔",
    //                                 },
    //                                 {
    //                                   key:"3-6-3",
    //                                   station:"大埔滘",
    //                                 },
    //                                 {
    //                                   key:"3-6-4",
    //                                   station:"大尾篤",
    //                                 },
    //                                 {
    //                                   key:"3-6-5",
    //                                   station:"船灣",
    //                                 },
    //                                 {
    //                                   key:"3-6-6",
    //                                   station:"樟木頭",
    //                                 },
    //                                 {
    //                                   key:"3-6-7",
    //                                   station:"企嶺下",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-7",
    //                               district:"沙田區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-7-1",
    //                                   station:"大圍",
    //                                 },
    //                                 {
    //                                   key:"3-7-2",
    //                                   station:"沙田",
    //                                 },
    //                                 {
    //                                   key:"3-7-3",
    //                                   station:"火炭",
    //                                 },
    //                                 {
    //                                   key:"3-7-4",
    //                                   station:"馬料水",
    //                                 },
    //                                 {
    //                                   key:"3-7-5",
    //                                   station:"烏溪沙",
    //                                 },
    //                                 {
    //                                   key:"3-7-6",
    //                                   station:"馬鞍山",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-8",
    //                               district:"西貢區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-8-1",
    //                                   station:"清水灣",
    //                                 },
    //                                 {
    //                                   key:"3-8-2",
    //                                   station:"西貢",
    //                                 },
    //                                 {
    //                                   key:"3-8-3",
    //                                   station:"大網仔",
    //                                 },
    //                                 {
    //                                   key:"3-8-4",
    //                                   station:"將軍澳",
    //                                 },
    //                                 {
    //                                   key:"3-8-5",
    //                                   station:"坑口",
    //                                 },
    //                                 {
    //                                   key:"3-8-6",
    //                                   station:"調景嶺",
    //                                 },
    //                                 {
    //                                   key:"3-8-7",
    //                                   station:"馬游塘",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-9",
    //                               district:"離島區",
    //                               district_child:[
    //                                 {
    //                                   key:"3-9-1",
    //                                   station:"長洲",
    //                                 },
    //                                 {
    //                                   key:"3-9-2",
    //                                   station:"坪洲",
    //                                 },
    //                                 {
    //                                   key:"3-9-3",
    //                                   station:"大嶼山(包括東涌)",
    //                                 },
    //                                 {
    //                                   key:"3-9-4",
    //                                   station:"南丫島",
    //                                 },
    //                               ]
    //                             },
                                
    //                           ]    
    //                         }
                            
                            
    //                     ],
    
    //                     remark:
    //                         "備註"
                            
    //                     ,
    //                     btn:
    //                         "提交"
                            
                        
    //                 }
        
                    
    //             },
    //             cmo:{
    //                 header:
    //                     "我的訂單",
                        
                    
    //                 orderNoTitle:
    //                     "訂單: ",
                        
                    
    //                 orderStatusTitle:
    //                     "訂單狀態: 待回收",
                        
                    
    //                 orderAmountTitle:
    //                     "訂單價錢: 待定",
                        
                    
    //                 orderReqPickUpDateTime:
    //                     "要求收貨日期時間: ",
                        
                    
    //             },
    //             cs:{
    //                 header:"設定",
    //             },
    //             gls:{
    //               header:"洗衣服務"
    //             },
    //             gs:{
    //               roleList:[{name:"行政",key:"admin"},{name:"洗衣職員",key:"laundryman"},{name:"送貨職員",key:"delivery"},{name:"顧客",key:"customer"}],
    //                 header:"登入 / 註冊",
    //                 segmentBtn1:"登入",
    //                 segmentBtn2:"註冊",
    //                 loginFormTitle:"登入",
    //                 loginFormField1:"手機號碼 / 電郵",
    //                 loginFormField2:"密碼",
    //                 regFormTitle:"註冊",
    //                 regFormField0:"角色",
    //                 regFormField1:"用戶名",
    //                 regFormField2:"手機號碼",
    //                 regFormField3:"電郵",
    //                 regFormField4:"密碼",
    //                 regFormField5:"確認密碼",


    //             },
    //             aos:{
    //               header:"訂單系統",
    //               search:"搜尋",
    //               tableHeader:["訂單編號","訂單狀態","磅洗","乾洗","洗鞋","皮革 / 洗袋","收衣日期及時段","收衣日期及時段","大區","細區","站","地址","備註"],
    //               pagination1:"行",
    //               pagination2:"共",
    //               pagination3:"頁",
    //               resetBtn:"重設",
    //               addBtn:"新增",
    //               closeBtn:"關閉",
    //               modalHeaderAdd:"新增訂單",
    //               modalHeaderEdit:"修改訂單",
    //               modalHeaderFilter:"過濾",
    //             },
    //             as:{
    //               header:"頁面系統"
    //             },
    //             ass:{
    //               header:"管理系統",
    //               search:"搜尋",
    //               tableHeader:["用戶編號","名稱","電話","郵件","角色"],
    //               pagination1:"行",
    //               pagination2:"共",
    //               pagination3:"頁",
    //               resetBtn:"重設",
    //               addBtn:"新增",
    //               closeBtn:"關閉",
    //               modalHeaderAdd:"新增用戶",
    //               modalHeaderEdit:"修改用戶",
    //               modalHeaderFilter:"過濾",
    //             },
    //             ats:{
    //               header:"設定"
    //             }, 
    //             // customerFooterBtn1:"洗衣服務",
    //             // customerFooterBtn2:"我的訂單",
    //             // customerFooterBtn3:"設定",
    //             // guestFooterBtn1:"洗衣服務",    
    //             // guestFooterBtn2:"登入 / 註冊",
            
    //         }),
    //         eng:JSON.stringify({
    //             cls:{
    //                 switchLan:"CN / ENG",
    //                 cardTitle:"Services required",
    //                 cardSubTitle:"Multiple selections possible",
    //                 selectedBtnText1:"Select",
    //                 selectedBtnText2:"Selected",
    //                 confirmBtnText:"Next",
    //                 ModalTitle:"Plave Order",
    //                 header:
                        
    //                     "Laundry Service"
    //                 ,
    //                 backBtn:"Back",
    //                 priceLtTitle:"Price List",

    //                 flowTitle:"How it works",
    //                 step1Title:"Place your order",
    //                 step1Des:"Choose a time that fits your schedule",
    //                 step2Title:"Order pick up",
    //                 step2Des:"Your items will be picked up and sent to our cleaning site",
    //                 step3Title:"Order cleaned & returned",
    //                 step3Des:"Cleaned items will be returned to you on a designated drop off date",
    //                 formTitle:
                        
    //                     "Order"
    //                 ,
    //                 formSubTitle:
                        
    //                     "Minimum charge HKD $120"
    //                 ,
    //                 itemsSelectBtn:
                        
    //                     "Please select items (Multiple select available)"
    //                 ,
    //                 serviceList:[
    //                   {
    //                     key:"p",
    //                     name:"Wash & Fold"
    //                   },
    //                   {
    //                     key:"d",
    //                     name:"Dry Clean & Laundry"
    //                   },
    //                   {
    //                     key:"w",
    //                     name:"Shoes Care"
    //                   },
    //                   {
    //                     key:"l",
    //                     name:"Bag Dry Cleaning"
    //                   },
    //                 ],
                    
    //                 itemTotal:
                        
    //                     "Total(pcs):"
    //                 ,
    //                 pickUpDateTimeItem:
                        
    //                     "Collect date and time"
    //                 ,
    //                 pickUpDateTimeButton:
                        
    //                     "Please select collect date and time"
    //                 ,
    //                 pickUpDateTimeModal:{
    //                     title:
                            
    //                         "Please select collect date and time"
    //                     ,
    //                     btn:
                            
    //                         "Close"
                            
    //                 },
    //                 userAddress:{
    //                     title:
                            
    //                         "Pick up address"
    //                     ,
    //                     area:
                            
    //                         "Area"
    //                     ,
    //                     district:
                            
    //                         "District"
    //                     ,
    //                     station:
                            
    //                         "Station"
    //                     ,
    //                     address:
                            
    //                         "Address"
    //                     ,
    
    //                     addressList:[
    //                         {
    //                           key:"1",
    //                           area:"Hong Kong Island",
    //                           area_child:[
    //                             {
    //                               key:"1-1",
    //                               district:"Central and Western District",
    //                               district_child:[
    //                                 {
    //                                   key:"1-1-1",
    //                                   station:"Kennedy Town",
    //                                 },
    //                                 {
    //                                   key:"1-1-2",
    //                                   station:"Shek Tong Tsui",
    //                                 },
    //                                 {
    //                                   key:"1-1-3",
    //                                   station:"Sai Ying Pun",
    //                                 },
    //                                 {
    //                                   key:"1-1-4",
    //                                   station:"Sheung Wan",
    //                                 },
    //                                 {
    //                                   key:"1-1-5",
    //                                   station:"Central",
    //                                 },
    //                                 {
    //                                   key:"1-1-6",
    //                                   station:"Golden Bell",
    //                                 },
    //                                 {
    //                                   key:"1-1-7",
    //                                   station:"Mid-levels",
    //                                 },
    //                                 {
    //                                   key:"1-1-8",
    //                                   station:"Mountaintop",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-2",
    //                               district:"Wan Chai District",
    //                               district_child:[
    //                                 {
    //                                   key:"1-2-1",
    //                                   station:"Wan Chai",
    //                                 },
    //                                 {
    //                                   key:"1-2-2",
    //                                   station:"Causeway Bay",
    //                                 },
    //                                 {
    //                                   key:"1-2-3",
    //                                   station:"Happy Valley",
    //                                 },
    //                                 {
    //                                   key:"1-2-4",
    //                                   station:"Dakeng",
    //                                 },
    //                                 {
    //                                   key:"1-2-5",
    //                                   station:"So Kon Po",
    //                                 },
    //                                 {
    //                                   key:"1-2-6",
    //                                   station:"Jardine's Lookout",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-3",
    //                               district:"Eastern District",
    //                               district_child:[
    //                                 {
    //                                   key:"1-3-1",
    //                                   station:"Tin Hau",
    //                                 },
    //                                 {
    //                                   key:"1-3-2",
    //                                   station:"Braemar Hill",
    //                                 },
    //                                 {
    //                                   key:"1-3-3",
    //                                   station:"North Point",
    //                                 },
    //                                 {
    //                                   key:"1-3-4",
    //                                   station:"Quarry Bay",
    //                                 },
    //                                 {
    //                                   key:"1-3-5",
    //                                   station:"Sai Wan Ho",
    //                                 },
    //                                 {
    //                                   key:"1-3-6",
    //                                   station:"Shau Kei Wan",
    //                                 },
    //                                 {
    //                                   key:"1-3-7",
    //                                   station:"Chai Wan",
    //                                 },
    //                                 {
    //                                   key:"1-3-8",
    //                                   station:"Siu Sai Wan",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"1-4",
    //                               district:"South Area",
    //                               district_child:[
    //                                 {
    //                                   key:"1-4-1",
    //                                   station:"Pok Fu Lam",
    //                                 },
    //                                 {
    //                                   key:"1-4-2",
    //                                   station:"Hong Kong Guy",
    //                                 },
    //                                 {
    //                                   key:"1-4-3",
    //                                   station:"Ap Lei Chau",
    //                                 },
    //                                 {
    //                                   key:"1-4-4",
    //                                   station:"Wong Chuk Hang",
    //                                 },
    //                                 {
    //                                   key:"1-4-5",
    //                                   station:"Shouson Hill",
    //                                 },
    //                                 {
    //                                   key:"1-4-6",
    //                                   station:"Repulse Bay",
    //                                 },
    //                                 {
    //                                   key:"1-4-7",
    //                                   station:"Chung Hom Kok",
    //                                 },
    //                                 {
    //                                   key:"1-4-8",
    //                                   station:"Stanley",
    //                                 },
    //                                 {
    //                                   key:"1-4-9",
    //                                   station:"Tai Tam",
    //                                 },
    //                                 {
    //                                   key:"1-4-10",
    //                                   station:"Shek O",
    //                                 },
    //                               ]
    //                             },
    //                           ]
    //                         },
    //                         {
    //                           key:"2",
    //                           area:"Kowloon",
    //                           area_child:[
    //                             {
    //                               key:"2-1",
    //                               district:"Yau Tsim Mong District",
    //                               district_child:[
    //                                 {
    //                                   key:"2-1-1",
    //                                   station:"Tsim Sha Tsui",
    //                                 },
    //                                 {
    //                                   key:"2-1-2",
    //                                   station:"Yau Ma Tei",
    //                                 },
    //                                 {
    //                                   key:"2-1-3",
    //                                   station:"West Kowloon Reclamation Area",
    //                                 },
    //                                 {
    //                                   key:"2-1-4",
    //                                   station:"King's Park",
    //                                 },
    //                                 {
    //                                   key:"2-1-5",
    //                                   station:"Mong Kok",
    //                                 },
    //                                 {
    //                                   key:"2-1-6",
    //                                   station:"Tai Kok Tsui",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-2",
    //                               district:"Sham Shui Po District",
    //                               district_child:[
    //                                 {
    //                                   key:"2-2-1",
    //                                   station:"Mei Foo",
    //                                 },
    //                                 {
    //                                   key:"2-2-2",
    //                                   station:"Lai Chi Kok",
    //                                 },
    //                                 {
    //                                   key:"2-2-3",
    //                                   station:"Cheung Sha Wan",
    //                                 },
    //                                 {
    //                                   key:"2-2-3",
    //                                   station:"Sham Shui Po",
    //                                 },
    //                                 {
    //                                   key:"2-2-4",
    //                                   station:"Shek Kip Mei",
    //                                 },
    //                                 {
    //                                   key:"2-2-5",
    //                                   station:"Yau Yat Tsuen",
    //                                 },
    //                                 {
    //                                   key:"2-2-6",
    //                                   station:"Tai Wo Ping",
    //                                 },
    //                                 {
    //                                   key:"2-2-7",
    //                                   station:"Stonecutters Island",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-3",
    //                               district:"Kowloon City District",
    //                               district_child:[
    //                                 {
    //                                   key:"2-3-1",
    //                                   station:"Hung Hom",
    //                                 },
    //                                 {
    //                                   key:"2-3-2",
    //                                   station:"To Kwa Wan",
    //                                 },
    //                                 {
    //                                   key:"2-3-3",
    //                                   station:"Ma Tau Kok",
    //                                 },
    //                                 {
    //                                   key:"2-3-4",
    //                                   station:"Ma Tau Wai",
    //                                 },
    //                                 {
    //                                   key:"2-3-5",
    //                                   station:"Kai Tak",
    //                                 },
    //                                 {
    //                                   key:"2-3-6",
    //                                   station:"Kowloon City",
    //                                 },
    //                                 {
    //                                   key:"2-3-7",
    //                                   station:"Ho Man Tin",
    //                                 },
    //                                 {
    //                                   key:"2-3-8",
    //                                   station:"Kowloon Tong",
    //                                 },
    //                                 {
    //                                   key:"2-3-9",
    //                                   station:"Beacon Hill",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-4",
    //                               district:"Wong Tai Sin District",
    //                               district_child:[
    //                                 {
    //                                   key:"2-4-1",
    //                                   station:"San Po Kong",
    //                                 },
    //                                 {
    //                                   key:"2-4-2",
    //                                   station:"Wong Tai Sin",
    //                                 },
    //                                 {
    //                                   key:"2-4-3",
    //                                   station:"Tung Tau",
    //                                 },
    //                                 {
    //                                   key:"2-4-4",
    //                                   station:"Wang Tau Hom",
    //                                 },
    //                                 {
    //                                   key:"2-4-5",
    //                                   station:"Lok Fu",
    //                                 },
    //                                 {
    //                                   key:"2-4-6",
    //                                   station:"Diamond Head",
    //                                 },
    //                                 {
    //                                   key:"2-4-7",
    //                                   station:"Tsz Wan Shan",
    //                                 },
    //                                 {
    //                                   key:"2-4-8",
    //                                   station:"Ngau Chi Wan",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"2-5",
    //                               district:"Kwun Tong",
    //                               district_child:[
    //                                 {
    //                                   key:"2-5-1",
    //                                   station:"Ping Shek",
    //                                 },
    //                                 {
    //                                   key:"2-5-2",
    //                                   station:"Kowloon Bay",
    //                                 },
    //                                 {
    //                                   key:"2-5-3",
    //                                   station:"Ngau Tau Kok",
    //                                 },
    //                                 {
    //                                   key:"2-5-4",
    //                                   station:"Jordan",
    //                                 },
    //                                 {
    //                                   key:"2-5-5",
    //                                   station:"Kwun Tong",
    //                                 },
    //                                 {
    //                                   key:"2-5-6",
    //                                   station:"Sau Mau Ping",
    //                                 },
    //                                 {
    //                                   key:"2-5-7",
    //                                   station:"Lam Tin",
    //                                 },
    //                                 {
    //                                   key:"2-5-8",
    //                                   station:"Yau Tong",
    //                                 },
    //                                 {
    //                                   key:"2-5-9",
    //                                   station:"Lei Yue Mun",
    //                                 },
    //                               ]
    //                             },
    //                           ]    
    //                         },
    //                         {
    //                           key:"3",
    //                           area:"New Territories",
    //                           area_child:[
    //                             {
    //                               key:"3-1",
    //                               district:"Kwai Tsing District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-1-1",
    //                                   station:"Kwai Chung",
    //                                 },
    //                                 {
    //                                   key:"3-1-2",
    //                                   station:"Tsing Yi",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-2",
    //                               district:"Tsuen Wan District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-2-1",
    //                                   station:"Tsuen Wan",
    //                                 },
    //                                 {
    //                                   key:"3-2-2",
    //                                   station:"Lei Muk Shue",
    //                                 },
    //                                 {
    //                                   key:"3-2-3",
    //                                   station:"Ting Kau",
    //                                 },
    //                                 {
    //                                   key:"3-2-4",
    //                                   station:"Sham Tseng",
    //                                 },
    //                                 {
    //                                   key:"3-2-5",
    //                                   station:"Tsing Lung Tau",
    //                                 },
    //                                 {
    //                                   key:"3-2-6",
    //                                   station:"Ma Wan",
    //                                 },
    //                                 {
    //                                   key:"3-2-7",
    //                                   station:"Sunny Bay",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-3",
    //                               district:"Tuen Mun District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-3-1",
    //                                   station:"Tai Lam Chung",
    //                                 },
    //                                 {
    //                                   key:"3-3-2",
    //                                   station:"So Kwun Wat",
    //                                 },
    //                                 {
    //                                   key:"3-3-3",
    //                                   station:"Tuen Mun",
    //                                 },
    //                                 {
    //                                   key:"3-3-4",
    //                                   station:"Lam Tei",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-4",
    //                               district:"Yuen Long District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-4-1",
    //                                   station:"Hung Shui Kiu",
    //                                 },
    //                                 {
    //                                   key:"3-4-2",
    //                                   station:"Ha Tsuen",
    //                                 },
    //                                 {
    //                                   key:"3-4-3",
    //                                   station:"Lau Fau Shan",
    //                                 },
    //                                 {
    //                                   key:"3-4-4",
    //                                   station:"Tin Shui Wai",
    //                                 },
    //                                 {
    //                                   key:"3-4-5",
    //                                   station:"Yuen Long",
    //                                 },
    //                                 {
    //                                   key:"3-4-6",
    //                                   station:"San Tin",
    //                                 },
    //                                 {
    //                                   key:"3-4-7",
    //                                   station:"Lok Ma Chau",
    //                                 },
    //                                 {
    //                                   key:"3-4-8",
    //                                   station:"Kam Tin",
    //                                 },
    //                                 {
    //                                   key:"3-4-9",
    //                                   station:"Shek Kong",
    //                                 },
    //                                 {
    //                                   key:"3-4-10",
    //                                   station:"Pat Heung",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-5",
    //                               district:"North District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-5-1",
    //                                   station:"Fanling",
    //                                 },
    //                                 {
    //                                   key:"3-5-2",
    //                                   station:"Luen Wo Hui",
    //                                 },
    //                                 {
    //                                   key:"3-5-3",
    //                                   station:"Sheung Shui",
    //                                 },
    //                                 {
    //                                   key:"3-5-4",
    //                                   station:"Shek Wu Hui",
    //                                 },
    //                                 {
    //                                   key:"3-5-5",
    //                                   station:"Sha Tau Kok",
    //                                 },
    //                                 {
    //                                   key:"3-5-6",
    //                                   station:"Luk Keng",
    //                                 },
    //                                 {
    //                                   key:"3-5-7",
    //                                   station:"Wu Kau Tang",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-6",
    //                               district:"Tai Po District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-6-1",
    //                                   station:"Tai Po Market",
    //                                 },
    //                                 {
    //                                   key:"3-6-2",
    //                                   station:"Tai Po",
    //                                 },
    //                                 {
    //                                   key:"3-6-3",
    //                                   station:"Tai Po Kau",
    //                                 },
    //                                 {
    //                                   key:"3-6-4",
    //                                   station:"Tai Mei Tuk",
    //                                 },
    //                                 {
    //                                   key:"3-6-5",
    //                                   station:"Shuen Wan",
    //                                 },
    //                                 {
    //                                   key:"3-6-6",
    //                                   station:"Cheung Muk Tau",
    //                                 },
    //                                 {
    //                                   key:"3-6-7",
    //                                   station:"Kei Ling Ha",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-7",
    //                               district:"Sha Tin District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-7-1",
    //                                   station:"Tai Wai",
    //                                 },
    //                                 {
    //                                   key:"3-7-2",
    //                                   station:"Sha Tin",
    //                                 },
    //                                 {
    //                                   key:"3-7-3",
    //                                   station:"Fo Tan",
    //                                 },
    //                                 {
    //                                   key:"3-7-4",
    //                                   station:"Ma Liu Shui",
    //                                 },
    //                                 {
    //                                   key:"3-7-5",
    //                                   station:"Wu Kai Sha",
    //                                 },
    //                                 {
    //                                   key:"3-7-6",
    //                                   station:"Ma On Shan",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-8",
    //                               district:"Sai Kung District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-8-1",
    //                                   station:"Clear Water Bay",
    //                                 },
    //                                 {
    //                                   key:"3-8-2",
    //                                   station:"Sai Kung",
    //                                 },
    //                                 {
    //                                   key:"3-8-3",
    //                                   station:"Tai Mong Tsai",
    //                                 },
    //                                 {
    //                                   key:"3-8-4",
    //                                   station:"Tseung Kwan O",
    //                                 },
    //                                 {
    //                                   key:"3-8-5",
    //                                   station:"Hang Hau",
    //                                 },
    //                                 {
    //                                   key:"3-8-6",
    //                                   station:"Tiu Keng Leng",
    //                                 },
    //                                 {
    //                                   key:"3-8-7",
    //                                   station:"Ma Yau Tong",
    //                                 },
    //                               ]
    //                             },
    //                             {
    //                               key:"3-9",
    //                               district:"Islands District",
    //                               district_child:[
    //                                 {
    //                                   key:"3-9-1",
    //                                   station:"Cheung Chau",
    //                                 },
    //                                 {
    //                                   key:"3-9-2",
    //                                   station:"Peng Chau",
    //                                 },
    //                                 {
    //                                   key:"3-9-3",
    //                                   station:"Lantau Island(Includes Tung Chung)",
    //                                 },
    //                                 {
    //                                   key:"3-9-4",
    //                                   station:"Lamma Island",
    //                                 },
    //                               ]
    //                             },
                                
    //                           ]    
    //                         }
                            
                            
    //                     ],
    
    
    //                     remark:
                            
    //                         "Remark"
    //                     ,
    //                     btn:
                            
    //                         "Submit"
                        
    //                 }
        
                    
    //             },
    //             cmo:{
    //                 header:
                        
    //                     "My Order"
    //                 ,
    //                 orderNoTitle:
                        
    //                     "Order: "
    //                 ,
    //                 orderStatusTitle:
                        
    //                     "Order Status: To be collected"
    //                 ,
    //                 orderAmountTitle:
                        
    //                     "Order Amount: To be confirmed"
    //                 ,
    //                 orderReqPickUpDateTime:"Requested date time to collect: "
        
    //             },
    //             cs:{
    //                 header:"Setting",
    //             },
    //             gls:{
    //               header:"Laundry Service"
    //             },
    //             gs:{
    //               roleList:[{name:"Admin",key:"admin"},{name:"Laundryman",key:"laundryman"},{name:"Delivery",key:"delivery"},{name:"Customer",key:"customer"}],
    //               header:"Login / Register",
    //               segmentBtn1:"Login",
    //               segmentBtn2:"Register",
    //               loginFormTitle:"Login",
    //               loginFormField1:"Mobile / Email",
    //               loginFormField2:"Password",
    //               regFormTitle:"Register",
    //               regFormField0:"Role",
    //               regFormField1:"Username",
    //               regFormField2:"Mobile",
    //               regFormField3:"Email",
    //               regFormField4:"Password",
    //               regFormField5:"Confirm Password",
    //             },
    //         })
        // }
    // ])
};

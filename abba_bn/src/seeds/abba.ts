import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("editor").del();
    await knex("languague_portal").del();
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
            role:'admin',
            status:'active'
        },
        {
            id:'dKZ7MVCGhCc9kJ1JYeob6qXlYcF3',
            display_name:'jim',
            mobile:'51823008',
            email: 'jim@gmail.com',
            password: '$2a$10$m7hvMDhAT0s.huoG4L1X/.QpqiguGHEF5uQ1gThs.HjWerAYNYhtu',        
            role:'customer',
            status:'active'
        },
        {
            id:'sadadhCc9kJ1JYeasdadXlYcF3',
            display_name:'eddie',
            mobile:'51823009',
            email: 'eddie@gmail.com',
            password: '$2a$10$m7hvMDhAT0s.huoG4L1X/.QpqiguGHEF5uQ1gThs.HjWerAYNYhtu',        
            role:'customer',
            status:'non_active'
        },
        {
            id:'sah8gh8fehCc9kJasdadXlYcF3',
            display_name:'pakhei',
            mobile:'51823010',
            email: 'pakhei@gmail.com',
            password: '$2a$10$m7hvMDhAT0s.huoG4L1X/.QpqiguGHEF5uQ1gThs.HjWerAYNYhtu',        
            role:'delivery',
            status:'active'
        },
        {
            id:'sadadhCc9kJ1JYeasdasgkYcF3',
            display_name:'mei',
            mobile:'51823011',
            email: 'mei@gmail.com',
            password: '$2a$10$m7hvMDhAT0s.huoG4L1X/.QpqiguGHEF5uQ1gThs.HjWerAYNYhtu',        
            role:'laundry',
            status:'active'
        },
        
    ]);
    
    await knex("customer_meta").insert([{
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3"
    }])
    await knex("staff_meta").insert([
    {
      work_location:"九龍馬頭圍|_|曦景閣(A座)17/F|_|22室",
      staff_id:'PASxk06xVwXXcK5cH8Wyj5zHoah1'
    },
    {
      work_location:"car",
      staff_id:'sah8gh8fehCc9kJasdadXlYcF3'
    },
    {
      work_location:"Pa li",
      staff_id:'sadadhCc9kJ1JYeasdasgkYcF3'
    }
  ])
    const ordersData = []
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    ordersData.push({
        order_type:'pw',
        pc:1,
        tel:"24708888",
        pickup_date_time:'Friday, May 26th 2023, 6:39:45 pm',
        delivery_date_time:'Sunday, May 28th 2023, 6:39:45 pm',
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
        full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
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
      full_address:'九龍馬頭圍|_|曦景閣(A座)17/F|_|22室',
      remarks:'remark2',
      status:'w_pickup',
      customer_id:"dKZ7MVCGhCc9kJ1JYeob6qXlYcF3",
    })
    await knex("orders").insert(ordersData)

    const languageData = []
    
    languageData.push({
      type:"footer",
      cn:JSON.stringify({

      }),
      eng:JSON.stringify({

      }),
    })
    


    await knex("languague").insert(languageData)
    await knex("languague_portal").insert([
        {
            cn:JSON.stringify({
                cls:{
                    switchLan:"中/英",
                    cardTitle:"所需服務",
                    cardSubTitle:"(可選擇多於一個)",
                    
                    selectedBtnText1:"選取",
                    selectedBtnText2:"已選取",
                    confirmBtnText:"繼續",
                    ModalTitle:"下單",
                    header:"洗衣服務",
                    backBtn:"上一頁",
                    priceLtTitle:"價格表",

                    flowTitle:"怎樣運作",
                    step1Title:"下單",
                    step1Des:"選擇適合您日程時間",
                    step2Title:"訂單已收衣",
                    step2Des:"您的衣物將被領取並發送至我們的清潔護理站",
                    step3Title:"訂單已清潔並送回",
                    step3Des:"清潔好的衣物將在指定的送貨日期交給您",
                    
                    formTitle:"訂單",
                    
                    
        
                    formSubTitle:
                        "每單最低消費為港幣$120",
                        
        
                    itemsSelectBtn:
                        "請選擇項目（可多選)",
                        
                    
        
                    itemTotal:
                        "合共(件):",
                        
        
                    pickUpDateTimeItem:
                        "收衣日期及時段",
                        
        
                    pickUpDateTimeButton:
                        "請選擇收衣日期及時段",
                        
        
                    pickUpDateTimeModal:{
                        title:
                            "請選擇收衣日期及時段",
                            
                        
                        btn:
                            "關閉",
                            
                            
                    },
                   
                    
                },
                cmo:{
                    header:
                        "我的訂單",
                        
                    
                    orderNoTitle:
                        "訂單: ",
                        
                    
                    orderStatusTitle:
                        "訂單狀態: 待回收",
                        
                    
                    orderAmountTitle:
                        "訂單價錢: 待定",
                        
                    
                    orderReqPickUpDateTime:
                        "要求收貨日期時間: ",
                        
                    
                },
                cs:{
                    header:"設定",
                },
                gls:{
                  header:"洗衣服務"
                },
                gs:{
                  roleList:[{name:"行政",key:"admin"},{name:"顧客",key:"customer"}],
                    header:"登入 / 註冊",
                    segmentBtn1:"登入",
                    segmentBtn2:"註冊",
                    loginFormTitle:"登入",
                    loginFormField1:"手機號碼 / 電郵",
                    loginFormField2:"密碼",
                    regFormTitle:"註冊",
                    regFormField0:"角色",
                    regFormField1:"用戶名",
                    regFormField2:"手機號碼",
                    regFormField3:"電郵",
                    regFormField4:"密碼",
                    regFormField5:"確認密碼",


                },
                aos:{
                  header:"訂單系統",
                  search:"搜尋",
                  tableHeader:["訂單編號","訂單狀態","訂單種類","數量","送衣日期及時段","送衣日期及時段","收衣日期及時段","收衣日期及時段","地址","備註"],
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
                // customerFooterBtn1:"洗衣服務",
                // customerFooterBtn2:"我的訂單",
                // customerFooterBtn3:"設定",
                // guestFooterBtn1:"洗衣服務",    
                // guestFooterBtn2:"登入 / 註冊",
            
            }),
            eng:JSON.stringify({
                cls:{
                    switchLan:"CN / ENG",
                    cardTitle:"Services required",
                    cardSubTitle:"Multiple selections possible",
                    selectedBtnText1:"Select",
                    selectedBtnText2:"Selected",
                    confirmBtnText:"Next",
                    ModalTitle:"Plave Order",
                    header:
                        
                        "Laundry Service"
                    ,
                    backBtn:"Back",
                    priceLtTitle:"Price List",

                    flowTitle:"How it works",
                    step1Title:"Place your order",
                    step1Des:"Choose a time that fits your schedule",
                    step2Title:"Order pick up",
                    step2Des:"Your items will be picked up and sent to our cleaning site",
                    step3Title:"Order cleaned & returned",
                    step3Des:"Cleaned items will be returned to you on a designated drop off date",
                    formTitle:
                        
                        "Order"
                    ,
                    formSubTitle:
                        
                        "Minimum charge HKD $120"
                    ,
                    itemsSelectBtn:
                        
                        "Please select items (Multiple select available)"
                    ,
                    
                    
                    itemTotal:
                        
                        "Total(pcs):"
                    ,
                    pickUpDateTimeItem:
                        
                        "Collect date and time"
                    ,
                    pickUpDateTimeButton:
                        
                        "Please select collect date and time"
                    ,
                    pickUpDateTimeModal:{
                        title:
                            
                            "Please select collect date and time"
                        ,
                        btn:
                            
                            "Close"
                            
                    },
                    userAddress:{
                        title:
                            
                            "Pick up address"
                        ,
                        area:
                            
                            "Area"
                        ,
                        district:
                            
                            "District"
                        ,
                        station:
                            
                            "Station"
                        ,
                        address:
                            
                            "Address"
                        ,
    
                        
    
    
                        remark:
                            
                            "Remark"
                        ,
                        btn:
                            
                            "Submit"
                        
                    }
        
                    
                },
                cmo:{
                    header:
                        
                        "My Order"
                    ,
                    orderNoTitle:
                        
                        "Order: "
                    ,
                    orderStatusTitle:
                        
                        "Order Status: To be collected"
                    ,
                    orderAmountTitle:
                        
                        "Order Amount: To be confirmed"
                    ,
                    orderReqPickUpDateTime:"Requested date time to collect: "
        
                },
                cs:{
                    header:"Setting",
                },
                gls:{
                  header:"Laundry Service"
                },
                gs:{
                  roleList:[{name:"Admin",key:"admin"},{name:"Laundryman",key:"laundryman"},{name:"Delivery",key:"delivery"},{name:"Customer",key:"customer"}],
                  header:"Login / Register",
                  segmentBtn1:"Login",
                  segmentBtn2:"Register",
                  loginFormTitle:"Login",
                  loginFormField1:"Mobile / Email",
                  loginFormField2:"Password",
                  regFormTitle:"Register",
                  regFormField0:"Role",
                  regFormField1:"Username",
                  regFormField2:"Mobile",
                  regFormField3:"Email",
                  regFormField4:"Password",
                  regFormField5:"Confirm Password",
                },
            })
        }
    ])

    const editorData = []
    
    editorData.push(
        {
        editor_type:"pw",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '磅洗',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"dc",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '乾洗',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"ws",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '洗鞋',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"lw",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '洗袋',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"cs",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '改衣',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"fw",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '家居用品',
                        level: 2,
                    },
                },

                {
                    type: 'list',
                    data: {
                        style: 'unordered',
                        items: [
                            '自選時間上門收衫送衫',
                            '只需兩天送達',
                            '另設加急服務',
                        ],
                    },
                },
            ]),
        }
    )
    editorData.push(
        {
        editor_type:"pm",
        blocks:JSON.stringify([
                {
                    type: 'header',
                    data: {
                        text: '一個電話',
                        level: 2,
                    },
                },

                {
                    type: 'header',
                    data: {
                        text: '三步落單',
                        level: 2,
                    },
                },

                {
                    type: 'header',
                    data: {
                        text: '洗衫... 其實唔難👍',
                        level: 2,
                    },
                },
            ]),
        }
    )
    await knex("editor").insert(editorData);
};

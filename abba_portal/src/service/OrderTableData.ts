
import { momentUnix } from "./moment";


export interface Order {
  orderId: number;
  orderType:string;
  pc:number;
  pickupDateTime: string;
  pickupDateTimeUnix: number;
  deliveryDateTime:string;
  deliveryDateTimeUnix: number;
  tel:string;
  
  fullAddress: string;
  remarks: string;
  orderStatus:"w_pickup"|"w_delivery"|"w_service"|"complete";
}
type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
  accessor: any;
  canFilter: boolean;
  sort: string | null;

}



export const data: Order[] = [

  {
    orderId: 1,
    orderType:"",
    pc: 0,
    pickupDateTime: "Monday, May 1st 2023, 8:03:57 pm",
    pickupDateTimeUnix:momentUnix("Monday, May 1st 2023, 8:03:57 pm"),
    deliveryDateTime: "Monday, May 1st 2023, 8:03:57 pm",
    deliveryDateTimeUnix:momentUnix("Monday, May 1st 2023, 8:03:57 pm"),
    tel:"51823007",
    fullAddress: "address",
    remarks: "rem",
    orderStatus:"w_pickup",
    
  },
  


];
export const columns: ColumnDefinitionType<Order, keyof Order>[] = [
  {
    key: 'orderId',
    header: '訂單號碼',
    width: 150,
    accessor: "orderId",
    canFilter: true,
    sort: null,
  },
  {
    key: 'orderType',
    header: '訂單種類',
    width: 150,
    accessor: "orderType",
    canFilter: true,
    sort: null,
  },
  {
    key: 'orderStatus',
    header: '訂單Status',
    width: 150,
    accessor: "orderStatus",
    canFilter: true,
    sort: null,
  },
  {
    key: 'pc',
    header: 'Pc',
    width: 150,
    accessor: "pc",
    canFilter: true,
    sort: null,
  },
  {
    key: 'pickupDateTime',
    header: '收衣日期及時段',
    width: 150,
    accessor: "pickupDateTimeUnix",
    canFilter: true,
    sort: null,
  },
  {
    key: 'pickupDateTimeUnix',
    header: '收衣日期及時段',
    width: 150,
    accessor: "pickupDateTimeUnix",
    canFilter: false,
    sort: null,
  },
  {
    key: 'deliveryDateTime',
    header: '送衣日期及時段',
    width: 150,
    accessor: "deliveryDateTimeUnix",
    canFilter: true,
    sort: null,
  },
  {
    key: 'deliveryDateTimeUnix',
    header: '送衣日期及時段',
    width: 150,
    accessor: "deliveryDateTimeUnix",
    canFilter: false,
    sort: null,
  },
  
  {
    key: 'fullAddress',
    header: '地址',
    width: 150,
    accessor: "fullAddress",
    canFilter: true,
    sort: null,
  },
  {
    key: 'remarks',
    header: '備註',
    width: 150,
    accessor: "remarks",
    canFilter: true,
    sort: null,
  }
]


type Page = {
  numOfRow: number
  curPage: number
  numOfPage: number
  rowPerPage: number
}
export const page: Page = {
  numOfRow: 0,
  curPage: 1,
  numOfPage: 0,
  rowPerPage: 5
}
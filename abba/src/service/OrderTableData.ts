
import { momentUnix } from "./moment";


export interface Order {
  orderId: number;
  orderStatus:"w_pickup"|"w_quote"|"w_clean"|"w_delivery"|"complete";
  poundWash: number;
  dryCleaning: number;
  washShoes: number;
  leatherWashBag: number;
  pickupDateTime: string;
  pickupDateTimeUnix: number;
  area_value: string;
  district_value: string;
  station_value: string;
  address: string;
  remarks: string;
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
    orderStatus:"w_pickup",
    poundWash: 1,
    dryCleaning: 0,
    washShoes: 0,
    leatherWashBag: 0,
    pickupDateTime: "Monday, May 1st 2023, 8:03:57 pm",
    pickupDateTimeUnix:momentUnix("Monday, May 1st 2023, 8:03:57 pm"),
    area_value: "港島",
    district_value: "灣仔區",
    station_value: "銅鑼灣",
    address: "address",
    remarks: "rem",
  },
  {
    orderId: 2,
    orderStatus:"w_pickup",
    poundWash: 2,
    dryCleaning: 0,
    washShoes: 0,
    leatherWashBag: 0,
    pickupDateTime: "Monday, May 1st 2023, 8:03:57 pm",
    pickupDateTimeUnix:momentUnix("Monday, May 1st 2023, 8:03:57 pm"),
    area_value: "港島",
    district_value: "灣仔區",
    station_value: "銅鑼灣",
    address: "address",
    remarks: "rem",
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
    key: 'orderStatus',
    header: '訂單Status',
    width: 150,
    accessor: "orderStatus",
    canFilter: true,
    sort: null,
  },
  {
    key: 'poundWash',
    header: '磅洗',
    width: 150,
    accessor: "poundWash",
    canFilter: true,
    sort: null,

  },
  {
    key: 'dryCleaning',
    header: '乾洗',
    width: 150,
    accessor: "dryCleaning",
    canFilter: true,
    sort: null,
  },
  {
    key: 'washShoes',
    header: '洗鞋',
    width: 150,
    accessor: "washShoes",
    canFilter: false,
    sort: null,
  },
  {
    key: 'leatherWashBag',
    header: '皮革 / 洗袋',
    width: 150,
    accessor: "leatherWashBag",
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
    key: 'area_value',
    header: '大區',
    width: 150,
    accessor: "area",
    canFilter: true,
    sort: null,
  },
  {
    key: 'district_value',
    header: '細區',
    width: 150,
    accessor: "district",
    canFilter: true,
    sort: null,
  },
  {
    key: 'station_value',
    header: '站',
    width: 150,
    accessor: "station",
    canFilter: true,
    sort: null,
  },
  {
    key: 'address',
    header: '地址',
    width: 150,
    accessor: "address",
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
  rowPerPage: 10
}
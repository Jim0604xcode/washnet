

export interface User {
  userId: string;
  displayName: string;
  mobile: string;
  email: string;
  role: "admin"|"laundryman"|"delivery"|"customer",
  status:"active"|"non_active"
}
type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
  accessor: any;
  canFilter: boolean;
  sort: string | null;
}



export const data: User[] = [

  {
    userId: "123",
    displayName: "jim",
    mobile: "51823007",
    email: "logbechan@gmail.com",
    role: "admin",
    status:"active"
  },
  {
    userId: "456",
    displayName: "jim2",
    mobile: "51823006",
    email: "logbechan@gmail2.com",
    role: "customer",
    status:"active"
  }
  


];
export const columns: ColumnDefinitionType<User, keyof User>[] = [
  {
    key: 'userId',
    header: '訂單號碼',
    width: 150,
    accessor: "userId",
    canFilter: true,
    sort: null,
  },
  {
    key: 'displayName',
    header: '訂單號碼',
    width: 150,
    accessor: "displayName",
    canFilter: true,
    sort: null,
  },
  {
    key: 'mobile',
    header: '乾洗',
    width: 150,
    accessor: "mobile",
    canFilter: true,
    sort: null,
  },
  {
    key: 'email',
    header: '洗鞋',
    width: 150,
    accessor: "email",
    canFilter: false,
    sort: null,
  },
  {
    key: 'role',
    header: '皮革 / 洗袋',
    width: 150,
    accessor: "role",
    canFilter: true,
    sort: null,
  },
  {
    key: 'status',
    header: '狀態',
    width: 150,
    accessor: "status",
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
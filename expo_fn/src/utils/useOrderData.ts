import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface FetchResponse<T> {
  data: T;
  isErr: boolean;
  errMess: string;
}

export enum QueryPeriod {
  CURRENT = 'userCurrentOrders',
  HISTORY = 'userOrderHistory'
};

const useOrderData = ( authToken: string | null | undefined, period: QueryPeriod ): UseQueryResult<any, Error> => {

  return useQuery({
    queryKey: ['orderData', authToken],
    queryFn: async () => {
      if (!authToken) {
        throw new Error("Auth token is not provided");
      }
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/${period}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
        });
        if (!res.ok) {
          throw new Error(`${res.status} - ${res.statusText}`);
        }
        const result: FetchResponse<any> = await res.json();
        if (!result.isErr) {
          return result.data;
        } else {
          throw new Error(result.errMess);
        }
      } catch (error) {
        throw error;
      }
    },
    enabled: !!authToken,
  });
};

export default useOrderData;
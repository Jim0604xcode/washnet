import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { EditedMobileReq, EditedAddressReq, EditedPasswordReq } from "@/models";

interface FetchResponse<T> {
  data: T;
  isErr: boolean;
  errMess: string;
}

export type EditedInfo = EditedMobileReq | EditedAddressReq | EditedPasswordReq;

export enum EditAPI {
  MOBILE = 'editUserMobile',
  ADDRESS = 'editUserAddress',
  PASSWORD = 'editUserPassword',
  DELETE = 'delUser'
};

const useEditInfo = (editType: EditAPI) => {
    const { authState } = useAuth();
    const edit = useMutation({
      mutationFn: async (formData: EditedInfo) => {
        try {
          const token = authState?.token;
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/${editType}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
          const result: FetchResponse<null> = await res.json();
          if (!result.isErr) {
            return result.data;
          } else {
            throw new Error(result.errMess);
          };
        } catch (error) {
          // This will automatically be handled by React Query's onError if used
          throw error; // Re-throw the error to ensure it can be caught by React Query's error handling
        }
      }
    });
    return edit;
  };

export default useEditInfo;
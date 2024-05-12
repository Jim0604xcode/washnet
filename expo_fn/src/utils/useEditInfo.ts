import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

interface FetchResponse<T> {
  data: T;
  isErr: boolean;
  errMess: string;
}

export interface EditUserMobile {
  newMobile: string;
  password: string;

}

export enum EditType {
  MOBILE = 'editUserMobile',
  ADDRESS = 'editUserAddress',
  PASSWORD = 'editUserPassword',
  DELETE = 'delUser'
};

const useEditUser = (editType: EditType) => {
    const { authState } = useAuth();
    const edit = useMutation({
      mutationFn: async (formData: EditUserMobile) => {
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

export default useEditUser;
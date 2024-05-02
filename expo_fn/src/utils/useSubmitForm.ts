import { useMutation } from "@tanstack/react-query";
import { FetchOrder } from "@/src/models";
import { useAuth } from "@/src/context/AuthContext";

const useSubmitForm = () => {
    const { authState } = useAuth();
    const submission = useMutation({
      mutationFn: async (formData: FetchOrder) => {
        try {
          const token = authState?.token;
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/order/addOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
          const result = await res.json();
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
    return submission;
  };

export default useSubmitForm;
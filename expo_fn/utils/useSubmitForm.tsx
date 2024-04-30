import { useMutation } from "@tanstack/react-query";
import { Order } from "@/models";

const useSubmitForm = () => {
    const submission = useMutation({
      mutationFn: async (formData: Order) => {
        try {
            // let token = await getValue("token")
          const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/addOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return await res.json();
        } catch (error) {
          // This will automatically be handled by React Query's onError if used
          throw error; // Re-throw the error to ensure it can be caught by React Query's error handling
        }
      }
    });
    return submission;
  };

export default useSubmitForm;
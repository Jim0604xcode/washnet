import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { setStorageItemAsync } from "@/utils/useStorageState";

interface UserProps {
  userState: {
    mobile: string | null;
    address: {
      district: string;
      street: string;
      building: string;
    } | null;
    lng: string | null;
  };
  setUserState: React.Dispatch<
    React.SetStateAction<{
      mobile: string | null;
      address: {
        district: string;
        street: string;
        building: string;
      } | null;
      lng: string | null;
    }>
  >;
  verifyUser: (token: string | null) => Promise<any>;
  getUserInfo: (token: string | null) => Promise<any>;
  setLanguage: (lng: string) => void;
}

const UserContext = React.createContext<Partial<UserProps>>({});

export const useUser = () => {
  return React.useContext(UserContext);
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userState, setUserState] = React.useState<{
    mobile: string | null;
    address: {
      district: string;
      street: string;
      building: string;
    } | null;
    lng: string | null;
  }>({
    mobile: null,
    address: null,
    lng: null,
  });
  const { setAuthState } = useAuth();
  const { i18n } = useTranslation();

  const verifyUser = React.useCallback(
    async (token: string | null) => {
      if (token === null) {
        return false;
      } else {
        try {
          const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/user/getPickUpAddressAndMobile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const result = await res.json();
          if (!result.isErr) {
            setAuthState!({ isAuthenticated: true, token: token });
            setUserState((prevState) => ({
              ...prevState,
              mobile: result.data.tel,
              address: {
                district: result.data.district,
                street: result.data.street,
                building: result.data.building,
              },
            }));
            return true; // Verification successful
          } else {
            throw new Error(result.errMess);
          }
        } catch (error) {
          console.error(error);
          return false; // Verification failed
        }
      }
    },
    [setAuthState, setUserState]
  );

  const getUserInfo = React.useCallback(async (token: string | null) => {
    if (token === null) {
      return;
    } else {
      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/user/getPickUpAddressAndMobile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = await res.json();
        if (!result.isErr) {
          setUserState((prevState) => ({
            ...prevState,
            mobile: result.data.tel,
            address: {
              district: result.data.district,
              street: result.data.street,
              building: result.data.building,
            },
            // lng: prevState.lng, // Keep current language
          }));
        } else {
          throw new Error(result.errMess);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [setUserState]);

  const setLanguage = React.useCallback(async (userLng: string) => {
    if (userLng === null) {
      return;
    }
    setUserState((prevState) => ({
      ...prevState,
      lng: userLng,
    }));
    await setStorageItemAsync("lng", userLng);
  },[setUserState, setStorageItemAsync]);

  React.useEffect(() => {
    if (userState.lng) {
      i18n.changeLanguage(userState.lng);
    }
  }, [userState.lng, i18n]);

  const contextValue = React.useMemo(
    () => ({
      userState,
      setUserState: setUserState,
      verifyUser: verifyUser,
      getUserInfo: getUserInfo,
      setLanguage: setLanguage,
    }),
    [userState, setUserState, verifyUser, getUserInfo, setLanguage]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

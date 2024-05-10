import { setStorageItemAsync, useStorageState } from '@/utils/useStorageState';
import React from 'react';
import { Alert } from 'react-native';
import { LoginRequest, LoginResponse, RegisterRequest } from '../models';
import { useRouter, useSegments } from 'expo-router';

interface AuthProps {
  authState: { 
    isAuthenticated: boolean | null, 
    token: string | null,
    mobile: string | null,
  };
  login: (mobile: string, password: string) => Promise<any>;
  logout: () => void;
  register: ({
    displayName,
    mobile,
    email,
    password,
    confirmPassword,
    district,
    street,
    building,
  }: RegisterRequest) => Promise<any>;
  verify: (token: string | null) => Promise<any>;
};

const AuthContext = React.createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<{
    isAuthenticated: boolean | null,
    token: string | null,
    mobile: string | null,
  }>({
      isAuthenticated: null,
      mobile: null,
      token: null
    })

  const login = React.useCallback(async (mobile: string, password: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          mobileOrEmail: mobile,
          password: password,
        } as LoginRequest),
      });
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`, );
      };
      const result = (await res.json()) as LoginResponse;
      if (!result.isErr) {
        await setStorageItemAsync(
          `${process.env.EXPO_PUBLIC_API_KEY}`,
          result.data.token
        );
        setAuthState({
          isAuthenticated: true,
          token: result.data.token,
          mobile: mobile,
        });
      } else {
        throw new Error(result.errMess as string);
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      Alert.alert("唔好意思...", "請稍後再試");
      console.error(errorMessage);
    }
  }, []);

  const logout = React.useCallback(async() => {
    await setStorageItemAsync(`${process.env.EXPO_PUBLIC_API_KEY}`, null)
    setAuthState({isAuthenticated: false, mobile: null, token: null})
  },[]);

  const register = React.useCallback(async({
      displayName,
      mobile,
      email,
      password,
      confirmPassword,
      district,
      street,
      building,
    }: RegisterRequest) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/register`,{
        headers:{
          "Content-type": "application/json",
        },
        method:"POST",
        body:JSON.stringify({
          displayName,
          mobile,
          email,
          password,
          confirmPassword,
          district,
          street,
          building,
          })  
        }
      )
      const result = await res.json()
      if (!result.isErr){
        await setStorageItemAsync(
          `${process.env.EXPO_PUBLIC_API_KEY}`,
          result.data.token
        );
        setAuthState({
          isAuthenticated: true,
          token: result.data.token,
          mobile: mobile,
        })
      } else if (result.isErr){
        // Alert.alert('請重新註冊');
        throw new Error(result.errMess)
      };
    } catch (err) {
      Alert.alert('請重新註冊');
      console.error('Cannot register for now due to', err)
    }
  },[])

  const verify = React.useCallback(async (token: string | null) => {
    if (token === null) {
      return false;
    } else {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/getPickUpAddressAndMobile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const result = await res.json();
        if (!result.isErr) {
          setAuthState({
            isAuthenticated: true,
            token: token,
            mobile: result.data.tel,
          });
          return true;  // Verification successful
        } else {
          throw new Error(result.errMess);
        }
      } catch (error) {
        console.error('Error verifying:', error);
        return false;  // Verification failed
      }
    }
  }, []);
  
  const contextValue = React.useMemo(() => ({
    authState,
    login: login,
    logout: logout,
    register: register,
    verify : verify
  }), [authState, login, register, logout, verify])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
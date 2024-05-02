import { setStorageItemAsync, useStorageState } from '@/src/utils/useStorageState';
import React from 'react';
import { Alert } from 'react-native';
import { LoginRequest, LoginResponse } from '../models';

interface AuthProps {
  authState: { 
    isAuthenticated: boolean | null, 
    token: string | null,
    tel: string | null,
  },
  login: (tel: string, password: string) => Promise<any>;
  logout: () => void;
  register: (tel: string, password: string) => Promise<any>;
};

const AuthContext = React.createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = React.useState<{
    isAuthenticated: boolean | null,
    token: string | null,
    tel: string | null,
  }>({isAuthenticated: null,
      tel: null,
      token: null
    })

  const login = React.useCallback(async (tel: string, password: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          mobileOrEmail: tel,
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
          tel: tel,
        });
      } else {
        Alert.alert("唔好意思...", "請稍後再試");
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
    setAuthState({isAuthenticated: false, tel: null, token: null})
  },[]);

  const register = React.useCallback(async(tel: string, password: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/register`,{
        headers:{
          "Content-type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({
            mobile: tel,
            password: password
          })  
        }
      )
      const result = await res.json()
      if (!result.isErr){
        setAuthState({
          isAuthenticated: true,
          token: result.data.token,
          tel: tel,
        })
      } else if (result.isErr){
        Alert.alert('請重新註冊');
        throw new Error(result.errMess)
      };
    } catch (err) {
      Alert.alert('請重新註冊');
      console.error('Cannot register for now due to', err)
    }
  },[])

  const contextValue = React.useMemo(() => ({
    authState,
    login: login,
    logout: logout,
    register: register,
  }), [authState, login, register, logout])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
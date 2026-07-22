'use client'
// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import apiFetch, { setDefaultHeader } from 'src/configs/adminaxios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Cookies
import Cookies from 'js-cookie';

// ** Types
import {
  AuthValuesType, LoginParams, ErrCallbackType, ForgotPasswordParams, handelVerifyemailOtpParams,
  handelhandelResetPasswordParams
} from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  permission: null,
  isAuthenticated: false,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  ForgotPassword: () => Promise.resolve(),
  VerifyemailOtp: () => Promise.resolve(),
  ResetPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  stateId: null,
  setStateId: () => Promise.resolve(),
  cityId: null,
  setCityId: () => Promise.resolve(),
  streamId: null,
  setStreamId: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)



type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<any>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(defaultProvider.isAuthenticated)
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [permission] = useState<any>(null);

  const setAuthToken = (token: string) => {
    Cookies.set(authConfig.storageTokenKeyName, token, { expires: 1 });
  }

  const getAuthToken = () => {
    return Cookies.get(authConfig.storageTokenKeyName);
  }

  const removeAuthToken = () => {
    Cookies.remove(authConfig.storageTokenKeyName);
  }

  // ** Hooks
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setLoading(false)

      const storedToken = getAuthToken()!
      setLoading(false);
      setisAuthenticated(true);

      if (storedToken) {
        setLoading(true)
        try {
          const response = await apiFetch.post(authConfig.meEndpoint, {}, {
            headers: { 'x-access-token': storedToken }
          });

          setLoading(false);
          setisAuthenticated(true);
          setUser((response.data as any).data);

          setDefaultHeader('x-access-token', storedToken);
        } catch {
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !pathname.includes('login')) {
            router.replace('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const { email, password } = params;

      const response = await apiFetch.post('/api/auth/signinadmin', { email, password });

      if (response && response.status === 200) {
        const data = (response.data as any).data;
        const accessToken = data.accessToken;

        setAuthToken(accessToken);

        if (accessToken) {
          setDefaultHeader('x-access-token', accessToken);
        }

        setUser(data)
        const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
        const returnUrl = searchParams.get('returnUrl')
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        setisAuthenticated(true);

        router.replace(redirectURL as string)
      }
    }
    catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handelforgotpassword = async (params: ForgotPasswordParams, errorCallback?: ErrCallbackType) => {
    try {
      const { email } = params;
      const response = await apiFetch.post('/api/auth/user/forgotPassword', { email });

      if (response && response.status === 200) {
        return response.data;
      }
    }
    catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handelVerifyemailOtp = async (params: handelVerifyemailOtpParams, errorCallback?: ErrCallbackType) => {
    try {
      const { email, otp } = params;

      const response = await apiFetch.post('api/auth/user/newPassword', { email, otp });

      if (response && response.status === 200) {
        return response.data;
      }
    }
    catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handelResetPassword = async (params: handelhandelResetPasswordParams, errorCallback?: ErrCallbackType) => {
    try {
      const { email, otp, newPassword } = params;

      const response = await apiFetch.post('/api/auth/reset-password', { email, otp, newPassword });

      if (response && response.status === 200) {
        return response.data;
      }
    }
    catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await apiFetch.post('/api/auth/user/signout');

      if (response && response.status === 200) {
        setUser(null)
        setisAuthenticated(false);
        removeAuthToken();
      }
    }
    catch (err: any) {
      console.log(err);
    }
    router.push('/login')
  }

  const values = {
    user,
    isAuthenticated,
    permission,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    ForgotPassword: handelforgotpassword,
    VerifyemailOtp: handelVerifyemailOtp,
    ResetPassword: handelResetPassword,
    logout: handleLogout,
    stateId,
    setStateId,
    cityId,
    setCityId,
    streamId,
    setStreamId,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }

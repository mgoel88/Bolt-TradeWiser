import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  role: string;
  profilePictureUrl?: string;
  appPermissions: {
    pricing_tool: boolean;
    logistics: boolean;
    warehousing: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  sendEmailOtp: (email: string) => Promise<void>;
  verifyEmailOtp: (email: string, otp: string) => Promise<void>;
  sendMobileOtp: (phone: string) => Promise<void>;
  verifyMobileOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  companyName?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL - uses warehousing service backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://warehousing.tradewiser.in';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    
    // Set up token refresh interval (every 13 minutes, before 15min expiry)
    const interval = setInterval(() => {
      refreshToken();
    }, 13 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAuth = async () => {
    try {
      // Try to refresh token to check if user is authenticated
      await refreshToken();
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${data.user.email}`
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setUser(result.user);
      setAccessToken(result.accessToken);
      localStorage.setItem('accessToken', result.accessToken);
      
      toast({
        title: 'Account created!',
        description: 'Welcome to TradeWiser'
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const loginWithGoogle = async (idToken: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google login failed');
      }

      setUser(data.user);
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      toast({
        title: 'Welcome!',
        description: `Logged in with Google as ${data.user.email}`
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Google login failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const sendEmailOtp = async (email: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/email/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      toast({
        title: 'OTP Sent',
        description: 'Check your email for the verification code'
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Failed to send OTP',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const verifyEmailOtp = async (email: string, otp: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/email/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      setUser(data.user);
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      toast({
        title: 'Verified!',
        description: 'Email verified successfully'
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Verification failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const sendMobileOtp = async (phone: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/mobile/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      toast({
        title: 'OTP Sent',
        description: 'Check your mobile for the verification code'
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Failed to send OTP',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const verifyMobileOtp = async (phone: string, otp: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/mobile/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ phone, otp })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      setUser(data.user);
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      
      toast({
        title: 'Verified!',
        description: 'Mobile number verified successfully'
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: 'Verification failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully'
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        
        // Optionally fetch user data if not already set
        if (!user && data.user) {
          setUser(data.user);
        }
      } else {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        isAuthenticated: !!user,
        error,
        login, 
        register, 
        loginWithGoogle,
        sendEmailOtp,
        verifyEmailOtp,
        sendMobileOtp,
        verifyMobileOtp,
        logout, 
        refreshToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Axios interceptor for adding auth token
export function setupAuthInterceptor() {
  // This can be called in main.tsx to set up axios interceptors
  const token = localStorage.getItem('accessToken');
  return token;
}

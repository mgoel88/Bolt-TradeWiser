import React, { useState } from 'react';
import { useNavigate } from 'wouter';
import { useAuth } from '@/lib/auth-context-complete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Eye, EyeOff, Mail, Phone, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    google?: any;
  }
}

export default function LoginComplete() {
  const [, navigate] = useNavigate();
  const { login, loginWithGoogle, sendEmailOtp, verifyEmailOtp, sendMobileOtp, verifyMobileOtp } = useAuth();
  const { toast } = useToast();

  // Credentials tab state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [credentialsLoading, setCredentialsLoading] = useState(false);

  // Email OTP tab state
  const [emailOtpEmail, setEmailOtpEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(0);

  // Mobile OTP tab state
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileResendTimer, setMobileResendTimer] = useState(0);

  // Google OAuth state
  const [googleLoading, setGoogleLoading] = useState(false);

  // Handle credentials login
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setCredentialsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            await loginWithGoogle(response.credential);
            navigate('/');
          } catch (error) {
            console.error('Google login failed:', error);
          } finally {
            setGoogleLoading(false);
          }
        }
      });

      window.google.accounts.id.prompt();
    } else {
      toast({
        title: 'Google Sign-In not available',
        description: 'Please try again later',
        variant: 'destructive'
      });
      setGoogleLoading(false);
    }
  };

  // Handle email OTP send
  const handleSendEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailOtpLoading(true);

    try {
      await sendEmailOtp(emailOtpEmail);
      setEmailOtpSent(true);
      setEmailResendTimer(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setEmailResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to send email OTP:', error);
    } finally {
      setEmailOtpLoading(false);
    }
  };

  // Handle email OTP verify
  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailOtpLoading(true);

    try {
      await verifyEmailOtp(emailOtpEmail, emailOtp);
      navigate('/');
    } catch (error) {
      console.error('Email OTP verification failed:', error);
    } finally {
      setEmailOtpLoading(false);
    }
  };

  // Handle mobile OTP send
  const handleSendMobileOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format phone number
    let formattedPhone = mobileNumber.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
    }

    setMobileOtpLoading(true);

    try {
      await sendMobileOtp(formattedPhone);
      setMobileOtpSent(true);
      setMobileResendTimer(60);
      
      // Start countdown
      const interval = setInterval(() => {
        setMobileResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to send mobile OTP:', error);
    } finally {
      setMobileOtpLoading(false);
    }
  };

  // Handle mobile OTP verify
  const handleVerifyMobileOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let formattedPhone = mobileNumber.trim();
    if (!formattedPhone.startsWith('+91')) {
      formattedPhone = '+91' + formattedPhone.replace(/^0+/, '');
    }

    setMobileOtpLoading(true);

    try {
      await verifyMobileOtp(formattedPhone, mobileOtp);
      navigate('/');
    } catch (error) {
      console.error('Mobile OTP verification failed:', error);
    } finally {
      setMobileOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">TradeWiser Login</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="credentials" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="credentials">
                <Lock className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Password</span>
              </TabsTrigger>
              <TabsTrigger value="google">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="hidden sm:inline ml-1">Google</span>
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger value="mobile">
                <Phone className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
            </TabsList>

            {/* Credentials Tab */}
            <TabsContent value="credentials">
              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={credentialsLoading}>
                  {credentialsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
                <div className="text-center text-sm">
                  <a href="/forgot-password" className="text-amber-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </form>
            </TabsContent>

            {/* Google Tab */}
            <TabsContent value="google">
              <div className="space-y-4 py-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Sign in with your Google account for quick access
                </p>
              </div>
            </TabsContent>

            {/* Email OTP Tab */}
            <TabsContent value="email">
              {!emailOtpSent ? (
                <form onSubmit={handleSendEmailOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-otp-email">Email Address</Label>
                    <Input
                      id="email-otp-email"
                      type="email"
                      placeholder="you@example.com"
                      value={emailOtpEmail}
                      onChange={(e) => setEmailOtpEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={emailOtpLoading}>
                    {emailOtpLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyEmailOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-otp">Enter OTP</Label>
                    <Input
                      id="email-otp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      OTP sent to {emailOtpEmail}
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={emailOtpLoading}>
                    {emailOtpLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  <div className="flex justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setEmailOtpSent(false);
                        setEmailOtp('');
                      }}
                      className="text-amber-600 hover:underline"
                    >
                      Change email
                    </button>
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      disabled={emailResendTimer > 0}
                      className="text-amber-600 hover:underline disabled:text-gray-400"
                    >
                      {emailResendTimer > 0 ? `Resend in ${emailResendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </form>
              )}
            </TabsContent>

            {/* Mobile OTP Tab */}
            <TabsContent value="mobile">
              {!mobileOtpSent ? (
                <form onSubmit={handleSendMobileOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-number">Mobile Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        +91
                      </span>
                      <Input
                        id="mobile-number"
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={mobileOtpLoading}>
                    {mobileOtpLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyMobileOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-otp">Enter OTP</Label>
                    <Input
                      id="mobile-otp"
                      type="text"
                      placeholder="123456"
                      maxLength={6}
                      value={mobileOtp}
                      onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      OTP sent to +91{mobileNumber}
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={mobileOtpLoading}>
                    {mobileOtpLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  <div className="flex justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOtpSent(false);
                        setMobileOtp('');
                      }}
                      className="text-amber-600 hover:underline"
                    >
                      Change number
                    </button>
                    <button
                      type="button"
                      onClick={handleSendMobileOtp}
                      disabled={mobileResendTimer > 0}
                      className="text-amber-600 hover:underline disabled:text-gray-400"
                    >
                      {mobileResendTimer > 0 ? `Resend in ${mobileResendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </form>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/register" className="text-amber-600 hover:underline font-medium">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

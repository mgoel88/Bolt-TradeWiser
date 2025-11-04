import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get tokens from URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (!accessToken) {
          throw new Error('No access token received');
        }

        // Send tokens to backend to complete authentication
        const response = await fetch('/api/google-sso/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken })
        });

        const data = await response.json();

        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Successfully signed in with Google'
          });
          setLocation('/dashboard');
        } else {
          throw new Error(data.error || 'Authentication failed');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Authentication failed',
          variant: 'destructive'
        });
        setLocation('/login');
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
}

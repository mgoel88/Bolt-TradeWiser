import React from 'react';
import { Route, Switch } from 'wouter';
import { AuthProvider } from './lib/auth-context';
import { Toaster } from './components/ui/toaster';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import PhoneLogin from './pages/PhoneLogin';

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/auth/callback" component={AuthCallback} />
        <Route path="/phone-login" component={PhoneLogin} />
      </Switch>
      <Toaster />
    </AuthProvider>
  );
}

export default App;

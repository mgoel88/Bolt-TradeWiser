import { useAuth } from '@/lib/auth-context';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BarChart3, Truck, Warehouse, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  const apps = [
    {
      id: 'pricing_tool',
      name: 'Pricing Tool',
      description: 'Market prices and forecasting',
      icon: BarChart3,
      url: 'http://pricing-tool.tradewiser.in',
      color: 'from-blue-500 to-blue-600',
      enabled: user.appPermissions.pricing_tool
    },
    {
      id: 'logistics',
      name: 'Logistics Partners',
      description: 'Manage logistics and trips',
      icon: Truck,
      url: 'http://logistics.tradewiser.in',
      color: 'from-green-500 to-green-600',
      enabled: user.appPermissions.logistics
    },
    {
      id: 'warehousing',
      name: 'Warehousing Service',
      description: 'Warehouse and inventory management',
      icon: Warehouse,
      url: 'http://warehousing.tradewiser.in',
      color: 'from-purple-500 to-purple-600',
      enabled: user.appPermissions.warehousing
    }
  ];

  const handleAppClick = (app: typeof apps[0]) => {
    if (!app.enabled) {
      alert('You do not have access to this application. Please contact your administrator.');
      return;
    }

    // Open app in new tab with auth token
    window.open(app.url, '_blank');
  };

  const handleLogout = async () => {
    await logout();
    setLocation('/login');
  };

  const initials = user.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">TW</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TradeWiser</h1>
                <p className="text-sm text-gray-500">Centralized Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.fullName.split(' ')[0]}!</h2>
          <p className="text-gray-600">Select an application to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <Card
                key={app.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  app.enabled ? 'hover:scale-105' : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => handleAppClick(app)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{app.name}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {app.enabled ? (
                    <Button className="w-full" variant="outline">
                      Open Application
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Access Denied
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* User Info Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-base font-semibold capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Tenant ID</p>
                <p className="text-base font-mono text-xs">{user.tenantId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

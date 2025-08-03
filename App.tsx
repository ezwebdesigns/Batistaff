import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { WorkerDashboard } from './components/WorkerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { UserCheck, Shield } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<'worker' | 'admin'>('worker');
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentWorkerId, setCurrentWorkerId] = useState<string | null>(null);

  // Mock user profiles
  const workerProfile = {
    name: 'Alexandre Dupont',
    email: 'alexandre.dupont@email.com',
    avatar: undefined,
    progress: 68
  };

  const adminProfile = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@stitchai.ca',
    avatar: undefined
  };

  const currentProfile = userRole === 'worker' ? workerProfile : adminProfile;

  const handleViewChange = (view: string, workerId?: string) => {
    setCurrentView(view);
    if (workerId) {
      setCurrentWorkerId(workerId);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher - Demo only */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2 bg-card border rounded-lg p-2">
          <Button
            size="sm"
            variant={userRole === 'worker' ? 'default' : 'outline'}
            onClick={() => {
              setUserRole('worker');
              setCurrentView('dashboard');
            }}
            className="gap-2"
          >
            <UserCheck className="w-4 h-4" />
            Worker
          </Button>
          <Button
            size="sm"
            variant={userRole === 'admin' ? 'default' : 'outline'}
            onClick={() => {
              setUserRole('admin');
              setCurrentView('dashboard');
            }}
            className="gap-2"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        <Sidebar
          userRole={userRole}
          currentView={currentView}
          onViewChange={(view) => handleViewChange(view)}
          userProfile={currentProfile}
        />
        
        {/* Main Content */}
        <div className="flex-1 ml-16">
          {userRole === 'worker' ? (
            <WorkerDashboard currentView={currentView} />
          ) : (
            <AdminDashboard 
              currentView={currentView} 
              onViewChange={handleViewChange}
            />
          )}
        </div>
      </div>

      {/* Language Toggle - Fixed position */}
      <div className="fixed bottom-4 right-4">
        <div className="flex items-center gap-2 bg-card border rounded-lg p-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            EN
          </Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            FR
          </Badge>
        </div>
      </div>
    </div>
  );
}
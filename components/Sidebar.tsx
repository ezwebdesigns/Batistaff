import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  GraduationCap,
  Upload,
  CheckCircle,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface SidebarProps {
  userRole: 'worker' | 'admin';
  currentView: string;
  onViewChange: (view: string) => void;
  userProfile: {
    name: string;
    email: string;
    avatar?: string;
    progress?: number;
  };
}

export function Sidebar({ userRole, currentView, onViewChange, userProfile }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const workerMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'onboarding', label: 'Onboarding Path', icon: GraduationCap },
    { id: 'training', label: 'Training Modules', icon: BookOpen },
    { id: 'documents', label: 'My Documents', icon: Upload },
    { id: 'certifications', label: 'Certifications', icon: CheckCircle },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'workers', label: 'Manage Workers', icon: Users },
    { id: 'approvals', label: 'Approvals', icon: FileText },
    { id: 'training-admin', label: 'Training Management', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Communications', icon: MessageSquare },
  ];

  const menuItems = userRole === 'worker' ? workerMenuItems : adminMenuItems;

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-40 ${
        isExpanded ? 'w-72' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            {isExpanded && (
              <div className="overflow-hidden">
                <h1 className="text-sidebar-foreground whitespace-nowrap">Stitch AI</h1>
                <p className="text-xs text-sidebar-foreground/70 whitespace-nowrap">Construction Bridge</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div className="overflow-hidden flex-1">
                <p className="text-sidebar-foreground truncate">{userProfile.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{userProfile.email}</p>
                {userRole === 'worker' && userProfile.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-sidebar-foreground/70">Progress</span>
                      <span className="text-sidebar-foreground">{userProfile.progress}%</span>
                    </div>
                    <div className="w-full bg-sidebar-accent rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${userProfile.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                } ${isExpanded ? 'px-3' : 'px-3 justify-center'}`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isExpanded && <span className="truncate">{item.label}</span>}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-sidebar-accent ${
              isExpanded ? 'px-3' : 'px-3 justify-center'
            }`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span>Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 h-11 text-sidebar-foreground hover:bg-sidebar-accent ${
              isExpanded ? 'px-3' : 'px-3 justify-center'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span>Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
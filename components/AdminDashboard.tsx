import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { UserProfile } from './UserProfile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  BarChart3,
  FileText,
  MapPin,
  Calendar,
  Plus,
  Edit,
  Download,
  Printer,
  Share2,
  Eye,
  MoreHorizontal,
  Filter,
  Search,
  ArrowLeft,
  Save,
  X,
  Mail,
  Phone,
  ExternalLink,
  Copy,
  Upload
} from 'lucide-react';

interface AdminDashboardProps {
  currentView: string;
  onViewChange?: (view: string, workerId?: string) => void;
}

export function AdminDashboard({ currentView, onViewChange }: AdminDashboardProps) {
  const dashboardContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminOverview />;
      case 'profile':
        return <UserProfile userRole="admin" />;
      case 'workers':
        return <WorkerManagement onViewChange={onViewChange} />;
      case 'worker-profile':
        return <WorkerProfileManager onViewChange={onViewChange} />;
      case 'approvals':
        return <ApprovalsQueue />;
      case 'training-admin':
        return <TrainingManagement />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <AdminMessages />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex-1 p-6">
      {dashboardContent()}
    </div>
  );
}

function AdminOverview() {
  const stats = [
    { label: 'Active Workers', value: '142', change: '+12', icon: Users, color: 'text-blue-500' },
    { label: 'Pending Approvals', value: '28', change: '+5', icon: Clock, color: 'text-orange-500' },
    { label: 'Completed This Month', value: '67', change: '+23', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Training Modules', value: '18', change: '+2', icon: BookOpen, color: 'text-purple-500' }
  ];

  const recentActivity = [
    { type: 'approval', message: 'Alexandre Dupont - Documents approved', time: '10 minutes ago' },
    { type: 'completion', message: 'Maria Rodriguez completed Safety Training', time: '1 hour ago' },
    { type: 'upload', message: 'James Smith uploaded new certification', time: '2 hours ago' },
    { type: 'message', message: 'New message from Sarah Anderson', time: '3 hours ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage workers and track system performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} this week</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2">
              <FileCheck className="w-6 h-6" />
              Review Approvals
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              Add New Worker
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              Create Training
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              Send Announcement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Pending Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'approval' ? 'bg-green-500' :
                  activity.type === 'completion' ? 'bg-blue-500' :
                  activity.type === 'upload' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border border-red-200 rounded-lg bg-red-50">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div className="flex-1">
                <p className="text-sm">15 documents pending review</p>
                <p className="text-xs text-muted-foreground">Overdue by 2 days</p>
              </div>
              <Button size="sm" variant="destructive">Review</Button>
            </div>

            <div className="flex items-center gap-3 p-3 border border-orange-200 rounded-lg bg-orange-50">
              <Clock className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm">8 workers need training assignment</p>
                <p className="text-xs text-muted-foreground">Waiting for next steps</p>
              </div>
              <Button size="sm" variant="outline">Assign</Button>
            </div>

            <div className="flex items-center gap-3 p-3 border border-blue-200 rounded-lg bg-blue-50">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm">12 unread messages</p>
                <p className="text-xs text-muted-foreground">From workers and staff</p>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WorkerManagement({ onViewChange }: { onViewChange?: (view: string, workerId?: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTrade, setFilterTrade] = useState('all');
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);

  const workers = [
    {
      id: 1,
      name: 'Alexandre Dupont',
      email: 'alexandre.dupont@email.com',
      country: 'France',
      trade: 'Electrician',
      progress: 68,
      status: 'active',
      lastActivity: '2 hours ago',
      joinDate: '2025-01-10',
      phone: '+33 6 12 34 56 78'
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      country: 'Spain',
      trade: 'Plumber',
      progress: 85,
      status: 'review',
      lastActivity: '1 day ago',
      joinDate: '2025-01-08',
      phone: '+34 6 98 76 54 32'
    },
    {
      id: 3,
      name: 'James Smith',
      email: 'james.smith@email.com',
      country: 'Ireland',
      trade: 'Carpenter',
      progress: 42,
      status: 'active',
      lastActivity: '3 hours ago',
      joinDate: '2025-01-12',
      phone: '+353 86 123 4567'
    },
    {
      id: 4,
      name: 'Anna Kowalski',
      email: 'anna.kowalski@email.com',
      country: 'Poland',
      trade: 'Welder',
      progress: 91,
      status: 'ready',
      lastActivity: '5 hours ago',
      joinDate: '2025-01-05',
      phone: '+48 512 345 678'
    }
  ];

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.trade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || worker.status === filterStatus;
    const matchesTrade = filterTrade === 'all' || worker.trade === filterTrade;
    
    return matchesSearch && matchesStatus && matchesTrade;
  });

  const handleViewProfile = (workerId: number) => {
    onViewChange?.('worker-profile', workerId.toString());
  };

  const handleExportProfile = (worker: any) => {
    // In a real app, this would generate a PDF
    console.log('Exporting profile for:', worker.name);
    alert(`Exporting profile for ${worker.name} (PDF generation would happen here)`);
  };

  const handlePrintProfile = (worker: any) => {
    // In a real app, this would open a print dialog
    console.log('Printing profile for:', worker.name);
    window.print();
  };

  const handleShareProfile = (worker: any) => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`https://stitchai.com/profiles/${worker.id}`);
    alert(`Profile link for ${worker.name} copied to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Worker Management</h1>
          <p className="text-muted-foreground">Monitor and manage worker progress</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Dialog open={isAddWorkerOpen} onOpenChange={setIsAddWorkerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Worker
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <AddWorkerForm onClose={() => setIsAddWorkerOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search workers by name, email, or trade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="ready">Job Ready</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTrade} onValueChange={setFilterTrade}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trades</SelectItem>
                <SelectItem value="Electrician">Electrician</SelectItem>
                <SelectItem value="Plumber">Plumber</SelectItem>
                <SelectItem value="Carpenter">Carpenter</SelectItem>
                <SelectItem value="Welder">Welder</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Workers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Workers ({filteredWorkers.length})</CardTitle>
              <CardDescription>Overview of registered workers and their progress</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{worker.name}</p>
                        <p className="text-sm text-muted-foreground">{worker.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {worker.country}
                    </div>
                  </TableCell>
                  <TableCell>{worker.trade}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={worker.progress} className="w-16" />
                      <span className="text-sm">{worker.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      worker.status === 'ready' ? 'default' :
                      worker.status === 'review' ? 'destructive' :
                      'secondary'
                    }>
                      {worker.status === 'ready' ? 'Job Ready' :
                       worker.status === 'review' ? 'Under Review' :
                       'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{worker.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewProfile(worker.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(worker.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewProfile(worker.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleExportProfile(worker)}>
                            <Download className="w-4 h-4 mr-2" />
                            Export PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrintProfile(worker)}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareProfile(worker)}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Profile
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ApprovalsQueue() {
  const pendingApprovals = [
    {
      id: 1,
      workerName: 'Alexandre Dupont',
      documentType: 'Electrical License',
      submittedDate: '2025-01-28',
      priority: 'high',
      reviewTime: '3 days overdue'
    },
    {
      id: 2,
      workerName: 'Maria Rodriguez',
      documentType: 'Work Experience Letter',
      submittedDate: '2025-01-30',
      priority: 'medium',
      reviewTime: '2 days remaining'
    },
    {
      id: 3,
      workerName: 'James Smith',
      documentType: 'Language Certificate',
      submittedDate: '2025-02-01',
      priority: 'low',
      reviewTime: '4 days remaining'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Approvals Queue</h1>
        <p className="text-muted-foreground">Review and approve worker documents and certifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Pending Review</p>
                <p className="text-2xl">28</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Approved Today</p>
                <p className="text-2xl">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Overdue</p>
                <p className="text-2xl">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Documents waiting for your review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <Card key={approval.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3>{approval.workerName}</h3>
                        <p className="text-muted-foreground">{approval.documentType}</p>
                        <p className="text-xs text-muted-foreground">Submitted: {approval.submittedDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={
                        approval.priority === 'high' ? 'destructive' :
                        approval.priority === 'medium' ? 'default' :
                        'secondary'
                      }>
                        {approval.priority} priority
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-sm">{approval.reviewTime}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="destructive">Reject</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrainingManagement() {
  const trainingModules = [
    {
      id: 1,
      title: 'Canadian Workplace Culture',
      enrolled: 142,
      completed: 138,
      avgScore: 87,
      lastUpdated: '2025-01-15'
    },
    {
      id: 2,
      title: 'Safety Fundamentals',
      enrolled: 135,
      completed: 129,
      avgScore: 92,
      lastUpdated: '2025-01-20'
    },
    {
      id: 3,
      title: 'Workplace Hazard Recognition',
      enrolled: 98,
      completed: 45,
      avgScore: 78,
      lastUpdated: '2025-01-25'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Training Management</h1>
          <p className="text-muted-foreground">Manage training modules and track completion rates</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Create Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Modules</p>
                <p className="text-2xl">18</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Completion Rate</p>
                <p className="text-2xl">78%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Score</p>
                <p className="text-2xl">85%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
          <CardDescription>Overview of all training modules and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.title}</TableCell>
                  <TableCell>{module.enrolled}</TableCell>
                  <TableCell>{module.completed}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(module.completed / module.enrolled) * 100} className="w-16" />
                      <span className="text-sm">{Math.round((module.completed / module.enrolled) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{module.avgScore}%</TableCell>
                  <TableCell>{module.lastUpdated}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics & Insights</h1>
        <p className="text-muted-foreground">Track system performance and worker progression</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Workers</p>
                <p className="text-2xl">142</p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Job Ready</p>
                <p className="text-2xl">38</p>
                <p className="text-sm text-green-600">+8 this month</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Time to Ready</p>
                <p className="text-2xl">45 days</p>
                <p className="text-sm text-green-600">-5 days</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Success Rate</p>
                <p className="text-2xl">87%</p>
                <p className="text-sm text-green-600">+3% this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Worker Progress Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>0-25% Complete</span>
                <div className="flex items-center gap-2">
                  <Progress value={25} className="w-32" />
                  <span className="text-sm">18 workers</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>26-50% Complete</span>
                <div className="flex items-center gap-2">
                  <Progress value={45} className="w-32" />
                  <span className="text-sm">32 workers</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>51-75% Complete</span>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-32" />
                  <span className="text-sm">54 workers</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>76-100% Complete</span>
                <div className="flex items-center gap-2">
                  <Progress value={90} className="w-32" />
                  <span className="text-sm">38 workers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>France</span>
                <span>28 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Spain</span>
                <span>22 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Poland</span>
                <span>19 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Ireland</span>
                <span>16 workers</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Germany</span>
                <span>14 workers</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AddWorkerForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    trade: '',
    experience: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the worker to the database
    console.log('Adding new worker:', formData);
    alert(`Worker ${formData.firstName} ${formData.lastName} has been added successfully!`);
    onClose();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Add New Worker</DialogTitle>
        <DialogDescription>
          Enter the worker's basic information to create their profile
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select onValueChange={(value) => setFormData({...formData, country: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="spain">Spain</SelectItem>
                <SelectItem value="poland">Poland</SelectItem>
                <SelectItem value="ireland">Ireland</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="italy">Italy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="trade">Trade *</Label>
            <Select onValueChange={(value) => setFormData({...formData, trade: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select trade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electrician">Electrician</SelectItem>
                <SelectItem value="plumber">Plumber</SelectItem>
                <SelectItem value="carpenter">Carpenter</SelectItem>
                <SelectItem value="welder">Welder</SelectItem>
                <SelectItem value="hvac">HVAC Technician</SelectItem>
                <SelectItem value="mason">Mason</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Input
            id="experience"
            type="number"
            min="0"
            max="50"
            value={formData.experience}
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Any additional information about the worker..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            <Plus className="w-4 h-4 mr-2" />
            Add Worker
          </Button>
        </div>
      </form>
    </div>
  );
}

function WorkerProfileManager({ onViewChange }: { onViewChange?: (view: string) => void }) {
  const [currentWorkerId, setCurrentWorkerId] = useState('1');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock worker data - in real app would fetch based on currentWorkerId
  const workerData = {
    id: 1,
    name: 'Alexandre Dupont',
    email: 'alexandre.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    country: 'France',
    city: 'Lyon',
    address: '123 Rue de la République',
    postalCode: '69002',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    trade: 'Electrician',
    experience: 12,
    progress: 68,
    status: 'active',
    joinDate: '2025-01-10',
    lastActivity: '2 hours ago',
    languages: [
      { language: 'French', level: 'Native' },
      { language: 'English', level: 'B2' },
      { language: 'Spanish', level: 'A1' }
    ],
    coreSkills: ['Residential Wiring', 'Commercial Electrical Systems', 'Motor Control', 'PLC Programming'],
    certifications: [
      { name: 'French Electrical License', status: 'active', expiryDate: '2029-01-15' },
      { name: 'CSTS', status: 'active', expiryDate: '2026-08-20' },
      { name: 'WHMIS 2015', status: 'active', expiryDate: '2026-09-15' },
      { name: 'CCQ Card', status: 'pending', expiryDate: null }
    ]
  };

  const handleExport = () => {
    alert(`Exporting profile for ${workerData.name} as PDF...`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`https://stitchai.com/profiles/${workerData.id}`);
    alert('Profile link copied to clipboard!');
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${workerData.email}?subject=Regarding your Stitch AI profile`;
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onViewChange?.('workers')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workers
          </Button>
          <div>
            <h1>{workerData.name}</h1>
            <p className="text-muted-foreground">Manage worker profile and documentation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Worker Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-xl">
                {workerData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2>{workerData.name}</h2>
                <Badge variant="default">{workerData.trade}</Badge>
                <Badge variant="outline">{workerData.experience} years experience</Badge>
                <Badge variant={
                  workerData.status === 'ready' ? 'default' :
                  workerData.status === 'review' ? 'destructive' :
                  'secondary'
                }>
                  {workerData.status === 'ready' ? 'Job Ready' :
                   workerData.status === 'review' ? 'Under Review' :
                   'Active'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{workerData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{workerData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{workerData.city}, {workerData.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {workerData.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="mb-2">
                <p className="text-muted-foreground">Progress</p>
                <p className="text-2xl">{workerData.progress}%</p>
              </div>
              <Progress value={workerData.progress} className="w-24" />
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" onClick={handleSendEmail}>
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="skills">Skills & Trade</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Overall Progress</p>
                    <p className="text-2xl">{workerData.progress}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <Progress value={workerData.progress} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Documents</p>
                    <p className="text-2xl">7/10</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <Progress value={70} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Certifications</p>
                    <p className="text-2xl">3/4</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-500" />
                </div>
                <Progress value={75} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground">Training</p>
                    <p className="text-2xl">12/18</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-500" />
                </div>
                <Progress value={67} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common actions for this worker</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <FileCheck className="w-5 h-5" />
                  Approve Documents
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Message
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Upload className="w-5 h-5" />
                  Request Documents
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Users className="w-5 h-5" />
                  Assign Training
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal">
          <WorkerPersonalInfo workerData={workerData} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="skills">
          <WorkerSkillsInfo workerData={workerData} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="documents">
          <WorkerDocumentsInfo workerData={workerData} />
        </TabsContent>

        <TabsContent value="certifications">
          <WorkerCertificationsInfo workerData={workerData} />
        </TabsContent>

        <TabsContent value="activity">
          <WorkerActivityInfo workerData={workerData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components for WorkerProfileManager tabs
function WorkerPersonalInfo({ workerData, isEditing }: { workerData: any; isEditing: boolean }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Worker's personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={workerData.name} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={workerData.email} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={workerData.phone} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input type="date" value={workerData.dateOfBirth} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input value={workerData.address} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={workerData.city} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input value={workerData.postalCode} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={workerData.country} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WorkerSkillsInfo({ workerData, isEditing }: { workerData: any; isEditing: boolean }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trade & Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Trade</Label>
              <Input value={workerData.trade} disabled={!isEditing} />
            </div>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input value={workerData.experience} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {workerData.coreSkills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WorkerDocumentsInfo({ workerData }: { workerData: any }) {
  const documents = [
    { name: 'Passport', status: 'approved', uploadDate: '2025-01-15' },
    { name: 'Birth Certificate', status: 'approved', uploadDate: '2025-01-15' },
    { name: 'Electrical License', status: 'review', uploadDate: '2025-01-20' },
    { name: 'Work Experience Letter', status: 'approved', uploadDate: '2025-01-22' },
    { name: 'English Test Results', status: 'pending', uploadDate: null }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Status</CardTitle>
        <CardDescription>Review and manage worker documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h4>{doc.name}</h4>
                  {doc.uploadDate && (
                    <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={
                  doc.status === 'approved' ? 'default' :
                  doc.status === 'review' ? 'destructive' :
                  'secondary'
                }>
                  {doc.status === 'approved' ? 'Approved' :
                   doc.status === 'review' ? 'Under Review' :
                   'Required'}
                </Badge>
                <div className="flex gap-2">
                  {doc.status !== 'pending' && (
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  {doc.status === 'review' && (
                    <>
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="outline" size="sm">Request Changes</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WorkerCertificationsInfo({ workerData }: { workerData: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications & Licenses</CardTitle>
        <CardDescription>Professional credentials and safety certifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workerData.certifications.map((cert: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <CheckCircle className={`w-6 h-6 ${
                  cert.status === 'active' ? 'text-green-500' : 'text-orange-500'
                }`} />
                <div>
                  <h4>{cert.name}</h4>
                  {cert.expiryDate && (
                    <p className="text-sm text-muted-foreground">Expires: {cert.expiryDate}</p>
                  )}
                </div>
              </div>
              <Badge variant={cert.status === 'active' ? 'default' : 'destructive'}>
                {cert.status === 'active' ? 'Active' : 'Pending'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WorkerActivityInfo({ workerData }: { workerData: any }) {
  const activities = [
    { type: 'document', message: 'Uploaded electrical license', time: '2 hours ago' },
    { type: 'training', message: 'Completed Safety Fundamentals module', time: '1 day ago' },
    { type: 'profile', message: 'Updated contact information', time: '3 days ago' },
    { type: 'message', message: 'Sent message to advisor', time: '5 days ago' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Worker's recent actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'document' ? 'bg-blue-500' :
                activity.type === 'training' ? 'bg-green-500' :
                activity.type === 'profile' ? 'bg-purple-500' :
                'bg-orange-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AdminMessages() {
  const messages = [
    {
      id: 1,
      from: 'Alexandre Dupont',
      subject: 'Question about document requirements',
      preview: 'I have a question about the language assessment requirements...',
      timestamp: '2 hours ago',
      unread: true,
      priority: 'normal'
    },
    {
      id: 2,
      from: 'Sarah Anderson',
      subject: 'Training module update needed',
      preview: 'The safety module needs to be updated with new regulations...',
      timestamp: '4 hours ago',
      unread: false,
      priority: 'high'
    },
    {
      id: 3,
      from: 'Maria Rodriguez',
      subject: 'Document review feedback',
      preview: 'Thank you for the feedback on my electrical license...',
      timestamp: '1 day ago',
      unread: false,
      priority: 'normal'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Communications</h1>
          <p className="text-muted-foreground">Manage messages and send announcements</p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${
            message.unread ? 'border-primary' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{message.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3>{message.from}</h3>
                      {message.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">High Priority</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{message.subject}</p>
                    <p className="text-sm text-muted-foreground mt-1">{message.preview}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  {message.unread && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
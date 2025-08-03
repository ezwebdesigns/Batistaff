import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserProfile } from './UserProfile';
import { 
  BookOpen, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Upload,
  MessageSquare,
  MapPin,
  Calendar,
  Award,
  Languages
} from 'lucide-react';

interface WorkerDashboardProps {
  currentView: string;
}

export function WorkerDashboard({ currentView }: WorkerDashboardProps) {
  const dashboardContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'profile':
        return <UserProfile userRole="worker" />;
      case 'onboarding':
        return <OnboardingPath />;
      case 'training':
        return <TrainingModules />;
      case 'documents':
        return <DocumentManagement />;
      case 'certifications':
        return <Certifications />;
      case 'messages':
        return <Messages />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex-1 p-6">
      {dashboardContent()}
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Welcome back, Alexandre!</h1>
        <p className="text-muted-foreground">Here's your progress toward working in Canada</p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Overall Progress</p>
                <p className="text-2xl">68%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={68} className="mt-3" />
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
                <p className="text-muted-foreground">Training</p>
                <p className="text-2xl">12/18</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
            <Progress value={67} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Certifications</p>
                <p className="text-2xl">3/5</p>
              </div>
              <Award className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={60} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>Priority actions to advance your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div className="flex-1">
              <h4>Complete Language Assessment</h4>
              <p className="text-muted-foreground">Upload your English/French proficiency certificates</p>
            </div>
            <Badge variant="destructive">Urgent</Badge>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Clock className="w-6 h-6 text-blue-500" />
            <div className="flex-1">
              <h4>Safety Training Module 3</h4>
              <p className="text-muted-foreground">Complete "Workplace Hazard Recognition"</p>
            </div>
            <Badge variant="secondary">In Progress</Badge>
          </div>

          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <FileText className="w-6 h-6 text-green-500" />
            <div className="flex-1">
              <h4>Upload Trade Certificates</h4>
              <p className="text-muted-foreground">Submit your electrical certification documents</p>
            </div>
            <Badge variant="outline">Pending</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">John Davis - Immigration Advisor</p>
                <p className="text-sm text-muted-foreground">Your document review is complete. Please check the feedback section.</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">Sarah Anderson - Training Coordinator</p>
                <p className="text-sm text-muted-foreground">New safety module available. Complete by end of week.</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm">Language Assessment Due</p>
                <p className="text-xs text-muted-foreground">February 15, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm">Safety Training Completion</p>
                <p className="text-xs text-muted-foreground">February 20, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm">Document Review Session</p>
                <p className="text-xs text-muted-foreground">February 25, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OnboardingPath() {
  const steps = [
    { id: 1, title: 'Personal Information', status: 'completed', description: 'Basic profile and contact details' },
    { id: 2, title: 'Document Upload', status: 'completed', description: 'ID, passport, and personal documents' },
    { id: 3, title: 'Trade Certification', status: 'in-progress', description: 'Professional qualifications and experience' },
    { id: 4, title: 'Language Assessment', status: 'pending', description: 'English/French proficiency verification' },
    { id: 5, title: 'Safety Training', status: 'pending', description: 'Canadian workplace safety standards' },
    { id: 6, title: 'CCQ Registration', status: 'pending', description: 'Quebec construction commission card' },
    { id: 7, title: 'Job Matching', status: 'pending', description: 'Connect with potential employers' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Your Onboarding Path</h1>
        <p className="text-muted-foreground">Follow these steps to become employment-ready in Canada</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id} className={`${step.status === 'in-progress' ? 'border-primary' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3>{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <Badge variant={
                  step.status === 'completed' ? 'default' :
                  step.status === 'in-progress' ? 'destructive' :
                  'secondary'
                }>
                  {step.status === 'completed' ? 'Completed' :
                   step.status === 'in-progress' ? 'In Progress' :
                   'Pending'}
                </Badge>

                {step.status !== 'completed' && (
                  <Button variant={step.status === 'in-progress' ? 'default' : 'outline'}>
                    {step.status === 'in-progress' ? 'Continue' : 'Start'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TrainingModules() {
  const modules = [
    { id: 1, title: 'Canadian Workplace Culture', duration: '45 min', progress: 100, status: 'completed' },
    { id: 2, title: 'Safety Fundamentals', duration: '60 min', progress: 100, status: 'completed' },
    { id: 3, title: 'Workplace Hazard Recognition', duration: '30 min', progress: 65, status: 'in-progress' },
    { id: 4, title: 'Personal Protective Equipment', duration: '40 min', progress: 0, status: 'pending' },
    { id: 5, title: 'Construction Site Communication', duration: '35 min', progress: 0, status: 'pending' },
    { id: 6, title: 'Quebec Construction Code', duration: '90 min', progress: 0, status: 'pending' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Training Modules</h1>
        <p className="text-muted-foreground">Complete these modules to prepare for Canadian construction work</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription>{module.duration}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={module.progress} />
              <div className="flex items-center justify-between">
                <Badge variant={
                  module.status === 'completed' ? 'default' :
                  module.status === 'in-progress' ? 'destructive' :
                  'secondary'
                }>
                  {module.status === 'completed' ? 'Completed' :
                   module.status === 'in-progress' ? 'In Progress' :
                   'Not Started'}
                </Badge>
                <Button size="sm" variant={module.status === 'pending' ? 'outline' : 'default'}>
                  {module.status === 'completed' ? 'Review' :
                   module.status === 'in-progress' ? 'Continue' :
                   'Start'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DocumentManagement() {
  const documents = [
    { id: 1, name: 'Passport', type: 'Identity', status: 'approved', uploadDate: '2025-01-15' },
    { id: 2, name: 'Birth Certificate', type: 'Identity', status: 'approved', uploadDate: '2025-01-15' },
    { id: 3, name: 'Electrical License', type: 'Certification', status: 'review', uploadDate: '2025-01-20' },
    { id: 4, name: 'Work Experience Letter', type: 'Experience', status: 'approved', uploadDate: '2025-01-22' },
    { id: 5, name: 'English Test Results', type: 'Language', status: 'pending', uploadDate: null }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Document Management</h1>
          <p className="text-muted-foreground">Upload and manage your required documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3>{doc.name}</h3>
                    <p className="text-muted-foreground">{doc.type}</p>
                    {doc.uploadDate && (
                      <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
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
                  
                  {doc.status === 'pending' ? (
                    <Button variant="outline">Upload</Button>
                  ) : (
                    <Button variant="ghost">View</Button>
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

function Certifications() {
  const certifications = [
    { id: 1, name: 'Construction Safety Training System (CSTS)', status: 'completed', expiryDate: '2026-12-15' },
    { id: 2, name: 'Workplace Hazardous Materials Information System (WHMIS)', status: 'completed', expiryDate: '2026-08-20' },
    { id: 3, name: 'Fall Protection Certification', status: 'in-progress', expiryDate: null },
    { id: 4, name: 'CCQ Competency Card', status: 'pending', expiryDate: null },
    { id: 5, name: 'First Aid & CPR', status: 'pending', expiryDate: null }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Certifications</h1>
        <p className="text-muted-foreground">Track your safety certifications and professional credentials</p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Award className={`w-8 h-8 ${
                    cert.status === 'completed' ? 'text-green-500' :
                    cert.status === 'in-progress' ? 'text-blue-500' :
                    'text-gray-400'
                  }`} />
                  <div>
                    <h3>{cert.name}</h3>
                    {cert.expiryDate && (
                      <p className="text-muted-foreground">Expires: {cert.expiryDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={
                    cert.status === 'completed' ? 'default' :
                    cert.status === 'in-progress' ? 'destructive' :
                    'secondary'
                  }>
                    {cert.status === 'completed' ? 'Completed' :
                     cert.status === 'in-progress' ? 'In Progress' :
                     'Required'}
                  </Badge>
                  
                  <Button variant="outline">
                    {cert.status === 'completed' ? 'View Certificate' :
                     cert.status === 'in-progress' ? 'Continue' :
                     'Start'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Messages() {
  const conversations = [
    {
      id: 1,
      name: 'John Davis',
      role: 'Immigration Advisor',
      lastMessage: 'Your document review is complete. Please check the feedback section.',
      timestamp: '2 hours ago',
      unread: true,
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Anderson',
      role: 'Training Coordinator',
      lastMessage: 'New safety module available. Complete by end of week.',
      timestamp: '1 day ago',
      unread: false,
      avatar: 'SA'
    },
    {
      id: 3,
      name: 'Mike Thompson',
      role: 'Job Placement Specialist',
      lastMessage: 'I have a potential match for your profile. Let\'s schedule a call.',
      timestamp: '3 days ago',
      unread: false,
      avatar: 'MT'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Messages</h1>
        <p className="text-muted-foreground">Communicate with your advisors and support team</p>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Card key={conversation.id} className={`cursor-pointer hover:shadow-md transition-shadow ${
            conversation.unread ? 'border-primary' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{conversation.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3>{conversation.name}</h3>
                    <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{conversation.role}</p>
                  <p className="text-sm mt-1">{conversation.lastMessage}</p>
                </div>
                {conversation.unread && (
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
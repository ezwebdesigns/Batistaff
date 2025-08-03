import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Award,
  Shield,
  Bell,
  Lock,
  Camera,
  Edit,
  Save,
  X,
  Languages,
  Globe,
  GraduationCap,
  FileText,
  Wrench,
  Star,
  Upload,
  Plus,
  CheckCircle,
  Clock,
  MapIcon,
  Users,
  Building,
  Zap,
  Home,
  Factory,
  Target,
  TrendingUp,
  Image as ImageIcon,
  Eye,
  Download
} from 'lucide-react';

interface UserProfileProps {
  userRole: 'worker' | 'admin';
}

export function UserProfile({ userRole }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (userRole === 'worker') {
    return <WorkerProfile isEditing={isEditing} setIsEditing={setIsEditing} />;
  } else {
    return <AdminProfile isEditing={isEditing} setIsEditing={setIsEditing} />;
  }
}

function WorkerProfile({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (editing: boolean) => void }) {
  // Mock worker data
  const workerData = {
    name: 'Alexandre Dupont',
    email: 'alexandre.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    country: 'France',
    city: 'Lyon',
    address: '123 Rue de la République',
    postalCode: '69002',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    languages: [
      { language: 'French', level: 'Native' },
      { language: 'English', level: 'B2' },
      { language: 'Spanish', level: 'A1' }
    ],
    immigrationStatus: 'Temporary Work Permit',
    availableRegions: ['Quebec', 'Ontario', 'British Columbia'],
    trade: 'Electrician',
    experience: 12,
    coreSkills: ['Residential Wiring', 'Commercial Electrical Systems', 'Motor Control', 'PLC Programming'],
    specializations: ['Industrial Automation', 'Renewable Energy Systems', 'High Voltage Systems'],
    projectTypes: ['Residential', 'Commercial', 'Industrial'],
    jobReadiness: 85,
    joinDate: '2025-01-10',
    progress: 68
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>My Profile</h1>
          <p className="text-muted-foreground">Complete your professional profile to connect with Canadian employers</p>
        </div>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="skills">Skills & Trade</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="journey">My Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalInformationSection userData={workerData} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <SkillsAndTradeSection userData={workerData} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="qualifications" className="space-y-6">
          <ProfessionalQualificationsSection isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <CertificationsAndLicensesSection isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <ProjectsAndAchievementsSection isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <DocumentsSection isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <MyJourneySection userData={workerData} />
        </TabsContent>
      </Tabs>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(false)} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}

function PersonalInformationSection({ userData, isEditing }: { userData: any; isEditing: boolean }) {
  return (
    <>
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-xl">
                  {userData.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2>{userData.name}</h2>
                <Badge variant="default">{userData.trade}</Badge>
                <Badge variant="outline">{userData.experience} years experience</Badge>
              </div>
              
              <div className="space-y-1 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.city}, {userData.country}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-muted-foreground">Profile Completion</p>
              <p className="text-2xl">{userData.progress}%</p>
              <Progress value={userData.progress} className="w-24 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={userData.name} 
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={userData.email} 
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={userData.phone} 
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input 
                id="dob" 
                type="date" 
                value={userData.dateOfBirth} 
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select disabled={!isEditing}>
                <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue placeholder={userData.gender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Current Address</CardTitle>
            <CardDescription>Your residential address and location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input 
                id="address" 
                value={userData.address} 
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={userData.city} 
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input 
                  id="postalCode" 
                  value={userData.postalCode} 
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select disabled={!isEditing}>
                <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue placeholder={userData.country} />
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
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
            <CardDescription>Languages you speak and proficiency levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {userData.languages.map((lang: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Languages className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">{lang.language}</p>
                      <p className="text-xs text-muted-foreground">{lang.level}</p>
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Language
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Immigration & Work Authorization */}
        <Card>
          <CardHeader>
            <CardTitle>Immigration Status</CardTitle>
            <CardDescription>Work authorization and available regions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="immigrationStatus">Current Status</Label>
              <Select disabled={!isEditing}>
                <SelectTrigger className={!isEditing ? "bg-muted" : ""}>
                  <SelectValue placeholder={userData.immigrationStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work-permit">Temporary Work Permit</SelectItem>
                  <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                  <SelectItem value="citizen">Canadian Citizen</SelectItem>
                  <SelectItem value="applying">Applying for Work Permit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Available Work Regions</Label>
              <div className="space-y-2">
                {userData.availableRegions.map((region: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{region}</span>
                  </div>
                ))}
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Region
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function SkillsAndTradeSection({ userData, isEditing }: { userData: any; isEditing: boolean }) {
  return (
    <>
      {/* Trade Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h2>{userData.trade}</h2>
              <p className="text-muted-foreground">{userData.experience} years of professional experience</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Job Readiness: {userData.jobReadiness}%</span>
                </div>
                <Progress value={userData.jobReadiness} className="w-32" />
              </div>
            </div>
            {isEditing && (
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Trade
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Core Skills</CardTitle>
            <CardDescription>Your primary technical competencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {userData.coreSkills.map((skill: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-blue-500" />
                    <span className="text-sm">{skill}</span>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle>Areas of Expertise</CardTitle>
            <CardDescription>Specialized knowledge and advanced skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {userData.specializations.map((spec: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">{spec}</span>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Specialization
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Project Types Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Project Experience</CardTitle>
          <CardDescription>Types of construction projects you have worked on</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.projectTypes.map((type: string, index: number) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                  {type === 'Residential' && <Home className="w-6 h-6 text-primary" />}
                  {type === 'Commercial' && <Building className="w-6 h-6 text-primary" />}
                  {type === 'Industrial' && <Factory className="w-6 h-6 text-primary" />}
                </div>
                <h4>{type}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {type === 'Residential' && 'Houses, apartments, condos'}
                  {type === 'Commercial' && 'Offices, retail, restaurants'}
                  {type === 'Industrial' && 'Factories, warehouses, plants'}
                </p>
              </div>
            ))}
          </div>
          {isEditing && (
            <Button variant="outline" className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Project Type
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Skills Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Assessment</CardTitle>
          <CardDescription>Professional evaluation of your technical abilities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Technical Proficiency</span>
                <span className="text-sm">85%</span>
              </div>
              <Progress value={85} />
              
              <div className="flex justify-between items-center">
                <span>Safety Knowledge</span>
                <span className="text-sm">92%</span>
              </div>
              <Progress value={92} />
              
              <div className="flex justify-between items-center">
                <span>Code Compliance</span>
                <span className="text-sm">78%</span>
              </div>
              <Progress value={78} />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Problem Solving</span>
                <span className="text-sm">88%</span>
              </div>
              <Progress value={88} />
              
              <div className="flex justify-between items-center">
                <span>Team Collaboration</span>
                <span className="text-sm">95%</span>
              </div>
              <Progress value={95} />
              
              <div className="flex justify-between items-center">
                <span>Communication</span>
                <span className="text-sm">82%</span>
              </div>
              <Progress value={82} />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h4>Overall Job Readiness</h4>
                <p className="text-sm text-muted-foreground">Based on skills, certifications, and experience</p>
              </div>
              <div className="text-right">
                <p className="text-2xl">{userData.jobReadiness}%</p>
                <Badge variant="default">Ready for Placement</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ProfessionalQualificationsSection({ isEditing }: { isEditing: boolean }) {
  const qualifications = [
    {
      id: 1,
      type: 'Vocational Training',
      program: 'Electrical Systems Technology',
      institution: 'Lyon Technical Institute',
      location: 'Lyon, France',
      completionDate: '2007-06-15',
      duration: '2 years',
      credentials: 'Diploma in Electrical Technology'
    },
    {
      id: 2,
      type: 'Apprenticeship',
      program: 'Journeyman Electrician Program',
      institution: 'Schneider Electric',
      location: 'Lyon, France',
      completionDate: '2009-12-20',
      duration: '2 years',
      credentials: 'Journeyman Electrician Certificate'
    },
    {
      id: 3,
      type: 'Continuing Education',
      program: 'Industrial Automation Systems',
      institution: 'CNAM Lyon',
      location: 'Lyon, France',
      completionDate: '2018-03-10',
      duration: '6 months',
      credentials: 'Professional Certificate'
    }
  ];

  return (
    <>
      {/* Education Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Professional Qualifications</CardTitle>
              <CardDescription>Your educational background and vocational training</CardDescription>
            </div>
            {isEditing && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Qualification
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {qualifications.map((qual) => (
              <Card key={qual.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3>{qual.program}</h3>
                          <Badge variant="outline">{qual.type}</Badge>
                        </div>
                        
                        <p className="text-muted-foreground">{qual.institution}</p>
                        <p className="text-sm text-muted-foreground">{qual.location}</p>
                        
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Completed: {qual.completionDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>Duration: {qual.duration}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <Badge variant="secondary">{qual.credentials}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Training */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workshops & Seminars</CardTitle>
            <CardDescription>Additional professional development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm">Advanced PLC Programming</p>
                <p className="text-xs text-muted-foreground">Siemens Training Center - 2022</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm">Solar Panel Installation</p>
                <p className="text-xs text-muted-foreground">Green Energy Institute - 2021</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Training
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Memberships</CardTitle>
            <CardDescription>Industry associations and professional bodies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm">French Electrical Workers Union</p>
                <p className="text-xs text-muted-foreground">Member since 2008</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm">International Brotherhood of Electrical Workers</p>
                <p className="text-xs text-muted-foreground">Associate Member - 2020</p>
              </div>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            {isEditing && (
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Membership
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function CertificationsAndLicensesSection({ isEditing }: { isEditing: boolean }) {
  const certifications = [
    {
      id: 1,
      name: 'French Electrical License',
      type: 'Professional License',
      issuer: 'French Ministry of Labor',
      issueDate: '2009-01-15',
      expiryDate: '2029-01-15',
      status: 'active',
      documentUploaded: true
    },
    {
      id: 2,
      name: 'Construction Safety Training System (CSTS)',
      type: 'Safety Certification',
      issuer: 'Construction Safety Association',
      issueDate: '2024-08-20',
      expiryDate: '2026-08-20',
      status: 'active',
      documentUploaded: true
    },
    {
      id: 3,
      name: 'WHMIS 2015',
      type: 'Safety Training',
      issuer: 'Canadian Safety Council',
      issueDate: '2024-09-15',
      expiryDate: '2026-09-15',
      status: 'active',
      documentUploaded: true
    },
    {
      id: 4,
      name: 'CCQ Competency Card',
      type: 'Work Permit',
      issuer: 'Commission de la construction du Québec',
      issueDate: null,
      expiryDate: null,
      status: 'pending',
      documentUploaded: false
    }
  ];

  return (
    <>
      {/* Certifications Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Certifications & Licenses</CardTitle>
              <CardDescription>Professional credentials and safety certifications</CardDescription>
            </div>
            {isEditing && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className={`border-l-4 ${
                cert.status === 'active' ? 'border-l-green-500' :
                cert.status === 'pending' ? 'border-l-orange-500' :
                'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        cert.status === 'active' ? 'bg-green-100' :
                        cert.status === 'pending' ? 'bg-orange-100' :
                        'bg-red-100'
                      }`}>
                        <Award className={`w-6 h-6 ${
                          cert.status === 'active' ? 'text-green-600' :
                          cert.status === 'pending' ? 'text-orange-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3>{cert.name}</h3>
                          <Badge variant="outline">{cert.type}</Badge>
                          <Badge variant={
                            cert.status === 'active' ? 'default' :
                            cert.status === 'pending' ? 'destructive' :
                            'secondary'
                          }>
                            {cert.status === 'active' ? 'Active' :
                             cert.status === 'pending' ? 'Pending' :
                             'Expired'}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground">{cert.issuer}</p>
                        
                        {cert.issueDate && (
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Issued: {cert.issueDate}</span>
                            </div>
                            {cert.expiryDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>Expires: {cert.expiryDate}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {cert.documentUploaded ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Uploaded</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Required Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Required for Canadian Employment</CardTitle>
          <CardDescription>Essential certifications needed to work in Canada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4>Safety Training</h4>
              <p className="text-sm text-muted-foreground">CSTS & WHMIS</p>
              <Badge variant="default" className="mt-2">Completed</Badge>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h4>CCQ Card</h4>
              <p className="text-sm text-muted-foreground">Quebec Construction</p>
              <Badge variant="destructive" className="mt-2">In Progress</Badge>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h4>First Aid & CPR</h4>
              <p className="text-sm text-muted-foreground">Emergency Response</p>
              <Badge variant="secondary" className="mt-2">Required</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function ProjectsAndAchievementsSection({ isEditing }: { isEditing: boolean }) {
  const projects = [
    {
      id: 1,
      title: 'Lyon Convention Center Renovation',
      type: 'Commercial',
      role: 'Lead Electrician',
      duration: '18 months',
      completionDate: '2023-12-15',
      description: 'Complete electrical system overhaul for a 50,000 sq ft convention center including lighting, power distribution, and emergency systems.',
      technologies: ['Power Distribution', 'LED Lighting Systems', 'Emergency Power', 'Building Automation'],
      teamSize: 8,
      hasImages: true,
      rating: 4.8,
      testimonial: 'Alexandre demonstrated exceptional technical skills and leadership throughout the project.'
    },
    {
      id: 2,
      title: 'Residential Complex - Phase 2',
      type: 'Residential',
      role: 'Electrical Contractor',
      duration: '12 months',
      completionDate: '2022-08-30',
      description: 'Electrical installation for 120-unit residential complex including smart home systems and EV charging infrastructure.',
      technologies: ['Smart Home Wiring', 'EV Charging Stations', 'Solar Panel Integration', 'Home Automation'],
      teamSize: 12,
      hasImages: true,
      rating: 4.9,
      testimonial: 'Outstanding work quality and attention to detail. Highly recommended.'
    }
  ];

  return (
    <>
      {/* Portfolio Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Projects & Achievements</CardTitle>
              <CardDescription>Showcase of your completed work and professional accomplishments</CardDescription>
            </div>
            {isEditing && (
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl">15+</p>
              <p className="text-sm text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl">4.8/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl">98%</p>
              <p className="text-sm text-muted-foreground">On-Time Completion</p>
            </div>
          </div>

          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Project Images */}
                    <div className="space-y-3">
                      {project.hasImages ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop"
                              alt={`${project.title} - Image 1`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            <ImageWithFallback 
                              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop"
                              alt={`${project.title} - Image 2`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      
                      {isEditing && (
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </Button>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{project.title}</h3>
                            <Badge variant="outline">{project.type}</Badge>
                            <Badge variant="secondary">{project.role}</Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Completed: {project.completionDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>Duration: {project.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>Team Size: {project.teamSize}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>Rating: {project.rating}/5</span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm mb-2">Technologies Used:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm italic">"{project.testimonial}"</p>
                          </div>
                        </div>
                        
                        {isEditing && (
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Awards */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Achievements</CardTitle>
          <CardDescription>Recognition and awards for outstanding work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h4>Excellence in Electrical Installation</h4>
                <p className="text-sm text-muted-foreground">French Electrical Contractors Association - 2023</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4>Safety Performance Award</h4>
                <p className="text-sm text-muted-foreground">Lyon Construction Safety Board - 2022</p>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function DocumentsSection({ isEditing }: { isEditing: boolean }) {
  const documents = [
    {
      id: 1,
      name: 'Passport',
      type: 'Identity',
      category: 'Personal Documents',
      status: 'approved',
      uploadDate: '2025-01-15',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Birth Certificate',
      type: 'Identity',
      category: 'Personal Documents', 
      status: 'approved',
      uploadDate: '2025-01-15',
      size: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'Resume/CV',
      type: 'Professional',
      category: 'Professional Documents',
      status: 'approved',
      uploadDate: '2025-01-20',
      size: '856 KB',
      format: 'PDF'
    },
    {
      id: 4,
      name: 'Electrical License',
      type: 'Certification',
      category: 'Professional Documents',
      status: 'review',
      uploadDate: '2025-01-22',
      size: '3.1 MB',
      format: 'PDF'
    },
    {
      id: 5,
      name: 'Work Visa Application',
      type: 'Immigration',
      category: 'Immigration Documents',
      status: 'pending',
      uploadDate: null,
      size: null,
      format: null
    }
  ];

  const documentCategories = [
    'Personal Documents',
    'Professional Documents', 
    'Immigration Documents',
    'Educational Certificates',
    'Safety Certifications'
  ];

  return (
    <>
      {/* Document Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Document Repository</CardTitle>
              <CardDescription>Secure storage for all your important documents</CardDescription>
            </div>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl text-green-600">8</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl text-orange-600">2</p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl text-red-600">3</p>
              <p className="text-sm text-muted-foreground">Required</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl text-blue-600">45.2 MB</p>
              <p className="text-sm text-muted-foreground">Total Storage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="space-y-6">
        {documentCategories.map((category) => {
          const categoryDocs = documents.filter(doc => doc.category === category);
          
          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <Badge variant="outline">{categoryDocs.length} documents</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.status === 'approved' ? 'bg-green-100' :
                          doc.status === 'review' ? 'bg-orange-100' :
                          'bg-gray-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            doc.status === 'approved' ? 'text-green-600' :
                            doc.status === 'review' ? 'text-orange-600' :
                            'text-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4>{doc.name}</h4>
                            <Badge variant="outline">{doc.type}</Badge>
                          </div>
                          
                          {doc.uploadDate ? (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Uploaded: {doc.uploadDate}</span>
                              <span>{doc.size}</span>
                              <span>{doc.format}</span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Document required</p>
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
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        ) : (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {categoryDocs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No documents in this category</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload First Document
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function MyJourneySection({ userData }: { userData: any }) {
  const journeyMilestones = [
    {
      id: 1,
      title: 'Account Created',
      description: 'Joined Stitch AI platform',
      date: userData.joinDate,
      status: 'completed',
      type: 'registration'
    },
    {
      id: 2,
      title: 'Profile Setup',
      description: 'Completed basic profile information',
      date: '2025-01-12',
      status: 'completed',
      type: 'profile'
    },
    {
      id: 3,
      title: 'Document Upload',
      description: 'Uploaded identity and professional documents',
      date: '2025-01-15',
      status: 'completed',
      type: 'documents'
    },
    {
      id: 4,
      title: 'Skills Assessment',
      description: 'Completed technical skills evaluation',
      date: '2025-01-20',
      status: 'completed',
      type: 'assessment'
    },
    {
      id: 5,
      title: 'Safety Training',
      description: 'CSTS and WHMIS certifications obtained',
      date: '2025-01-25',
      status: 'completed',
      type: 'training'
    },
    {
      id: 6,
      title: 'Language Assessment',
      description: 'English proficiency verification',
      date: '2025-02-05',
      status: 'in-progress',
      type: 'language'
    },
    {
      id: 7,
      title: 'CCQ Registration',
      description: 'Quebec construction commission card application',
      date: '2025-02-15',
      status: 'pending',
      type: 'certification'
    },
    {
      id: 8,
      title: 'Job Placement',
      description: 'Matched with Canadian employers',
      date: '2025-03-01',
      status: 'pending',
      type: 'placement'
    }
  ];

  return (
    <>
      {/* Journey Overview */}
      <Card>
        <CardHeader>
          <CardTitle>My Journey</CardTitle>
          <CardDescription>Your progression through the Canadian employment pathway</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-lg">5</p>
              <p className="text-sm text-muted-foreground">Milestones Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-lg">1</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Target className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-lg">2</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-lg">{userData.progress}%</p>
              <p className="text-sm text-muted-foreground">Total Progress</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {journeyMilestones.map((milestone, index) => (
                <div key={milestone.id} className="relative flex items-start gap-6">
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background ${
                    milestone.status === 'completed' ? 'bg-green-500' :
                    milestone.status === 'in-progress' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`}>
                    {milestone.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : milestone.status === 'in-progress' ? (
                      <Clock className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white">{milestone.id}</span>
                    )}
                  </div>
                  
                  <div className={`flex-1 p-6 rounded-lg border ${
                    milestone.status === 'completed' ? 'bg-green-50 border-green-200' :
                    milestone.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3>{milestone.title}</h3>
                      <Badge variant={
                        milestone.status === 'completed' ? 'default' :
                        milestone.status === 'in-progress' ? 'destructive' :
                        'secondary'
                      }>
                        {milestone.status === 'completed' ? 'Completed' :
                         milestone.status === 'in-progress' ? 'In Progress' :
                         'Upcoming'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{milestone.description}</p>
                    
                    {milestone.date && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{milestone.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journey Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Time to Completion</CardTitle>
            <CardDescription>Estimated timeline for job readiness</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Profile Completion</span>
              <span className="text-sm">2 weeks</span>
            </div>
            <Progress value={100} />
            
            <div className="flex justify-between items-center">
              <span>Documentation</span>
              <span className="text-sm">3 weeks</span>
            </div>
            <Progress value={80} />
            
            <div className="flex justify-between items-center">
              <span>Training & Certifications</span>
              <span className="text-sm">6 weeks</span>
            </div>
            <Progress value={60} />
            
            <div className="flex justify-between items-center">
              <span>Job Placement</span>
              <span className="text-sm">2-4 weeks</span>
            </div>
            <Progress value={0} />
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span>Estimated Total Time</span>
                <span className="text-lg">8-12 weeks</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Priority actions to advance your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 border border-orange-200 rounded-lg bg-orange-50">
              <Clock className="w-6 h-6 text-orange-600" />
              <div className="flex-1">
                <h4>Complete Language Assessment</h4>
                <p className="text-sm text-muted-foreground">Due: February 15, 2025</p>
              </div>
              <Button size="sm">Start</Button>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
              <div className="flex-1">
                <h4>Submit CCQ Application</h4>
                <p className="text-sm text-muted-foreground">Prerequisite: Language assessment</p>
              </div>
              <Button size="sm" variant="outline" disabled>Pending</Button>
            </div>
            
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <h4>Job Matching</h4>
                <p className="text-sm text-muted-foreground">Connect with employers</p>
              </div>
              <Button size="sm" variant="outline" disabled>Upcoming</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function AdminProfile({ isEditing, setIsEditing }: { isEditing: boolean; setIsEditing: (editing: boolean) => void }) {
  // Keep the existing admin profile implementation
  const adminData = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@stitchai.ca',
    phone: '+1 514 123 4567',
    country: 'Canada',
    city: 'Montreal',
    department: 'Training & Development',
    position: 'Training Coordinator',
    employeeId: 'SA-2024-001',
    joinDate: '2023-06-15',
    languages: ['English (Native)', 'French (Native)'],
    permissions: ['Training Management', 'Worker Communications', 'Document Review']
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>My Profile</h1>
          <p className="text-muted-foreground">Manage your administrative account and preferences</p>
        </div>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Admin profile content - simplified version of the original */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-xl">SA</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2>{adminData.name}</h2>
                <Badge variant="secondary">Administrator</Badge>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{adminData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{adminData.position}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(false)} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}
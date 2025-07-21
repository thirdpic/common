import React, { useState } from 'react';
import { Calendar, Users, BookOpen, Settings, LogOut, Video, Clock, Bell, FileText, User } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { VideoConferencePage } from './components/VideoConferencePage';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AssignmentPage } from './components/AssignmentPage';
import { NotificationPage } from './components/NotificationPage';

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'schedule' | 'classes' | 'assignments' | 'notifications' | 'profile' | 'settings' | 'video-conference' | 'teacher-dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeView, setActiveView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [userInfo, setUserInfo] = useState({
    name: '김학생',
    class: '3학년 2반',
    avatar: null
  });

  const navigationItems = userRole === 'teacher' ? [
    { id: 'teacher-dashboard', label: '교사 대시보드', icon: BookOpen },
    { id: 'schedule', label: '수업 일정', icon: Calendar },
    { id: 'classes', label: '수업 관리', icon: Users },
    { id: 'assignments', label: '과제 관리', icon: FileText },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'settings', label: '설정', icon: Settings },
  ] : [
    { id: 'dashboard', label: '홈', icon: BookOpen },
    { id: 'schedule', label: '수업 일정', icon: Calendar },
    { id: 'classes', label: '내 수업', icon: Users },
    { id: 'assignments', label: '과제', icon: FileText },
    { id: 'notifications', label: '알림', icon: Bell },
    { id: 'profile', label: '프로필', icon: User },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  const upcomingClasses = [
    {
      id: 1,
      title: '수학 - 자연수의 이해',
      teacher: '김선생',
      time: '13:00 - 14:00',
      date: '2025.01.20',
      status: 'live',
      participants: 25,
      maxParticipants: 30
    },
    {
      id: 2,
      title: '과학 - 알고리즘 기초',
      teacher: '이교수',
      time: '14:30 - 15:30',
      date: '2025.01.20',
      status: 'upcoming',
      participants: 18,
      maxParticipants: 25
    },
    {
      id: 3,
      title: '영어 - 회화 연습',
      teacher: '박강사',
      time: '16:00 - 17:00',
      date: '2025.01.20',
      status: 'upcoming',
      participants: 15,
      maxParticipants: 20
    }
  ];

  const recentAssignments = [
    {
      id: 1,
      title: '수학 숙제 - 분수 계산',
      dueDate: '2025.01.22',
      status: 'pending'
    },
    {
      id: 2,
      title: '과학 실험 보고서',
      dueDate: '2025.01.25',
      status: 'submitted'
    }
  ];

  const handleLogin = (id: string, password: string) => {
    // Mock login - determine role based on id
    const role = id.includes('teacher') ? 'teacher' : 
                 id.includes('parent') ? 'parent' : 'student';
    
    setUserRole(role);
    setIsAuthenticated(true);
    
    if (role === 'teacher') {
      setCurrentPage('teacher-dashboard');
      setActiveView('teacher-dashboard');
      setUserInfo({ name: '김민지 선생님', class: '담당: 3-2, 4-1', avatar: null });
    } else {
      setCurrentPage('dashboard');
      setActiveView('dashboard');
      setUserInfo({ name: '김학생', class: '3학년 2반', avatar: null });
    }
  };

  const handleSignUp = (userData: any) => {
    setUserRole(userData.role);
    setUserInfo({
      name: userData.name,
      class: userData.role === 'student' ? `${userData.grade}학년 ${userData.class}반` : 
             userData.role === 'teacher' ? '교사' : '학부모',
      avatar: null
    });
    handleLogin(userData.id, userData.password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    setActiveView('dashboard');
    setUserRole('student');
    setUserInfo({ name: '김학생', class: '3학년 2반', avatar: null });
  };

  const handleJoinClass = (classInfo: any) => {
    setCurrentPage('video-conference');
  };

  const handleLeaveClass = () => {
    if (userRole === 'teacher') {
      setCurrentPage('teacher-dashboard');
      setActiveView('teacher-dashboard');
    } else {
      setCurrentPage('dashboard');
      setActiveView('dashboard');
    }
  };

  const handleCreateClass = () => {
    // Mock create class
    alert('새 수업이 생성되었습니다!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'text-white' + ' ' + 'bg-[#2E7EFF]';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <LandingPage 
        onLogin={() => setCurrentPage('login')}
        onSignUp={() => setCurrentPage('signup')}
      />
    );
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return (
      <SignUpPage 
        onSignUp={handleSignUp}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  // Video Conference Page
  if (currentPage === 'video-conference') {
    const liveClass = upcomingClasses.find(cls => cls.status === 'live');
    return (
      <VideoConferencePage 
        onLeave={handleLeaveClass}
        classInfo={liveClass || upcomingClasses[0]}
      />
    );
  }

  // Teacher Dashboard
  if (currentPage === 'teacher-dashboard') {
    return (
      <TeacherDashboard 
        onLogout={handleLogout}
        onCreateClass={handleCreateClass}
        onJoinClass={handleJoinClass}
      />
    );
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#2E7EFF] via-[#4A8FFF] to-[#6CA0FF] text-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-2">안녕하세요, {userInfo.name}님! 👋</h1>
        <p className="opacity-90 text-lg">오늘도 열심히 공부해보세요!</p>
        <div className="mt-4 text-sm opacity-80">
          {userInfo.class} • 오늘 날씨가 좋네요 ☀️
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-[#2E7EFF]" />
              <div>
                <p className="text-sm text-muted-foreground">오늘 수업</p>
                <p className="text-2xl font-bold">3개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">이번 주 수업</p>
                <p className="text-2xl font-bold">12시간</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">미완료 과제</p>
                <p className="text-2xl font-bold">2개</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">새 알림</p>
                <p className="text-2xl font-bold">5개</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Classes */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="h-5 w-5" />
            <span>오늘의 수업</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50/80 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium">{cls.title}</h3>
                      <p className="text-sm text-muted-foreground">{cls.teacher} • {cls.time}</p>
                    </div>
                    <Badge className={getStatusColor(cls.status)}>
                      {cls.status === 'live' ? '진행중' : '예정'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {cls.participants}/{cls.maxParticipants}
                  </span>
                  <Button 
                    variant={cls.status === 'live' ? 'default' : 'outline'}
                    size="sm"
                    className={cls.status === 'live' ? 'bg-green-600 hover:bg-green-700' : 'border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]'}
                    onClick={() => cls.status === 'live' && handleJoinClass(cls)}
                  >
                    {cls.status === 'live' ? '입장하기' : '대기'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Assignments */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>최근 과제</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50/80 transition-colors">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">마감일: {assignment.dueDate}</p>
                </div>
                <Badge variant={assignment.status === 'submitted' ? 'default' : 'secondary'} 
                       className={assignment.status === 'submitted' ? 'bg-[#2E7EFF] text-white' : ''}>
                  {assignment.status === 'submitted' ? '제출완료' : '미제출'}
                </Badge>
              </div>
            ))}
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]"
                onClick={() => {
                  setCurrentPage('assignments');
                  setActiveView('assignments');
                }}
              >
                모든 과제 보기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>수업 일정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="border p-4 rounded-lg hover:bg-gray-50/80 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{cls.title}</h3>
                    <Badge className={getStatusColor(cls.status)}>
                      {cls.status === 'live' ? '진행중' : '예정'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    강사: {cls.teacher}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cls.date} {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>수강 중인 과목</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: '수학', teacher: '김선생', progress: 75, nextClass: '오늘 13:00' },
              { subject: '과학', teacher: '이교수', progress: 60, nextClass: '내일 14:30' },
              { subject: '영어', teacher: '박강사', progress: 90, nextClass: '수요일 16:00' },
            ].map((subject, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                    <div 
                      className="h-2 bg-[#2E7EFF] rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  <h3 className="font-medium mb-2">{subject.subject}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{subject.teacher}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>진도율</span>
                      <span className="text-[#2E7EFF] font-medium">{subject.progress}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    다음 수업: {subject.nextClass}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-[#E8F2FF] text-[#2E7EFF]">{userInfo.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <p className="text-muted-foreground">{userInfo.class}</p>
              <Button variant="outline" size="sm" className="mt-2 border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]">
                프로필 사진 변경
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">학습 통계</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>총 수업 참여</span>
                  <span className="font-medium text-[#2E7EFF]">127회</span>
                </div>
                <div className="flex justify-between">
                  <span>평균 출석률</span>
                  <span className="font-medium text-[#2E7EFF]">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>제출한 과제</span>
                  <span className="font-medium text-[#2E7EFF]">45개</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">성취 배지</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs">우수학생</div>
                </div>
                <div className="text-center p-3 bg-[#E8F2FF] rounded-lg border border-[#2E7EFF]/20">
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-xs">성실한 학습</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl mb-1">💪</div>
                  <div className="text-xs">꾸준한 참여</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main Dashboard (authenticated view)
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#2E7EFF] to-[#4A8FFF] rounded-lg flex items-center justify-center">
              <div className="text-white font-bold">또</div>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">또잇</h1>
              <p className="text-xs text-gray-500">AI튜터 화상 수업</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-[#E8F2FF] text-[#2E7EFF]">{userInfo.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800">{userInfo.name}</p>
              <p className="text-sm text-gray-500">{userInfo.class}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start transition-all ${
                    isActive 
                      ? 'bg-[#2E7EFF] text-white hover:bg-[#1E6FFF]' 
                      : 'text-gray-700 hover:bg-[#E8F2FF] hover:text-[#2E7EFF]'
                  }`}
                  onClick={() => {
                    setActiveView(item.id);
                    setCurrentPage(item.id as Page);
                  }}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                  {item.id === 'notifications' && (
                    <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                      5
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            로그아웃
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navigationItems.find(item => item.id === activeView)?.label}
            </h2>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                className={`relative ${
                  activeView === 'notifications' 
                    ? 'bg-[#E8F2FF] text-[#2E7EFF]' 
                    : 'hover:bg-[#E8F2FF] hover:text-[#2E7EFF]'
                }`}
                onClick={() => {
                  setCurrentPage('notifications');
                  setActiveView('notifications');
                }}
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                  5
                </Badge>
              </Button>
              <Avatar className="cursor-pointer ring-2 ring-offset-2 ring-[#2E7EFF]/20 hover:ring-[#2E7EFF]/40 transition-all" onClick={() => {
                setCurrentPage('profile');
                setActiveView('profile');
              }}>
                <AvatarFallback className="bg-[#E8F2FF] text-[#2E7EFF]">{userInfo.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'schedule' && renderSchedule()}
          {activeView === 'classes' && renderClasses()}
          {activeView === 'assignments' && <AssignmentPage onBack={() => setCurrentPage('dashboard')} />}
          {activeView === 'notifications' && <NotificationPage onBack={() => setCurrentPage('dashboard')} />}
          {activeView === 'profile' && renderProfile()}
          {activeView === 'settings' && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>설정</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">설정 옵션이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
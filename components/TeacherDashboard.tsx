import React, { useState } from 'react';
import { Calendar, Users, BookOpen, Settings, LogOut, Video, Clock, Bell, FileText, BarChart3, PlusCircle, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TeacherDashboardProps {
  onLogout: () => void;
  onCreateClass: () => void;
  onJoinClass: (classId: number) => void;
}

export function TeacherDashboard({ onLogout, onCreateClass, onJoinClass }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const todayClasses = [
    {
      id: 1,
      title: '수학 - 자연수의 이해',
      time: '13:00 - 14:00',
      grade: '3학년',
      class: '2반',
      students: 25,
      status: 'live'
    },
    {
      id: 2,
      title: '수학 - 분수의 개념',
      time: '14:30 - 15:30',
      grade: '4학년',
      class: '1반',
      students: 18,
      status: 'upcoming'
    }
  ];

  const recentAssignments = [
    {
      id: 1,
      title: '분수 계산 연습',
      class: '3-2',
      submitted: 20,
      total: 25,
      dueDate: '2025.01.22'
    },
    {
      id: 2,
      title: '기하학 문제풀이',
      class: '4-1',
      submitted: 15,
      total: 18,
      dueDate: '2025.01.25'
    }
  ];

  const students = [
    { id: 1, name: '김학생', class: '3-2', attendance: 95, grade: 'A', lastSeen: '2025.01.20' },
    { id: 2, name: '이학생', class: '3-2', attendance: 88, grade: 'B+', lastSeen: '2025.01.20' },
    { id: 3, name: '박학생', class: '4-1', attendance: 92, grade: 'A-', lastSeen: '2025.01.19' },
    { id: 4, name: '최학생', class: '4-1', attendance: 85, grade: 'B', lastSeen: '2025.01.20' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold">또</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">교사 관리 대시보드</h1>
              <p className="text-sm text-gray-500">김민지 선생님</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              알림
            </Button>
            <Button onClick={onLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              로그아웃
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="classes">수업 관리</TabsTrigger>
            <TabsTrigger value="students">학생 관리</TabsTrigger>
            <TabsTrigger value="assignments">과제 관리</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">총 학생 수</p>
                      <p className="text-2xl font-bold">43명</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Video className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">오늘 수업</p>
                      <p className="text-2xl font-bold">2개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">미채점 과제</p>
                      <p className="text-2xl font-bold">12개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">평균 출석률</p>
                      <p className="text-2xl font-bold">89%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Classes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5" />
                  <span>오늘의 수업</span>
                </CardTitle>
                <Button onClick={onCreateClass} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  수업 생성
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-medium">{cls.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {cls.grade} {cls.class} • {cls.time} • 학생 {cls.students}명
                            </p>
                          </div>
                          <Badge variant={cls.status === 'live' ? 'destructive' : 'secondary'}>
                            {cls.status === 'live' ? '진행중' : '예정'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={cls.status === 'live' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => onJoinClass(cls.id)}
                          className={cls.status === 'live' ? 'bg-green-600 hover:bg-green-700' : ''}
                        >
                          {cls.status === 'live' ? '수업 입장' : '수업 시작'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Assignments */}
            <Card>
              <CardHeader>
                <CardTitle>과제 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {assignment.class} • 제출: {assignment.submitted}/{assignment.total} • 마감: {assignment.dueDate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {Math.round((assignment.submitted / assignment.total) * 100)}%
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>수업 관리</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  새 수업 만들기
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayClasses.map((cls) => (
                    <div key={cls.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{cls.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cls.grade} {cls.class} • {cls.time}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Badge variant={cls.status === 'live' ? 'destructive' : 'secondary'}>
                            {cls.status === 'live' ? '진행중' : '예정'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">학생 {cls.students}명</span>
                        <Button 
                          size="sm" 
                          onClick={() => onJoinClass(cls.id)}
                          className={cls.status === 'live' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                        >
                          {cls.status === 'live' ? '수업 입장' : '수업 시작'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>학생 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.class} • 출석률 {student.attendance}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant={student.grade.startsWith('A') ? 'default' : 'secondary'}>
                            {student.grade}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            마지막 접속: {student.lastSeen}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>과제 관리</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  새 과제 만들기
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{assignment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.class} • 마감일: {assignment.dueDate}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">제출률: {assignment.submitted}/{assignment.total}</span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round((assignment.submitted / assignment.total) * 100)}%
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          채점하기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
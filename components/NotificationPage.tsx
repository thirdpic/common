import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Bell, Clock, CheckCircle, AlertCircle, Info, Megaphone, Calendar, FileText } from 'lucide-react';

interface NotificationPageProps {
  onBack: () => void;
}

export function NotificationPage({ onBack }: NotificationPageProps) {
  const [unreadCount, setUnreadCount] = useState(8);

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: '새로운 과제가 등록되었습니다',
      message: '수학 - 분수 계산 연습 과제가 등록되었습니다. 마감일: 2025.01.22',
      time: '10분 전',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'class',
      title: '수업 시간이 변경되었습니다',
      message: '영어 회화 수업이 16:00에서 15:30으로 변경되었습니다.',
      time: '1시간 전',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'grade',
      title: '과제 점수가 공개되었습니다',
      message: '과학 실험 보고서 점수: 85/100점',
      time: '2시간 전',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'system',
      title: '시스템 점검 안내',
      message: '2025.01.21 새벽 2시-4시 시스템 점검이 예정되어 있습니다.',
      time: '1일 전',
      read: false,
      priority: 'medium'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: '2025년 1학기 개학 안내',
      content: '새 학기가 시작됩니다. 온라인 수업 일정과 준비사항을 확인해주세요.',
      author: '교무부',
      date: '2025.01.15',
      priority: 'high',
      category: '학사일정'
    },
    {
      id: 2,
      title: '화상수업 이용 가이드 업데이트',
      content: '더욱 원활한 수업을 위해 화상수업 이용 방법이 업데이트되었습니다.',
      author: '정보부',
      date: '2025.01.18',
      priority: 'medium',
      category: '기술지원'
    },
    {
      id: 3,
      title: '학부모 상담 주간 안내',
      content: '1월 25일-29일 학부모 상담 주간입니다. 온라인으로 진행됩니다.',
      author: '교무부',
      date: '2025.01.19',
      priority: 'high',
      category: '학사일정'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-5 h-5 text-orange-500" />;
      case 'class':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'grade':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'system':
        return <Info className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (notificationId: number) => {
    // Mock marking as read
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bell className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold">알림 &amp; 공지사항</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount}개의 새 알림
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            모두 읽음 처리
          </Button>
        )}
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>개인 알림</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center space-x-2">
            <Megaphone className="w-4 h-4" />
            <span>학교 공지</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">3</div>
                <div className="text-sm text-red-600">긴급 알림</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
                <div className="text-sm text-orange-600">일반 알림</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                <div className="text-sm text-green-600">읽은 알림</div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`hover:shadow-md transition-shadow cursor-pointer ${!notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority === 'high' ? '긴급' : notification.priority === 'medium' ? '중요' : '일반'}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-500'} mb-2`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button variant="outline" size="sm" className="whitespace-nowrap">전체</Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">학사일정</Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">기술지원</Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">행사</Button>
            <Button variant="ghost" size="sm" className="whitespace-nowrap">긴급공지</Button>
          </div>

          {/* Announcements List */}
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Megaphone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">{announcement.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{announcement.date}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {announcement.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority === 'high' ? '중요' : '일반'}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {announcement.content}
                  </p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      자세히 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline">
              더 보기
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
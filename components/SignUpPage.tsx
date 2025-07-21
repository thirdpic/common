import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SignUpPageProps {
  onSignUp: (userData: any) => void;
  onBack: () => void;
}

export function SignUpPage({ onSignUp, onBack }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: '',
    grade: '',
    class: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    onSignUp(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 h-20 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <div className="text-white font-bold text-lg">또</div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">또잇</h1>
            <p className="text-xs text-gray-500">작은학교 전용 AI튜터 화상 수업</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="px-8 py-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            로그인
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center pt-12">
        <Card className="w-full max-w-lg bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-gray-800 mb-2">회원가입</CardTitle>
            <p className="text-gray-600">또잇에서 함께 성장해보세요!</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">이름</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                  required
                />
              </div>

              {/* ID */}
              <div className="space-y-2">
                <Label htmlFor="id" className="text-sm font-medium text-gray-700">아이디</Label>
                <Input
                  id="id"
                  type="text"
                  value={formData.id}
                  onChange={(e) => handleChange('id', e.target.value)}
                  placeholder="아이디를 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">역할</Label>
                <Select onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="역할을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">학생</SelectItem>
                    <SelectItem value="teacher">교사</SelectItem>
                    <SelectItem value="parent">학부모</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Grade and Class for students */}
              {formData.role === 'student' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">학년</Label>
                    <Select onValueChange={(value) => handleChange('grade', value)}>
                      <SelectTrigger className="bg-white/80 border-gray-200">
                        <SelectValue placeholder="학년" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1학년</SelectItem>
                        <SelectItem value="2">2학년</SelectItem>
                        <SelectItem value="3">3학년</SelectItem>
                        <SelectItem value="4">4학년</SelectItem>
                        <SelectItem value="5">5학년</SelectItem>
                        <SelectItem value="6">6학년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">반</Label>
                    <Select onValueChange={(value) => handleChange('class', value)}>
                      <SelectTrigger className="bg-white/80 border-gray-200">
                        <SelectValue placeholder="반" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1반</SelectItem>
                        <SelectItem value="2">2반</SelectItem>
                        <SelectItem value="3">3반</SelectItem>
                        <SelectItem value="4">4반</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">연락처</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="연락처를 입력하세요"
                  className="bg-white/80 border-gray-200 focus:border-blue-400"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                회원가입
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight, Play, Users, BookOpen, Monitor, Star, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onLogin, onSignUp }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: (
        <>
          <span className="font-bold text-blue-700">멀리</span>있어도<br />
          <span className="font-bold text-blue-700">함께 </span>성장하자!<br />
          작은학교 전용<br />
          AI튜터 화상 수업 서비스{' '}
          <span className="font-bold text-indigo-700 text-8xl">또잇</span>
        </>
      ),
      subtitle: "소규모 학교를 위한 맞춤형 온라인 교육 플랫폼"
    },
    {
      title: (
        <>
          <span className="font-bold text-green-700">AI 튜터</span>와 함께<br />
          개인 맞춤형 학습<br />
          <span className="font-bold text-green-700">스마트한 교육</span><br />
          새로운 시작
        </>
      ),
      subtitle: "개별 학습 진도에 맞춘 AI 기반 맞춤 교육"
    },
    {
      title: (
        <>
          언제 어디서나<br />
          <span className="font-bold text-purple-700">실시간 화상수업</span><br />
          선생님과 친구들과<br />
          <span className="font-bold text-purple-700">소통하며 배워요</span>
        </>
      ),
      subtitle: "고품질 화상회의 시스템으로 생생한 수업 경험"
    }
  ];

  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-blue-600" />,
      title: "실시간 화상수업",
      description: "HD 화질의 안정적인 화상회의로 생생한 수업 체험"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "소규모 맞춤 교육",
      description: "작은 학급 규모로 한 명 한 명에게 집중하는 교육"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "AI 학습 분석",
      description: "개별 학습 패턴 분석으로 최적화된 학습 경험 제공"
    }
  ];

  const testimonials = [
    {
      name: "김지민 (3학년)",
      comment: "선생님과 친구들과 함께 온라인으로 공부하니까 재미있어요!",
      rating: 5
    },
    {
      name: "박민수 (학부모)",
      comment: "작은 학교라서 걱정했는데, 또잇 덕분에 좋은 교육을 받고 있어요.",
      rating: 5
    },
    {
      name: "이선영 (교사)",
      comment: "학생들의 참여도가 높아지고 수업 준비도 편해졌습니다.",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <div className="text-white font-bold text-lg">또</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">또잇</h1>
              <p className="text-xs text-gray-500">작은학교 전용 AI튜터 화상 수업</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={onLogin}
              variant="outline"
              className="px-8 py-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              로그인
            </Button>
            <Button 
              onClick={onSignUp}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              무료 시작하기
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1284 747" fill="none">
              <path d="M1283 1C782.348 291.303 1 746 1 746" stroke="#6366F1" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Main content */}
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          <div className="text-gray-600 leading-tight mb-8">
            <div className="text-6xl md:text-7xl mb-4 transition-all duration-500">
              {slides[currentSlide].title}
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={onSignUp}
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              무료로 시작하기
            </Button>
            <Button 
              onClick={onLogin}
              variant="outline" 
              size="lg"
              className="px-8 py-4 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              데모 보기
            </Button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-blue-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              왜 또잇을 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              작은 학교의 특별함을 살린 맞춤형 교육 솔루션으로 모든 학생이 성공할 수 있도록 돕습니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              또잇 사용자들의 이야기
            </h2>
            <p className="text-xl text-gray-600">
              실제 사용자들이 경험한 또잇의 장점을 확인해보세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.comment}"
                  </p>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 또잇과 함께 시작하세요!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            무료 체험으로 또잇의 모든 기능을 경험해보세요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onSignUp}
              size="lg"
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              무료 회원가입
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 border-white text-white hover:bg-white/10"
            >
              문의하기
            </Button>
          </div>
          
          <p className="text-sm mt-6 opacity-75">
            신용카드 불필요 • 언제든 해지 가능 • 30일 무료 체험
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold">또</div>
                </div>
                <span className="font-bold text-lg">또잇</span>
              </div>
              <p className="text-gray-400 text-sm">
                작은학교 전용 AI튜터 화상 수업 서비스
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">화상수업</a></li>
                <li><a href="#" className="hover:text-white">AI 튜터</a></li>
                <li><a href="#" className="hover:text-white">학습관리</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">고객지원</a></li>
                <li><a href="#" className="hover:text-white">이용가이드</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">회사소개</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white">이용약관</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 또잇. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
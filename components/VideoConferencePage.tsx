import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Hand, MoreHorizontal, Volume2, Settings, Send, Bot, User as UserIcon, Loader } from 'lucide-react';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn("🚨 OpenAI API 키가 설정되지 않았습니다. .env 파일을 확인하세요.");
}

interface VideoConferencePageProps {
  onLeave: () => void;
  classInfo: {
    title: string;
    teacher: string;
    time: string;
    participants: number;
  };
}

interface Message {
  id: number;
  user: string;
  message: string;
  time: string;
  type: 'user' | 'ai';
  isLoading?: boolean;
}

export function VideoConferencePage({ onLeave, classInfo }: VideoConferencePageProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  const [generalMessages, setGeneralMessages] = useState<Message[]>([
    { id: 1, user: '김학생', message: '안녕하세요!', time: '13:05', type: 'user' },
    { id: 2, user: '이학생', message: '질문이 있습니다.', time: '13:07', type: 'user' }
  ]);

  const [aiMessages, setAiMessages] = useState<Message[]>([
    { 
      id: 1, 
      user: 'AI 튜터', 
      message: '안녕하세요! 저는 여러분의 학습을 도와드리는 AI 튜터입니다. 수업 중 궁금한 개념이나 문제가 있으면 언제든 질문해주세요. 😊', 
      time: '13:00', 
      type: 'ai' 
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [generalMessages, aiMessages]);

  // Mock participants data
  const participants = [
    { id: 1, name: '김민지(강사)', role: 'teacher', muted: false, videoOn: true },
    { id: 2, name: '김학생', role: 'student', muted: isMuted, videoOn: !isVideoOff },
    { id: 3, name: '이학생', role: 'student', muted: false, videoOn: true },
    { id: 4, name: '박학생', role: 'student', muted: true, videoOn: false },
    { id: 5, name: '최학생', role: 'student', muted: false, videoOn: true },
    { id: 6, name: '정학생', role: 'student', muted: true, videoOn: true }
  ];

  const callOpenAI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `당신은 초등학교 학생들을 위한 친근한 AI 튜터입니다. 현재 "${classInfo.title}" 수업이 진행 중입니다. 
              
              다음 가이드라인을 따라주세요:
              1. 초등학생 수준에 맞는 쉽고 친근한 언어 사용
              2. 복잡한 개념은 단계별로 설명
              3. 예시와 비유를 활용한 설명
              4. 긍정적이고 격려하는 톤 유지
              5. 답변은 3-4문장으로 간결하게
              6. 이모지를 적절히 사용하여 친근함 표현
              7. 학습 동기를 높이는 방향으로 답변
              
              학생이 수업과 관련없는 질문을 하면 수업에 집중하도록 부드럽게 안내해주세요.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API 호출에 실패했습니다.');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return '죄송합니다. 지금은 답변을 드릴 수 없어요. 잠시 후 다시 시도해주세요. 🙏';
    }
  };

  const handleSendGeneralMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        id: generalMessages.length + 1,
        user: '김학생',
        message: chatMessage,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        type: 'user'
      };
      setGeneralMessages([...generalMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handleSendAiMessage = async () => {
    if (aiMessage.trim()) {
      const userMessage: Message = {
        id: aiMessages.length + 1,
        user: '김학생',
        message: aiMessage,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        type: 'user'
      };

      const tempMessages = [...aiMessages, userMessage];
      setAiMessages(tempMessages);
      setAiMessage('');
      setIsAiTyping(true);

      // AI 응답 생성
      try {
        const aiResponse = await callOpenAI(userMessage.message);
        
        const aiResponseMessage: Message = {
          id: tempMessages.length + 1,
          user: 'AI 튜터',
          message: aiResponse,
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          type: 'ai'
        };

        setAiMessages([...tempMessages, aiResponseMessage]);
      } catch (error) {
        console.error('AI 응답 생성 실패:', error);
      } finally {
        setIsAiTyping(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'general' | 'ai') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (type === 'general') {
        handleSendGeneralMessage();
      } else {
        handleSendAiMessage();
      }
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-300 h-7 flex items-center justify-end px-4">
        <span className="text-xs text-gray-600">{classInfo.title}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-gray-300 flex flex-col">
          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>김민</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">김민지</p>
                <p className="text-xs text-gray-500">우수교사</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm h-9">
                <span>홈</span>
              </Button>
              <Button variant="default" className="w-full justify-start text-sm h-9 bg-[#2E7EFF]">
                <span>내 수업</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm h-9">
                <span>학생관리</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm h-9">
                <span>클래스관리</span>
              </Button>
            </div>
          </nav>

          {/* Tool Bar */}
          <div className="p-3 border-t border-gray-200">
            <div className="bg-[#2E7EFF] rounded px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 text-white">📚</div>
                <span className="text-xs text-white">수업도구</span>
              </div>
              <div className="w-px h-6 bg-white"></div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 text-white">📄</div>
                <span className="text-xs text-white">수업자료</span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start text-sm text-gray-500" onClick={onLeave}>
              <span>Log out</span>
            </Button>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Large teacher video */}
              <div className="col-span-2 bg-gray-200 border border-gray-400 rounded-lg relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 512 300" fill="none">
                    <path d="M511 1C311.833 117.121 1 299 1 299" stroke="#A8A8A8" strokeWidth="0.929134"/>
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-[#2E7EFF] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-2 border-r-0 border-t-2 border-b-2 border-transparent border-l-gray-600 ml-0.5"></div>
                    </div>
                  </div>
                  <span className="text-sm text-black">동영상</span>
                </div>
                
                {/* Teacher info overlay */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  김민지 (강사) {classInfo.teacher}
                </div>
              </div>

              {/* Student videos grid */}
              <div className="grid grid-cols-2 gap-2">
                {[0,1,2,3].map((i) => (
                  <div key={i} className="bg-gray-200 border border-gray-400 rounded relative aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" viewBox="0 0 257 151" fill="none">
                        <path d="M256 1C156.416 59.0605 1 150 1 150" stroke="#A8A8A8" strokeWidth="0.929134"/>
                      </svg>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="w-8 h-8 bg-[#2E7EFF] rounded-full flex items-center justify-center mb-2 mx-auto">
                        <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-1 border-r-0 border-t-1 border-b-1 border-transparent border-l-gray-600 ml-0.5"></div>
                        </div>
                      </div>
                      <span className="text-xs text-black">동영상</span>
                    </div>
                    
                    {/* Student info overlay */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                      {['김학생', '이학생', '박학생', '최학생'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="bg-white border-t border-gray-300 p-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="w-12 h-12 rounded-full"
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="sm"
                onClick={() => setIsVideoOff(!isVideoOff)}
                className="w-12 h-12 rounded-full"
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>

              <Button
                variant={isHandRaised ? "default" : "outline"}
                size="sm"
                onClick={() => setIsHandRaised(!isHandRaised)}
                className={`w-12 h-12 rounded-full ${isHandRaised ? 'bg-[#2E7EFF] hover:bg-[#1E6FFF]' : ''}`}
              >
                <Hand className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className={`w-12 h-12 rounded-full ${showChat ? 'bg-[#E8F2FF] text-[#2E7EFF] border-[#2E7EFF]' : ''}`}
              >
                <MessageSquare className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full"
              >
                <Users className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full"
              >
                <Volume2 className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full"
              >
                <Settings className="w-5 h-5" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={onLeave}
                className="w-12 h-12 rounded-full"
              >
                <Phone className="w-5 h-5 rotate-[135deg]" />
              </Button>
            </div>

            {/* Class Info */}
            <div className="mt-4 text-center">
              <h3 className="font-medium text-sm">{classInfo.title}</h3>
              <p className="text-xs text-gray-500">
                {classInfo.time} • 참여자 {classInfo.participants}명
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Chat Sidebar */}
        {showChat && (
          <div className="w-96 bg-white border-l border-gray-300 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">채팅 &amp; AI 튜터</h3>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-2">
                <TabsTrigger value="general" className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>일반 채팅</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-1">
                  <Bot className="w-4 h-4" />
                  <span>AI 튜터</span>
                </TabsTrigger>
              </TabsList>

              {/* General Chat */}
              <TabsContent value="general" className="flex-1 flex flex-col mt-0">
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
                  {generalMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <UserIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">{msg.user}</span>
                        </div>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 ml-6">{msg.message}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'general')}
                      placeholder="메시지를 입력하세요..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7EFF] focus:border-transparent"
                    />
                    <Button 
                      onClick={handleSendGeneralMessage} 
                      size="sm"
                      className="bg-[#2E7EFF] hover:bg-[#1E6FFF]"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* AI Chat */}
              <TabsContent value="ai" className="flex-1 flex flex-col mt-0">
                <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
                  {aiMessages.map((msg) => (
                    <div key={msg.id} className={`space-y-1 ${msg.type === 'ai' ? 'bg-[#E8F2FF] p-3 rounded-lg' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {msg.type === 'ai' ? (
                            <Bot className="w-4 h-4 text-[#2E7EFF]" />
                          ) : (
                            <UserIcon className="w-4 h-4 text-gray-500" />
                          )}
                          <span className={`text-sm font-medium ${msg.type === 'ai' ? 'text-[#2E7EFF]' : ''}`}>
                            {msg.user}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className={`text-sm ml-6 ${msg.type === 'ai' ? 'text-gray-800' : 'text-gray-700'}`}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                  
                  {isAiTyping && (
                    <div className="bg-[#E8F2FF] p-3 rounded-lg space-y-1">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-[#2E7EFF]" />
                        <span className="text-sm font-medium text-[#2E7EFF]">AI 튜터</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-6">
                        <Loader className="w-4 h-4 text-[#2E7EFF] animate-spin" />
                        <span className="text-sm text-gray-600">답변을 생각하고 있어요...</span>
                      </div>
                    </div>
                  )}
                  
                  <div ref={chatEndRef} />
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="mb-2 text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                    💡 수업 내용이나 개념에 대해 궁금한 것을 물어보세요!
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'ai')}
                      placeholder="AI 튜터에게 질문하세요..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7EFF] focus:border-transparent"
                      disabled={isAiTyping}
                    />
                    <Button 
                      onClick={handleSendAiMessage} 
                      size="sm"
                      disabled={isAiTyping}
                      className="bg-[#2E7EFF] hover:bg-[#1E6FFF] disabled:opacity-50"
                    >
                      {isAiTyping ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Quick Question Buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]"
                      onClick={() => setAiMessage('이 개념을 더 쉽게 설명해주세요')}
                      disabled={isAiTyping}
                    >
                      쉽게 설명해주세요
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]"
                      onClick={() => setAiMessage('예시를 들어서 설명해주세요')}
                      disabled={isAiTyping}
                    >
                      예시를 들어주세요
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-[#2E7EFF] text-[#2E7EFF] hover:bg-[#E8F2FF]"
                      onClick={() => setAiMessage('이것과 비슷한 문제를 만들어주세요')}
                      disabled={isAiTyping}
                    >
                      비슷한 문제
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
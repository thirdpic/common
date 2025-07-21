import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: (id: string, password: string) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [id, setId] = useState('kingminhwan123');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(id, password);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 h-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 border border-gray-400 flex items-center justify-center">
            <span className="text-sm">CI</span>
          </div>
          <span className="text-sm">MINISHCOOL</span>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="px-12 py-3 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50"
          >
            회원가입
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-start justify-center pt-32">
        <div className="w-full max-w-md bg-white/80 rounded-lg p-6 border border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID Field */}
            <div className="space-y-2">
              <Label htmlFor="id" className="text-base text-black/20">
                ID
              </Label>
              <div className="relative">
                <Input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-base"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base text-black/20">
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-base"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-base"
            >
              로그인
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
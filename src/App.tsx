import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🎉 또잇 플랫폼
        </h1>
        <p className="text-gray-600 mb-6">
          AI튜터 화상 수업 플랫폼이 성공적으로 로드되었습니다!
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ Vite 개발 서버 실행 완료</p>
          <p>✅ React + TypeScript 정상 작동</p>
          <p>✅ Tailwind CSS 스타일링 적용</p>
        </div>
        <button 
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => alert('또잇 플랫폼에 오신 것을 환영합니다!')}
        >
          시작하기
        </button>
      </div>
    </div>
  )
}

export default App
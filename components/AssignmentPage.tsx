import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Upload, FileText, Clock, CheckCircle, AlertCircle, Download, Send } from 'lucide-react';

interface AssignmentPageProps {
  onBack: () => void;
}

export function AssignmentPage({ onBack }: AssignmentPageProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const assignments = [
    {
      id: 1,
      title: '수학 숙제 - 분수 계산',
      subject: '수학',
      teacher: '김선생',
      dueDate: '2025.01.22',
      dueTime: '23:59',
      status: 'pending',
      description: '분수의 덧셈과 뺄셈 문제를 풀어보세요. 풀이과정을 자세히 써주세요.',
      maxScore: 100,
      timeLeft: '2일 5시간'
    },
    {
      id: 2,
      title: '과학 실험 보고서',
      subject: '과학',
      teacher: '이교수',
      dueDate: '2025.01.25',
      dueTime: '23:59',
      status: 'submitted',
      description: '물의 상태변화 실험을 관찰하고 보고서를 작성하세요.',
      maxScore: 100,
      submittedDate: '2025.01.20',
      score: 85,
      timeLeft: '5일 8시간'
    },
    {
      id: 3,
      title: '영어 단어 암기',
      subject: '영어',
      teacher: '박강사',
      dueDate: '2025.01.21',
      dueTime: '23:59',
      status: 'overdue',
      description: 'Unit 3의 새로운 단어 20개를 외우고 문장을 만들어보세요.',
      maxScore: 50,
      timeLeft: '마감됨'
    },
    {
      id: 4,
      title: '독서 감상문',
      subject: '국어',
      teacher: '정선생',
      dueDate: '2025.01.28',
      dueTime: '23:59',
      status: 'pending',
      description: '지정된 도서를 읽고 감상문을 작성하세요. 최소 400자 이상',
      maxScore: 100,
      timeLeft: '8일 12시간'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map(file => file.name);
    setUploadedFiles(prev => [...prev, ...fileNames]);
  };

  const handleSubmit = (assignmentId: number) => {
    // Mock submission
    alert('과제가 제출되었습니다!');
    setSelectedAssignment(null);
    setSubmissionText('');
    setUploadedFiles([]);
  };

  const selectedAssignmentData = assignments.find(a => a.id === selectedAssignment);

  if (selectedAssignment && selectedAssignmentData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedAssignment(null)}>
            ← 과제 목록으로 돌아가기
          </Button>
        </div>

        {/* Assignment Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedAssignmentData.title}</CardTitle>
                <p className="text-muted-foreground mt-1">
                  {selectedAssignmentData.subject} • {selectedAssignmentData.teacher}
                </p>
              </div>
              <Badge className={getStatusColor(selectedAssignmentData.status)}>
                {getStatusIcon(selectedAssignmentData.status)}
                <span className="ml-1">
                  {selectedAssignmentData.status === 'submitted' ? '제출완료' : 
                   selectedAssignmentData.status === 'pending' ? '미제출' : '마감'}
                </span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">마감일</p>
                <p className="font-medium">{selectedAssignmentData.dueDate} {selectedAssignmentData.dueTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">남은 시간</p>
                <p className="font-medium text-orange-600">{selectedAssignmentData.timeLeft}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">만점</p>
                <p className="font-medium">{selectedAssignmentData.maxScore}점</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">과제 설명</h4>
              <p className="text-muted-foreground bg-gray-50 p-4 rounded-lg">
                {selectedAssignmentData.description}
              </p>
            </div>

            {selectedAssignmentData.status === 'submitted' && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">제출 완료</h4>
                <p className="text-green-700 text-sm">
                  제출일: {selectedAssignmentData.submittedDate}
                </p>
                {selectedAssignmentData.score && (
                  <p className="text-green-700 text-sm">
                    점수: {selectedAssignmentData.score}/{selectedAssignmentData.maxScore}점
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submission Form */}
        {selectedAssignmentData.status !== 'submitted' && selectedAssignmentData.status !== 'overdue' && (
          <Card>
            <CardHeader>
              <CardTitle>과제 제출</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Submission */}
              <div>
                <label className="block text-sm font-medium mb-2">답안 작성</label>
                <Textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="과제 답안을 작성하세요..."
                  className="min-h-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {submissionText.length}자 작성됨
                </p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">파일 첨부</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <div className="text-sm text-gray-600 mb-2">
                    파일을 드래그하거나 클릭하여 업로드
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    파일 선택
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOC, DOCX, JPG, PNG 파일만 업로드 가능 (최대 10MB)
                  </p>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h5 className="text-sm font-medium">업로드된 파일</h5>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                        >
                          삭제
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t">
                <Button
                  onClick={() => handleSubmit(selectedAssignmentData.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!submissionText.trim() && uploadedFiles.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  과제 제출하기
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Assignment List View
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>과제 목록</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {assignments.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-blue-600">미제출</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === 'submitted').length}
              </div>
              <div className="text-sm text-green-600">제출완료</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {assignments.filter(a => a.status === 'overdue').length}
              </div>
              <div className="text-sm text-red-600">마감됨</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-lg">{assignment.title}</h3>
                    <Badge className={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1">
                        {assignment.status === 'submitted' ? '제출완료' : 
                         assignment.status === 'pending' ? '미제출' : '마감'}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {assignment.subject} • {assignment.teacher}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>마감: {assignment.dueDate} {assignment.dueTime}</span>
                    <span>•</span>
                    <span className={assignment.status === 'overdue' ? 'text-red-600' : 'text-orange-600'}>
                      {assignment.timeLeft}
                    </span>
                    <span>•</span>
                    <span>배점: {assignment.maxScore}점</span>
                  </div>
                  {assignment.status === 'submitted' && assignment.score && (
                    <div className="mt-2">
                      <Progress value={(assignment.score / assignment.maxScore) * 100} className="w-48" />
                      <span className="text-sm text-green-600 mt-1 inline-block">
                        {assignment.score}/{assignment.maxScore}점
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {assignment.status === 'submitted' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      다운로드
                    </Button>
                  )}
                  <Button
                    onClick={() => setSelectedAssignment(assignment.id)}
                    variant={assignment.status === 'pending' ? 'default' : 'outline'}
                    size="sm"
                  >
                    {assignment.status === 'pending' ? '제출하기' : 
                     assignment.status === 'submitted' ? '보기' : '확인'}
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
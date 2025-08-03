'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    receiveValidationResult?: (data: KriResultData) => void;
  }
}

// KRI 결과 데이터 타입 정의
interface KriResultData {
  okri_param1: string;
  okri_param2: string;
  okri_param3: string;
  okri_param4: string;
  okri_param5: string;
  okri_param6: string;
  okri_param7: string;
  okri_param8: string;
  okri_param9: string;
  okri_param10: string;
  okri_param11: string;
  okri_param12: string;
  okri_param13: string;
  okri_param14: string;
  okri_param15: string;
  okri_param16: string;
  okri_param17: string;
  okri_param18: string;
  okri_gubun?: string;
}

export default function PaperValidationPage() {
  const [formData, setFormData] = useState<KriResultData>({
    okri_param1: '',
    okri_param2: '',
    okri_param3: '',
    okri_param4: '',
    okri_param5: '',
    okri_param6: '',
    okri_param7: '',
    okri_param8: '',
    okri_param9: '',
    okri_param10: '',
    okri_param11: '',
    okri_param12: '',
    okri_param13: '',
    okri_param14: '',
    okri_param15: '',
    okri_param16: '',
    okri_param17: '',
    okri_param18: '',
  });

  // KRI 결과 데이터를 받는 함수
  const handleKriResult = (data: KriResultData) => {
    console.log('📥 KRI 결과 수신:', data);
    setFormData(data);
  };

  useEffect(() => {
    // 전역 함수로 등록하여 팝업에서 호출할 수 있도록 함
    window.receiveValidationResult = handleKriResult;

    // localStorage에서 저장된 결과 데이터 확인
    const savedResult = localStorage.getItem('kriValidationResult');
    if (savedResult) {
      try {
        const data = JSON.parse(savedResult);
        console.log('💾 localStorage에서 KRI 결과 로드:', data);
        handleKriResult(data);
        // 사용 후 삭제
        localStorage.removeItem('kriValidationResult');
      } catch (error) {
        console.error('localStorage 데이터 파싱 오류:', error);
      }
    }

    // postMessage 이벤트 리스너 추가 (api-test에서 오는 결과)
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigin = 'http://localhost:3000';
      if (event.origin !== allowedOrigin) return;

      if (event.data?.type === 'KRI_AUTH_SUCCESS') {
        console.log('📨 postMessage로 KRI 결과 수신:', event.data.payload);
        handleKriResult(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      delete window.receiveValidationResult;
    };
  }, []);

  // 폼 데이터 초기화
  const clearForm = () => {
    setFormData({
      okri_param1: '',
      okri_param2: '',
      okri_param3: '',
      okri_param4: '',
      okri_param5: '',
      okri_param6: '',
      okri_param7: '',
      okri_param8: '',
      okri_param9: '',
      okri_param10: '',
      okri_param11: '',
      okri_param12: '',
      okri_param13: '',
      okri_param14: '',
      okri_param15: '',
      okri_param16: '',
      okri_param17: '',
      okri_param18: '',
    });
  };

  // Input 값 변경 핸들러
  const handleInputChange = (param: keyof KriResultData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">논문 검증</h1>
      <p className="mb-4">KRI 논문 검증 결과가 자동으로 입력됩니다.</p>

      <div className="flex gap-2 mb-4">
        <Link href="/api-test">
          <Button>검증 시작</Button>
        </Link>
        <Button variant="outline" onClick={clearForm}>
          초기화
        </Button>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="okri_param1"
            className="block mb-2 text-sm font-medium">
            학술지명 (OKRI Param 1):
          </label>
          <Input
            id="okri_param1"
            value={formData.okri_param1}
            onChange={(e) => handleInputChange('okri_param1', e.target.value)}
            placeholder="학술지명"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param2"
            className="block mb-2 text-sm font-medium">
            논문제목 (OKRI Param 2):
          </label>
          <Input
            id="okri_param2"
            value={formData.okri_param2}
            onChange={(e) => handleInputChange('okri_param2', e.target.value)}
            placeholder="논문제목"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param3"
            className="block mb-2 text-sm font-medium">
            기타제목 (OKRI Param 3):
          </label>
          <Input
            id="okri_param3"
            value={formData.okri_param3}
            onChange={(e) => handleInputChange('okri_param3', e.target.value)}
            placeholder="기타제목"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param4"
            className="block mb-2 text-sm font-medium">
            게재년월 (OKRI Param 4):
          </label>
          <Input
            id="okri_param4"
            value={formData.okri_param4}
            onChange={(e) => handleInputChange('okri_param4', e.target.value)}
            placeholder="YYYYMM"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param5"
            className="block mb-2 text-sm font-medium">
            권(Volume) (OKRI Param 5):
          </label>
          <Input
            id="okri_param5"
            value={formData.okri_param5}
            onChange={(e) => handleInputChange('okri_param5', e.target.value)}
            placeholder="권"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param6"
            className="block mb-2 text-sm font-medium">
            호(Issue) (OKRI Param 6):
          </label>
          <Input
            id="okri_param6"
            value={formData.okri_param6}
            onChange={(e) => handleInputChange('okri_param6', e.target.value)}
            placeholder="호"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param7"
            className="block mb-2 text-sm font-medium">
            시작페이지 (OKRI Param 7):
          </label>
          <Input
            id="okri_param7"
            value={formData.okri_param7}
            onChange={(e) => handleInputChange('okri_param7', e.target.value)}
            placeholder="시작페이지"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param8"
            className="block mb-2 text-sm font-medium">
            끝페이지 (OKRI Param 8):
          </label>
          <Input
            id="okri_param8"
            value={formData.okri_param8}
            onChange={(e) => handleInputChange('okri_param8', e.target.value)}
            placeholder="끝페이지"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param9"
            className="block mb-2 text-sm font-medium">
            ISSN (OKRI Param 9):
          </label>
          <Input
            id="okri_param9"
            value={formData.okri_param9}
            onChange={(e) => handleInputChange('okri_param9', e.target.value)}
            placeholder="ISSN"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param10"
            className="block mb-2 text-sm font-medium">
            인용지수 (OKRI Param 10):
          </label>
          <Input
            id="okri_param10"
            value={formData.okri_param10}
            onChange={(e) => handleInputChange('okri_param10', e.target.value)}
            placeholder="인용지수"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param11"
            className="block mb-2 text-sm font-medium">
            출판사 (OKRI Param 11):
          </label>
          <Input
            id="okri_param11"
            value={formData.okri_param11}
            onChange={(e) => handleInputChange('okri_param11', e.target.value)}
            placeholder="출판사"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param12"
            className="block mb-2 text-sm font-medium">
            총저자수 (OKRI Param 12):
          </label>
          <Input
            id="okri_param12"
            value={formData.okri_param12}
            onChange={(e) => handleInputChange('okri_param12', e.target.value)}
            placeholder="총저자수"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param13"
            className="block mb-2 text-sm font-medium">
            초록번호 (OKRI Param 13):
          </label>
          <Input
            id="okri_param13"
            value={formData.okri_param13}
            onChange={(e) => handleInputChange('okri_param13', e.target.value)}
            placeholder="초록번호"
          />
        </div>
        <div>
          <label
            htmlFor="okri_param14"
            className="block mb-2 text-sm font-medium">
            검증ID (OKRI Param 14):
          </label>
          <Input
            id="okri_param14"
            value={formData.okri_param14}
            onChange={(e) => handleInputChange('okri_param14', e.target.value)}
            placeholder="검증ID"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param15"
            className="block mb-2 text-sm font-medium">
            검증카테고리 (OKRI Param 15):
          </label>
          <Input
            id="okri_param15"
            value={formData.okri_param15}
            onChange={(e) => handleInputChange('okri_param15', e.target.value)}
            placeholder="검증카테고리"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param16"
            className="block mb-2 text-sm font-medium">
            공동저자 (OKRI Param 16):
          </label>
          <Input
            id="okri_param16"
            value={formData.okri_param16}
            onChange={(e) => handleInputChange('okri_param16', e.target.value)}
            placeholder="공동저자명"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param17"
            className="block mb-2 text-sm font-medium">
            KRI등록구분 (OKRI Param 17):
          </label>
          <Input
            id="okri_param17"
            value={formData.okri_param17}
            onChange={(e) => handleInputChange('okri_param17', e.target.value)}
            placeholder="KRI등록구분"
          />
        </div>

        <div>
          <label
            htmlFor="okri_param18"
            className="block mb-2 text-sm font-medium">
            DOI (OKRI Param 18):
          </label>
          <Input
            id="okri_param18"
            value={formData.okri_param18}
            onChange={(e) => handleInputChange('okri_param18', e.target.value)}
            placeholder="DOI"
          />
        </div>
      </div>

      {/* 결과 데이터 미리보기 */}
      {Object.values(formData).some((value) => value !== '') && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">
            📊 받은 데이터 미리보기
          </h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

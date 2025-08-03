'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function WiseEncodeForm() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigin = 'http://localhost:3000';
      if (event.origin !== allowedOrigin) return;

      if (event.data?.type === 'KRI_AUTH_SUCCESS') {
        console.log('📥 결과 수신:', event.data.payload);
        setResult(JSON.stringify(event.data.payload, null, 2));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSubmit = async () => {
    const res = await fetch('/api/wise-encode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AgcId: '131440',
        RschrRegNo: '10054944',
      }),
    });

    const data = await res.json();
    console.log('okri_param1:', data.okri_param1);

    // 2. 새 창 열기
    const popup = window.open('about:blank', 'popup', 'width=920,height=800');
    // 3. form 생성해서 팝업창에 쓰기
    const formHtml = `

     <form id="frmSch" name="frmSch" action="http://www.kri.go.kr/kri/ra/cm/sso/wisesso_pop_api_utf8.jsp" method="post" target="popup">
      검색조건<br />
      기관ID(필수) :
      <input type="text" name="Kri_Param1" value="131440" /><br />
      <!-- 기관ID(필수) -->
      연구자등록번호 또는 직원사번(필수) :
      <input
        type="text"
        name="Kri_Param2"
        value="10054944"
      /><br /><!-- 연구자등록번호 또는 직원 사번(필수) -->
      논문제목(필수) :
      <input
        type="text"
        name="Kri_Param4"
        value="transformer fault"
      /><br /><!-- 논문제목(필수) -->
      학술지명(선택) :
      <input
        type="text"
        name="Kri_Param5"
        value=""
      /><br /><!-- 학술지명(선택) -->
      한국연구재단 등재구분(선택필수) :
      <input type="text" name="Kri_Param6" value="" />1-등재, 2-등재후보<br /><!-- 한국연구재단 등재구분 (선택필수) 1-등재, 2-등재후보 -->
      해외우수 학술지 구분(선택필수) :
      <input type="text" name="Kri_Param7" value="1" />1-SCI, 2-SCIE, 3-SSCI,
      4-A&HCI, 5-SCOPUS<br /><!-- 해외우수 학술지 구분(선택필수) 1-SCI, 2-SCIE, 3-SSCI, 4-A&HCI, 5-SCOPUS -->
      게재년도 :
      <input
        type="text"
        name="Kri_Param8"
        value="202505"
      /><br /><!-- 게재년도 -->
      URL(필수) :
      <input
        type="text"
        name="Kri_Param9"
        value="http://localhost:3000/api/kri-callback"
      /><br /><!-- 기관에서 돌려받을URL(필수) -->
      서비스코드(필수) :
      <input
        type="text"
        name="Kri_Service"
        value="4"
      /><br /><!-- 서비스코드(필수) -->
      기관PW(필수) :
      <input
        type="text"
        name="Kri_certify"
        value="donga131440"
      /><br /><!-- 기관PW(필수) -->
      CharSet(선택) :
      <input
        type="text"
        name="Kri_charset"
        value="utf-8"
      /><br /><!-- CHARSET(선택) -->
      <input
        type="text"
        name="Kri_rshcrRegNo"
        value="${data.okri_param1}"
      /><br /><!-- 암호화된 연구자등록번호(필수) -->
    </form>

    <script>
      document.getElementById('frmSch').submit();
    </script>
  `;

    popup?.document.write(formHtml);
    popup?.document.close(); // 중요! 문서 스트림을 닫아야 렌더링 됨
  };

  return (
    <div>
      <Button onClick={handleSubmit}>WISE 인코딩 요청</Button>
      {result && (
        <div>
          <h3>결과</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

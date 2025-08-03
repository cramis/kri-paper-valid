import { NextRequest, NextResponse } from 'next/server';

// KRI 시스템에서 결과를 받아오는 콜백 엔드포인트
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // KRI에서 전달받은 결과 데이터 처리
    const validationResult = {
      journalName: body.Kri_Param1 || '',
      paperTitleOriginal: body.Kri_Param2 || '',
      paperTitleOther: body.Kri_Param3 || '',
      publicationDate: body.Kri_Param4 || '',
      volume: body.Kri_Param5 || '',
      issue: body.Kri_Param6 || '',
      startPage: body.Kri_Param7 || '',
      endPage: body.Kri_Param8 || '',
      issn: body.Kri_Param9 || '',
      citationIndex: body.Kri_Param10 || '',
      publisher: body.Kri_Param11 || '',
      totalAuthors: body.Kri_Param12 || '',
      abstract: body.Kri_Param13 || '',
      validationId: body.Kri_Param14 || '',
      validationCategory: body.Kri_Param15 || '',
      participants: body.Kri_Param16 || '',
      kriRegistrationCategory: body.Kri_Param17 || ''
    };

    return NextResponse.json({
      success: true,
      data: validationResult
    });

  } catch (error) {
    console.error('콜백 처리 오류:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '콜백 처리 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  }
}

// GET 요청도 처리 (KRI 시스템에서 GET으로 리다이렉트할 수도 있음)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // URL 파라미터에서 결과 데이터 추출
    const validationResult = {
      journalName: searchParams.get('Kri_Param1') || '',
      paperTitleOriginal: searchParams.get('Kri_Param2') || '',
      paperTitleOther: searchParams.get('Kri_Param3') || '',
      publicationDate: searchParams.get('Kri_Param4') || '',
      volume: searchParams.get('Kri_Param5') || '',
      issue: searchParams.get('Kri_Param6') || '',
      startPage: searchParams.get('Kri_Param7') || '',
      endPage: searchParams.get('Kri_Param8') || '',
      issn: searchParams.get('Kri_Param9') || '',
      citationIndex: searchParams.get('Kri_Param10') || '',
      publisher: searchParams.get('Kri_Param11') || '',
      totalAuthors: searchParams.get('Kri_Param12') || '',
      abstract: searchParams.get('Kri_Param13') || '',
      validationId: searchParams.get('Kri_Param14') || '',
      validationCategory: searchParams.get('Kri_Param15') || '',
      participants: searchParams.get('Kri_Param16') || '',
      kriRegistrationCategory: searchParams.get('Kri_Param17') || ''
    };

    // 결과를 클라이언트에게 표시할 수 있는 HTML 페이지 반환
    const resultHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>논문 검증 결과</title>
        <script>
          // 부모 창으로 결과 전달
          if (window.opener && window.opener.receiveValidationResult) {
            window.opener.receiveValidationResult(${JSON.stringify(validationResult)});
            window.close();
          } else {
            // 부모 창이 없는 경우 결과 표시
            document.addEventListener('DOMContentLoaded', function() {
              document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(${JSON.stringify(validationResult)}, null, 2) + '</pre>';
            });
          }
        </script>
      </head>
      <body>
        <h1>논문 검증 결과</h1>
        <div id="result">결과를 부모 창으로 전달 중...</div>
      </body>
      </html>
    `;

    return new NextResponse(resultHtml, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });

  } catch (error) {
    console.error('GET 콜백 처리 오류:', error);
    
    return new NextResponse(
      `<html><body><h1>오류</h1><p>${error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}</p></body></html>`,
      { 
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      }
    );
  }
}
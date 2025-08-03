import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const result: Record<string, string> = {};
    for (let i = 1; i <= 18; i++) {
      const key = `okri_param${i}`;
      result[key] = params.get(key) || '';
    }

    result['okri_gubun'] = params.get('okri_gubun') || '';

    const json = JSON.stringify(result).replace(/</g, '\\u003c'); // < 태그 방지

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body>
          <script>
            window.opener?.postMessage({
              type: 'KRI_AUTH_SUCCESS',
              payload: ${json}
            }, '*');
            window.close();
          </script>
          <p>인증이 완료되었습니다. 창을 닫습니다...</p>
        </body>
      </html>
    `,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  } catch (error: unknown) {
    console.error('🔥 오류:', error);
    return new NextResponse(
      `<html><body><h1>서버 오류</h1><pre>${
        (error as Error).message
      }</pre></body></html>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }
}

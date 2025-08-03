// /app/api/wise-sso/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.json(); // { Kri_Param1: ..., Kri_Param2: ... }

  const url = 'http://www.kri.go.kr/kri/ra/cm/sso/wisesso_pop_api_utf8.jsp';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData).toString(),
  });

  const html = await response.text();
  return NextResponse.json({
    result: html, // 필요 시 전체 HTML도 반환
  });
}

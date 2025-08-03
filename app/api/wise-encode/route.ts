// app/api/wise-encode/route.ts (app router 기준)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { AgcId, RschrRegNo, returnUrl } = await req.json();

  const res = await fetch(
    'https://www.kri.go.kr/kri/ra/cm/sso/wise_Encode.jsp',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        AgcId,
        RschrRegNo,
        returnUrl,
      }).toString(),
    }
  );

  const html = await res.text();

  // 정규표현식으로 okri_param1 값 추출
  const match = html.match(
    /<input[^>]+name=["']okri_param1["'][^>]+value=["']([^"']+)["']/
  );
  const okriParam1 = match?.[1] || null;

  return NextResponse.json({ okri_param1: okriParam1, result: html });
}

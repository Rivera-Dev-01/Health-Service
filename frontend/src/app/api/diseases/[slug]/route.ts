import { NextRequest, NextResponse } from 'next/server';
import { getDiseaseWithTranslation } from '@/lib/diseases';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang') || 'en';

  const disease = await getDiseaseWithTranslation(slug, lang);

  if (!disease) {
    return NextResponse.json({ error: 'Disease not found' }, { status: 404 });
  }

  return NextResponse.json(disease);
}

import { NextRequest, NextResponse } from 'next/server';
import { generateReading } from '@/lib/ai/generator';
import { ReadingType, ReadingContext } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, context } = body as { type: ReadingType; context: ReadingContext };

    if (!type || !context || !context.name || !context.starSign || !context.mood) {
      return NextResponse.json(
        { error: 'Missing required fields: type and context (name, starSign, mood)' },
        { status: 400 }
      );
    }

    const reading = await generateReading(type, context);

    return NextResponse.json({ reading });
  } catch (error) {
    console.error('Error generating reading:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

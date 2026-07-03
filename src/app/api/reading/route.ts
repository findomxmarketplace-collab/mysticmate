import { NextRequest, NextResponse } from 'next/server';
import { generateReading } from '@/lib/ai/generator';
import { ReadingType, ReadingContext } from '@/lib/ai/prompts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming reading request:', { type: body.type, name: body.context?.name });

    const { type, context } = body as { type: ReadingType; context: ReadingContext };

    if (!type || !context || !context.name || !context.starSign || !context.mood) {
      console.error('Validation failed:', { type, context });
      return NextResponse.json(
        { error: `Missing fields. Please ensure Name, Mood, and Star Sign are filled.` },
        { status: 400 }
      );
    }

    const reading = await generateReading(type, context);
    return NextResponse.json({ reading });
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'The universe is temporarily clouded. Please try again in a moment.' },
      { status: 500 }
    );
  }
}

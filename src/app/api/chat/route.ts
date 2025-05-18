import { NextResponse } from 'next/server';

// Environment variables are automatically loaded by Next.js
const API_KEY = process.env.HUGGINGFACE_API_KEY;

// Log API key status immediately
console.log('🔑 API Key from process.env:', API_KEY ? `${API_KEY.substring(0, 5)}...` : 'Not found. Ensure .env.local is loaded.');
if (!API_KEY) {
  console.error('CRITICAL: Hugging Face API Key not found in process.env. App will likely fail to make API calls.');
}

// Function to directly call Hugging Face API using fetch
async function callHuggingFaceAPI(prompt: string): Promise<string> {
  const model = 'deepseek/deepseek-v3-0324';
  console.log(`🔄 API Route: Calling ${model} via Hugging Face router API`);
  const apiUrl = 'https://router.huggingface.co/novita/v3/openai/chat/completions';

  const payload = {
    model: model,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ API Route: Received response:', JSON.stringify(data, null, 2));
    return data.choices[0].message.content;
  } catch (error) {
    console.error('❌ API Route: Error calling Hugging Face API:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400 }
      );
    }

    const text = await callHuggingFaceAPI(prompt);
    return NextResponse.json({ text });
  } catch (error) {
    console.error('❌ API Route: Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 
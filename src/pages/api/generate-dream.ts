// pages/api/generate-dream.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You generate relaxing, vivid dreamscape narratives for audio and visual projection. Always respond with a short, descriptive title and a poetic visual description.`
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.9
    });

    const raw = completion.choices[0]?.message?.content || '';

    const lines = raw.split('\n').filter(Boolean);
    const title = lines[0]?.replace(/^Title:\s*/i, '').trim() || 'Untitled Dreamscape';
    const description = lines.slice(1).join(' ').replace(/^Description:\s*/i, '').trim() || 'No description provided.';

    return res.status(200).json({ title, description });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate dream content' });
  }
}

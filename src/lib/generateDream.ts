import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateDreamContent(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You generate relaxing, vivid dreamscape narratives for audio and visual projection. Always respond with a short, descriptive title and a poetic visual description.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.9
  });

  const response = completion.choices[0]?.message?.content || '';
  return parseDreamResponse(response);
}

// Split into title + description
function parseDreamResponse(raw: string) {
  const lines = raw.split('\n').filter(Boolean);
  const title = lines[0]?.replace(/^Title:\s*/i, '').trim() || 'Untitled Dreamscape';
  const description = lines.slice(1).join(' ').replace(/^Description:\s*/i, '').trim() || 'No description provided.';
  return { title, description };
}

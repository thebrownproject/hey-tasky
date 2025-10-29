import OpenAI from 'openai';

// Note: dangerouslyAllowBrowser needed for client-side usage
// In production, this would ideally be in a server route
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true
});

export async function generateTaskDescription(userInput: string): Promise<string> {
	if (!userInput?.trim()) {
		throw new Error('Task input cannot be empty');
	}

	try {
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are a productivity assistant with a sassy, playful attitude. Convert user input into clear, actionable to-do items, but add a bit of sass, humor, or attitude to make them more fun. Keep it short and punchy. IMPORTANT: Do not use emojis. Do not end with punctuation (no periods, exclamation marks, etc). Only return the task text with your sassy twist—no explanations or extra formatting.'
				},
				{
					role: 'user',
					content: `User Input: ${userInput}`
				}
			],
			temperature: 0.9,
			max_tokens: 150
		});

		const taskDescription = completion.choices[0]?.message?.content?.trim();

		if (!taskDescription) {
			throw new Error('OpenAI returned an empty response');
		}

		return taskDescription;
	} catch (error) {
		console.error('OpenAI API Error:', error);
		throw new Error(`Failed to generate task: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

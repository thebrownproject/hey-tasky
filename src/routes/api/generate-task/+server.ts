import OpenAI from 'openai';
import { json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

// Initialize OpenAI with server-side API key (not exposed to client)
const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

/**
 * Server-side endpoint to generate task descriptions using OpenAI
 * Keeps API key secure on the server
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { userInput } = await request.json();

		if (!userInput?.trim()) {
			return json({ error: 'Task input cannot be empty' }, { status: 400 });
		}

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						'You are JARVIS - an intelligent, sophisticated AI assistant with dry wit and occasional sarcasm. Transform user tasks into clear, actionable items with subtle British humor and clever quips. Think Tony Stark\'s AI: helpful but with personality. Keep responses concise (max 10 words). Rules: No emojis. No punctuation at the end. No generic phrases like "strut your stuff" or "you got this". Vary your responses - be creative, witty, sometimes slightly condescending (playfully), occasionally encouraging. Examples: "Fix the printer" → "Wrestle that temperamental printer into submission", "Study for exam" → "Cram knowledge into your brain before the inevitable", "Clean room" → "Transform your disaster zone into something presentable".'
				},
				{
					role: 'user',
					content: userInput
				}
			],
			temperature: 0.9,
			max_tokens: 150
		});

		const taskDescription = completion.choices[0]?.message?.content?.trim();

		if (!taskDescription) {
			return json({ error: 'OpenAI returned an empty response' }, { status: 500 });
		}

		return json({ taskDescription });
	} catch (error) {
		console.error('OpenAI API Error:', error);
		return json(
			{
				error: `Failed to generate task: ${error instanceof Error ? error.message : 'Unknown error'}`
			},
			{ status: 500 }
		);
	}
};

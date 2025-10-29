/**
 * Client-side service for generating task descriptions
 * Calls our secure server-side API endpoint which handles OpenAI integration
 */
export async function generateTaskDescription(userInput: string): Promise<string> {
	if (!userInput?.trim()) {
		throw new Error('Task input cannot be empty');
	}

	try {
		const response = await fetch('/api/generate-task', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ userInput })
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || 'Failed to generate task');
		}

		const { taskDescription } = await response.json();
		return taskDescription;
	} catch (error) {
		console.error('API Error:', error);
		throw new Error(
			`Failed to generate task: ${error instanceof Error ? error.message : 'Unknown error'}`
		);
	}
}

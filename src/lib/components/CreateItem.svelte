<script lang="ts">
	import { GoogleGenerativeAI } from '@google/generative-ai';

	let prompt = $state('');
	let isLoading = $state(false);
	let { onSubmit } = $props();

	// Google Generative AI
	const genAi = new GoogleGenerativeAI('AIzaSyBA3NI1Mh5Q2RJfGL6CTt1F9jQcFDo0Yh0');
	const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

	async function processAiTaskInput() {
		if (!prompt.trim()) return;

		isLoading = true;
		const combinedPrompt = `You are a productivity assistant. You are also sassy. Your task is to convert the following input into a clear, and actionable to-do item. Only return the task text—do not include any introductions, explanations, or extra formatting.
        User Input: ${prompt}`;
		try {
			const result = await model.generateContent(combinedPrompt);
			const AiResponse = result.response.text().trim();
			onSubmit(AiResponse);
			prompt = '';
		} catch (error) {
			console.error('Error generating content:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			processAiTaskInput();
		}
	}
</script>

<div class="mb-6">
	<h3 class="text-lg font-semibold text-purple-300 mb-3 flex items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 mr-2"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
				clip-rule="evenodd"
			/>
		</svg>
		Create New Task with AI
	</h3>

	<div
		class="flex items-center space-x-2 bg-gray-900/50 p-2 rounded-lg backdrop-blur-sm shadow-xl border border-purple-500/20 transition-all duration-300 hover:border-purple-500/40 hover:shadow-purple-500/10"
	>
		<input
			type="text"
			bind:value={prompt}
			on:keydown={handleKeydown}
			placeholder="Enter your task and let AI help format it"
			class="flex-1 bg-gray-800 text-white border-0 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/70 placeholder-gray-400"
		/>
		<button
			on:click={processAiTaskInput}
			disabled={isLoading}
			class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-md transition-all duration-200 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
		>
			{#if isLoading}
				<svg
					class="animate-spin h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<p class="text-xs text-gray-400 mt-2">
		Type your task and press Enter or click the button. AI will format it for you.
	</p>
</div>

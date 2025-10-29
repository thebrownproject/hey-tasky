<script lang="ts">
	import { generateTaskDescription } from '$lib/services/openai';

	let prompt = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');
	let { onSubmit } = $props();

	async function processAiTaskInput() {
		errorMessage = '';
		if (!prompt.trim()) return;

		isLoading = true;
		try {
			const formattedTask = await generateTaskDescription(prompt);
			onSubmit(formattedTask);
			prompt = '';
		} catch (error) {
			console.error('Error generating task:', error);
			errorMessage = 'Failed to generate task. Please try again.';
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
	<h3 class="text-sm font-medium text-gray-400 mb-3 tracking-wider">
		Create New Task
	</h3>

	<div class="flex items-center gap-2">
		<input
			type="text"
			bind:value={prompt}
			on:keydown={handleKeydown}
			placeholder="Enter your task and let AI help format it"
			class="flex-1 bg-[#1f1f21] text-[#f7f8f8] border border-[#2a2a2a] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[#3a3a3a] placeholder-gray-500 transition-colors"
		/>
		<button
			on:click={processAiTaskInput}
			disabled={isLoading}
			class="bg-[#e6e6e6] text-black px-4 py-2.5 rounded-md text-sm font-medium hover:bg-[#b8b8b8] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center min-w-[44px]"
		>
			{#if isLoading}
				<svg
					class="animate-spin h-4 w-4 text-black"
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
					class="h-4 w-4"
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

	<p class="text-xs text-gray-500 mt-2">
		Type your task and press Enter or click the button. AI will format it for you.
	</p>

	{#if errorMessage}
		<p class="text-xs text-red-400 mt-2 bg-red-900/10 border border-red-900/30 px-3 py-2 rounded-md">
			⚠️ {errorMessage}
		</p>
	{/if}
</div>

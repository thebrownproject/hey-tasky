<script lang="ts">
	let { taskList, editing, deleteTask, editTask, cancelEdit, saveTask } = $props();
</script>

<div class="space-y-4">
	{#if taskList.length === 0}
		<div
			class="bg-gray-800/70 border border-purple-500/20 p-6 rounded-lg text-center text-gray-400 italic"
		>
			No tasks yet. Add your first task above!
		</div>
	{:else}
		{#each taskList as task (task.id)}
			<div
				class="group flex items-center justify-between bg-gray-800/70 p-4 rounded-lg shadow-md border border-purple-500/10 hover:border-purple-500/30 transition-all duration-200 hover:shadow-purple-500/5"
			>
				<div class="flex items-center">
					<input
						type="checkbox"
						class="mr-4 accent-purple-500 w-5 h-5 transition-transform duration-200 hover:scale-110 cursor-pointer"
					/>

					{#if task.id !== editing.id}
						<span
							class="flex-1 text-white group-hover:text-purple-200 transition-colors duration-200"
						>
							{task.description}
						</span>
					{:else}
						<input
							type="text"
							bind:value={editing.description}
							placeholder="Edit task"
							class="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md outline-none border border-purple-500/40 focus:ring-2 focus:ring-purple-500/70 mr-4 min-w-[300px]"
							autofocus
						/>
					{/if}
				</div>

				<div class="flex gap-2">
					{#if task.id !== editing.id}
						<button
							class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-3 py-1.5 rounded-md text-white text-sm shadow-sm hover:shadow-purple-500/20 transition-all duration-200"
							on:click={() => editTask(task)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
								/>
							</svg>
						</button>
						<button
							class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-3 py-1.5 rounded-md text-white text-sm shadow-sm hover:shadow-pink-500/20 transition-all duration-200"
							on:click={() => deleteTask(task.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{:else}
						<button
							class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-3 py-1.5 rounded-md text-white text-sm shadow-sm hover:shadow-green-500/20 transition-all duration-200 flex items-center"
							on:click={saveTask}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
							Save
						</button>
						<button
							class="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 px-3 py-1.5 rounded-md text-white text-sm shadow-sm hover:shadow-gray-500/20 transition-all duration-200 flex items-center"
							on:click={cancelEdit}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
							Cancel
						</button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</div>

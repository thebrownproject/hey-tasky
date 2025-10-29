<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Task } from '$lib/classes/Task';

	let { task, editing, isCompleted = false, deleteTask, editTask, cancelEdit, saveTask, toggleComplete } = $props<{
		task: Task;
		editing: { id: string | null; description: string };
		isCompleted?: boolean;
		deleteTask: (id: string) => void;
		editTask: (task: Task) => void;
		cancelEdit: () => void;
		saveTask: () => void;
		toggleComplete: (id: string) => void;
	}>();

	let isEditing = $derived(task.id === editing.id);
</script>

<div
	transition:slide={{ duration: 200, easing: quintOut }}
	class="group flex items-center justify-between bg-[#1f1f21] border border-[#2a2a2a] p-4 rounded-lg hover:border-[#3a3a3a] transition-all duration-150"
	class:opacity-60={isCompleted}
>
	<div class="flex items-center flex-1 min-w-0">
		<input
			type="checkbox"
			checked={task.completed}
			on:change={() => toggleComplete(task.id)}
			class="mr-3 w-4 h-4 rounded border-[#2a2a2a] bg-[#1f1f21] checked:bg-[#131315] checked:border-[#3a3a3a] transition-all cursor-pointer accent-[#e6e6e6]"
		/>

		{#if !isEditing}
			<span
				class="flex-1 text-[#f7f8f8] text-sm min-w-0 break-words"
				class:line-through={isCompleted}
			>
				{task.description}
			</span>
		{:else}
			<input
				type="text"
				bind:value={editing.description}
				placeholder="Edit task"
				class="flex-1 bg-[#131315] text-[#f7f8f8] text-sm px-3 py-1.5 rounded-md border border-[#2a2a2a] focus:outline-none focus:border-[#3a3a3a] mr-3"
				autofocus
			/>
		{/if}
	</div>

	<div class="flex gap-2 ml-4 shrink-0">
		{#if !isEditing}
			<button
				class="p-2 rounded-md bg-[#e6e6e6] hover:bg-[#b8b8b8] transition-all duration-150 active:scale-95"
				on:click={() => editTask(task)}
				aria-label="Edit task"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-black"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
					/>
				</svg>
			</button>
			<button
				class="p-2 rounded-md bg-[#e6e6e6] hover:bg-[#8b5050] transition-all duration-150 active:scale-95 group/delete"
				on:click={() => deleteTask(task.id)}
				aria-label="Delete task"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-black group-hover/delete:text-white transition-colors"
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
				class="px-3 py-1.5 rounded-md bg-[#e6e6e6] text-black text-sm font-medium hover:bg-[#b8b8b8] transition-all duration-150 active:scale-95 flex items-center"
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
				class="px-3 py-1.5 rounded-md border border-[#2a2a2a] text-gray-400 text-sm font-medium hover:bg-[#0a0a0a] transition-all duration-150 active:scale-95 flex items-center"
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

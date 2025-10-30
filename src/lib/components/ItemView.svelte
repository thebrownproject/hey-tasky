<script lang="ts">
	import { fade } from 'svelte/transition';
	import TaskItem from './TaskItem.svelte';

	let { taskList, editing, deleteTask, editTask, cancelEdit, saveTask, toggleComplete } = $props();

	// Separate active and completed tasks
	let activeTasks = $derived(taskList.filter((task) => !task.completed));
	let completedTasks = $derived(taskList.filter((task) => task.completed));
</script>

<!-- Active Tasks Section -->
<div class="space-y-2">
	{#if activeTasks.length === 0}
		<div
			transition:fade={{ duration: 200 }}
			class="bg-black/50 border border-[#1a1a1a] p-8 rounded-lg text-center text-gray-500 text-sm"
		>
			{#if completedTasks.length > 0}
				All tasks completed!
			{:else}
				No tasks yet. Add your first task above!
			{/if}
		</div>
	{:else}
		{#each activeTasks as task (task.id)}
			<TaskItem
				{task}
				{editing}
				{deleteTask}
				{editTask}
				{cancelEdit}
				{saveTask}
				{toggleComplete}
			/>
		{/each}
	{/if}
</div>

<!-- Completed Tasks Section -->
{#if completedTasks.length > 0}
	<div class="mt-8 space-y-2">
		<h3 class="text-sm font-medium text-gray-400 mb-4 tracking-wider">Completed Tasks</h3>
		{#each completedTasks as task (task.id)}
			<TaskItem
				{task}
				{editing}
				isCompleted={true}
				{deleteTask}
				{editTask}
				{cancelEdit}
				{saveTask}
				{toggleComplete}
			/>
		{/each}
	</div>
{/if}

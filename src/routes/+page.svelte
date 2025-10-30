<script lang="ts">
	import CreateItem from '$lib/components/CreateItem.svelte';
	import ItemView from '$lib/components/ItemView.svelte';
	import { taskStore } from '$lib/stores/taskStore.svelte';

	// Calculate active and completed counts
	let activeCount = $derived(taskStore.taskList.filter((task) => !task.completed).length);
	let completedCount = $derived(taskStore.taskList.filter((task) => task.completed).length);
</script>

<div class="min-h-screen bg-[#08090a]">
	<div class="max-w-2xl mx-auto px-6 py-16">
		<div class="mb-8">
			<h1 class="text-5xl font-semibold text-[#f7f8f8] tracking-tight">Hey Tasky</h1>
		</div>

		<div class="bg-[#131315] border border-[#222222] rounded-lg p-8 mb-6">
			<CreateItem onSubmit={taskStore.addTask} />

			<div class="mt-8">
				<h2 class="text-sm font-medium text-gray-400 mb-4 tracking-wider">Your Tasks</h2>
				<ItemView
					taskList={taskStore.taskList}
					editing={taskStore.editing}
					deleteTask={taskStore.deleteTask}
					editTask={taskStore.startEdit}
					cancelEdit={taskStore.cancelEdit}
					saveTask={taskStore.saveEdit}
					toggleComplete={taskStore.toggleComplete}
				/>
			</div>
		</div>

		<p class="text-sm text-gray-500 text-center">
			{#if taskStore.taskList.length === 0}
				No tasks yet
			{:else if completedCount === 0}
				{activeCount} {activeCount === 1 ? 'task' : 'tasks'}
			{:else if activeCount === 0}
				{completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
			{:else}
				{activeCount} active · {completedCount} completed
			{/if}
		</p>
	</div>
</div>

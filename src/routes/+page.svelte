<script lang="ts">
	// 1. Imports
	import CreateItem from '$lib/components/CreateItem.svelte';
	import ItemView from '$lib/components/ItemView.svelte';
	import { onMount } from 'svelte';

	class Task {
		id: number;
		description: string;

		constructor(id: number, description: string) {
			this.id = id;
			this.description = description;
		}
	}

	let nextId = 1;
	let taskList = $state<Task[]>([]);

	const handleAiTaskSubmit = (description: string) => {
		const task = new Task(nextId++, description);
		taskList = [...taskList, task];
	};

	const deleteTask = (id: number) => {
		taskList = taskList.filter((task) => task.id !== id);
	};

	let editing = $state({
		id: null as number | null,
		description: ''
	});

	const editTask = (task: Task) => {
		editing.id = task.id;
		editing.description = task.description;
	};

	const saveTask = () => {
		taskList = taskList.map((task) =>
			task.id === editing.id ? new Task(task.id, editing.description) : task
		);
		editing.id = null;
		editing.description = '';
	};

	const cancelEdit = () => {
		editing.id = null;
		editing.description = '';
	};

	let localStorageReady = false;

	// Fix the effect to properly track the taskList changes
	$effect(() => {
		console.log('Effect triggered, saving taskList:', taskList);
		if (typeof localStorage !== 'undefined' && localStorageReady) {
			localStorage.setItem('taskList', JSON.stringify(taskList));
		}
	});

	onMount(() => {
		try {
			const stored = localStorage.getItem('taskList');
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					taskList = parsed.map((task) => new Task(task.id, task.description));

					// Calculate next ID based on existing tasks
					if (taskList.length > 0) {
						const ids = taskList.map((task) => task.id);
						nextId = Math.max(...ids) + 1;
					}
				}
			}
		} catch (error) {
			console.error('Error loading from localStorage:', error);
			// Reset to defaults if there's an error
			taskList = [];
			nextId = 1;
		} finally {
			localStorageReady = true;
		}
	});
</script>

<div class="min-h-screen bg-gray-900 text-white">
	<div class="max-w-2xl mx-auto px-4 py-12">
		<h1
			class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center"
		>
			Hey Tasky
		</h1>
		<p class="text-base font-medium text-purple-300/80 mb-8 text-center">
			like Hey Siri.. but with more sass
		</p>

		<div
			class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-2xl mb-8"
		>
			<CreateItem onSubmit={handleAiTaskSubmit} />

			<div class="mt-6">
				<h2 class="text-xl font-bold text-purple-300 mb-4 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
						<path
							fill-rule="evenodd"
							d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
							clip-rule="evenodd"
						/>
					</svg>
					Your Tasks
				</h2>
				<ItemView {taskList} {editing} {deleteTask} {editTask} {cancelEdit} {saveTask} />
			</div>
		</div>

		<p class="text-sm text-purple-300/70 text-center">
			Total tasks: <span class="font-bold bg-purple-900/50 px-2 py-1 rounded-md"
				>{taskList.length}</span
			>
		</p>
	</div>
</div>

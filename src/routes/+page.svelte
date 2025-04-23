<script lang="ts">
	// 1. Imports
	import CreateItem from '$lib/components/CreateItem.svelte'; // Component for adding new tasks via AI
	import ItemView from '$lib/components/ItemView.svelte'; // Component for displaying the list of tasks
	import { onMount } from 'svelte'; // Svelte lifecycle function for running code after the component mounts

	// Defines the structure for a Task object
	class Task {
		id: number; // Unique identifier for the task
		description: string; // Text description of the task

		constructor(id: number, description: string) {
			this.id = id;
			this.description = description;
		}
	}

	// State variable to keep track of the next available ID for new tasks
	let nextId = 1;
	// State variable holding the array of Task objects, using Svelte 5 runes for reactivity
	let taskList = $state<Task[]>([]);

	// Function to handle adding a new task submitted via the CreateItem component
	const handleAiTaskSubmit = (description: string) => {
		const task = new Task(nextId++, description); // Create a new Task instance with the next ID
		taskList = [...taskList, task]; // Add the new task to the taskList array (immutable update)
	};

	// Function to delete a task based on its ID
	const deleteTask = (id: number) => {
		taskList = taskList.filter((task) => task.id !== id); // Filter out the task with the matching ID
	};

	// State variable to manage the task currently being edited
	let editing = $state({
		id: null as number | null, // ID of the task being edited, or null if none
		description: '' // Current description in the edit input field
	});

	// Function to initiate editing a task
	const editTask = (task: Task) => {
		editing.id = task.id; // Set the ID of the task to edit
		editing.description = task.description; // Populate the edit input with the task's current description
	};

	// Function to save the changes to an edited task
	const saveTask = () => {
		// Map over the taskList, replacing the edited task with a new Task instance containing the updated description
		taskList = taskList.map((task) =>
			task.id === editing.id ? new Task(task.id, editing.description) : task
		);
		// Reset the editing state
		editing.id = null;
		editing.description = '';
	};

	// Function to cancel the editing process
	const cancelEdit = () => {
		// Reset the editing state without saving changes
		editing.id = null;
		editing.description = '';
	};

	// Flag to ensure localStorage operations only run after onMount completes
	let localStorageReady = false;

	// Svelte 5 effect rune: This code runs whenever taskList changes
	// It saves the current taskList to localStorage
	$effect(() => {
		console.log('Effect triggered, saving taskList:', taskList); // Debugging log
		// Check if localStorage is available and if onMount has finished
		if (typeof localStorage !== 'undefined' && localStorageReady) {
			localStorage.setItem('taskList', JSON.stringify(taskList)); // Save the task list as a JSON string
		}
	});

	// Svelte lifecycle function: Runs once after the component is first rendered
	onMount(() => {
		try {
			// Attempt to load the task list from localStorage
			const stored = localStorage.getItem('taskList');
			if (stored) {
				const parsed = JSON.parse(stored); // Parse the stored JSON string
				// Ensure the parsed data is an array before proceeding
				if (Array.isArray(parsed)) {
					// Recreate Task instances from the plain objects stored in localStorage
					taskList = parsed.map((task) => new Task(task.id, task.description));

					// Recalculate the nextId based on the highest existing ID
					if (taskList.length > 0) {
						const ids = taskList.map((task) => task.id);
						nextId = Math.max(...ids) + 1;
					}
				}
			}
		} catch (error) {
			console.error('Error loading from localStorage:', error); // Log any errors during loading
			// Reset to default state if loading fails
			taskList = [];
			nextId = 1;
		} finally {
			// Indicate that localStorage operations can now safely occur
			localStorageReady = true;
		}
	});
</script>

<!-- HTML Markup for the page -->
<div class="min-h-screen bg-gray-900 text-white">
	<div class="max-w-2xl mx-auto px-4 py-12">
		<!-- Page Title -->
		<h1
			class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center"
		>
			Hey Tasky
		</h1>
		<!-- Subtitle -->
		<p class="text-base font-medium text-purple-300/80 mb-8 text-center">
			like Hey Siri.. but with more sass
		</p>

		<!-- Main content container -->
		<div
			class="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-2xl mb-8"
		>
			<!-- Component to create new tasks -->
			<CreateItem onSubmit={handleAiTaskSubmit} />

			<!-- Section to display existing tasks -->
			<div class="mt-6">
				<h2 class="text-xl font-bold text-purple-300 mb-4 flex items-center">
					<!-- Task list icon -->
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
				<!-- Component to view and manage tasks -->
				<!-- Pass necessary state and functions as props -->
				<ItemView {taskList} {editing} {deleteTask} {editTask} {cancelEdit} {saveTask} />
			</div>
		</div>

		<!-- Display the total number of tasks -->
		<p class="text-sm text-purple-300/70 text-center">
			Total tasks: <span class="font-bold bg-purple-900/50 px-2 py-1 rounded-md"
				>{taskList.length}</span
			>
		</p>
	</div>
</div>

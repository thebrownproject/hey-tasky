import { Task } from '$lib/classes/Task';
import type { StoredTask, EditingState } from '$lib/types';

class TaskStore {
	taskList = $state<Task[]>([]);
	editing = $state<EditingState>({
		id: null,
		description: ''
	});

	constructor() {
		// Load from localStorage on initialization
		if (typeof localStorage !== 'undefined') {
			const stored = localStorage.getItem('taskList');
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					if (Array.isArray(parsed)) {
						this.taskList = parsed.map(
							(task: StoredTask) => new Task(task.description, task.id, task.completed ?? false)
						);
					}
				} catch (error) {
					console.error('Error loading tasks from localStorage:', error);
				}
			}
		}
	}

	addTask = (description: string) => {
		const task = new Task(description);
		this.taskList = [...this.taskList, task];
		this.saveToLocalStorage();
	};

	deleteTask = (id: string) => {
		this.taskList = this.taskList.filter((task) => task.id !== id);
		this.saveToLocalStorage();
	};

	toggleComplete = (id: string) => {
		this.taskList = this.taskList.map((task) =>
			task.id === id ? new Task(task.description, task.id, !task.completed) : task
		);
		this.saveToLocalStorage();
	};

	startEdit = (task: Task) => {
		this.editing.id = task.id;
		this.editing.description = task.description;
	};

	saveEdit = () => {
		this.taskList = this.taskList.map((task) =>
			task.id === this.editing.id
				? new Task(this.editing.description, task.id, task.completed)
				: task
		);
		this.editing.id = null;
		this.editing.description = '';
		this.saveToLocalStorage();
	};

	cancelEdit = () => {
		this.editing.id = null;
		this.editing.description = '';
	};

	private saveToLocalStorage() {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('taskList', JSON.stringify(this.taskList));
		}
	}
}

export const taskStore = new TaskStore();

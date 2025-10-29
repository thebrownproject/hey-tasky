import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a task in the todo list
 */
export class Task {
	id: string;
	description: string;
	completed: boolean;

	constructor(description: string, id?: string, completed: boolean = false) {
		this.id = id || uuidv4();
		this.description = description;
		this.completed = completed;
	}
}

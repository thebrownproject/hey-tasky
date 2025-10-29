/**
 * Represents a task stored in localStorage
 */
export interface StoredTask {
	id: string;
	description: string;
	completed?: boolean;
}

/**
 * State for tracking which task is currently being edited
 */
export interface EditingState {
	id: string | null;
	description: string;
}

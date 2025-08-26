// Defines the Task shape and simple helpers

export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
};

export class Task {
  constructor({ id, title, description = '', dueDate = null, status = TaskStatus.TODO, createdAt, updatedAt }) {
    this.id = id; 
    this.title = title; 
    this.description = description; 
    this.dueDate = dueDate; 
    this.status = status; 
    this.createdAt = createdAt; 
    this.updatedAt = updatedAt; 
  }
}

// In-memory data and business logic

import { Task, TaskStatus } from '../models/task.js';
import { randomUUID } from 'crypto';

const tasks = []; // our in-memory DB (resets on server restart)

function isValidISODateString(val) {
  if (val === null || val === undefined || val === '') return true; // allow missing/null
  const d = new Date(val);
  return !Number.isNaN(d.getTime()) && typeof val === 'string';
}

export function listTasks() {
  return tasks;
}

export function getTaskById(id) {
  return tasks.find(t => t.id === id) || null;
}

export function createTask({ title, description, dueDate, status }) {
  const now = new Date().toISOString();
  const id = randomUUID();

  const task = new Task({
    id,
    title,
    description: description ?? '',
    dueDate: dueDate ?? null,
    status: status ?? TaskStatus.TODO,
    createdAt: now,
    updatedAt: now
  });

  tasks.push(task);
  return task;
}

export function updateTask(id, { title, description, dueDate, status }) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;

  const existing = tasks[idx];
  const updated = {
    ...existing,
    title: title ?? existing.title,
    description: description ?? existing.description,
    dueDate: dueDate === undefined ? existing.dueDate : dueDate,
    status: status ?? existing.status,
    updatedAt: new Date().toISOString()
  };

  tasks[idx] = new Task(updated);
  return tasks[idx];
}

export function deleteTask(id) {
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

// Simple validation (used by controller)
export function validateTaskPayload({ title, description, dueDate, status }, { partial = false } = {}) {
  const errors = [];

  if (!partial) {
    if (!title || typeof title !== 'string' || !title.trim()) {
      errors.push('title is required and must be a non-empty string.');
    }
  } else {
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      errors.push('title must be a non-empty string when provided.');
    }
  }

  if (description !== undefined && typeof description !== 'string') {
    errors.push('description must be a string.');
  }

  if (dueDate !== undefined && !isValidISODateString(dueDate)) {
    errors.push('dueDate must be a valid ISO date string (e.g., "2025-08-25T13:00:00.000Z").');
  }

  const allowed = Object.values(TaskStatus);
  if (status !== undefined && !allowed.includes(status)) {
    errors.push(`status must be one of: ${allowed.join(', ')}.`);
  }

  return errors;
}

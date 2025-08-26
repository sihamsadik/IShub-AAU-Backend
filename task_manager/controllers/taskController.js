import {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  validateTaskPayload
} from '../data/taskService.js';

export async function getAllTasks(req, res, next) {
  try {
    const data = listTasks();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function getTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = getTaskById(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export async function createTaskHandler(req, res, next) {
  try {
    const errors = validateTaskPayload(req.body, { partial: false });
    if (errors.length) return res.status(400).json({ errors });

    const task = createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTaskHandler(req, res, next) {
  try {
    // PUT: we’ll allow partial updates here for convenience.
    const errors = validateTaskPayload(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ errors });

    const { id } = req.params;
    const updated = updateTask(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTaskHandler(req, res, next) {
  try {
    const { id } = req.params;
    const ok = deleteTask(id);
    if (!ok) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

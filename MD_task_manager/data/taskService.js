import Task from '../models/task.js';
import mongoose from 'mongoose';

export const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

export const getAllTasks = async () => {
  return await Task.find();
};

export const getTaskById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid task ID');
  }
  return await Task.findById(id);
};

export const updateTask = async (id, taskData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid task ID');
  }
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

export const deleteTask = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid task ID');
  }
  return await Task.findByIdAndDelete(id);
};

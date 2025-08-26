import { Router } from 'express';
import {
  getAllTasks,
  getTask,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler
} from '../controllers/taskController.js';

const router = Router();

router.get('/', getAllTasks);
router.get('/:id', getTask);
router.post('/', createTaskHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;

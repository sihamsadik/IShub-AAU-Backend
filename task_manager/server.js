import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();


app.use(express.json()); 

app.use('/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'task-manager' });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});


app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(3000, () => {
  console.log(`Task Manager API listening on port 3000`);
});

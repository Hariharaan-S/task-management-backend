import express from 'express'
import taskController from '../controllers/TaskController.js'
import cors from 'cors';

const taskRouter = express.Router();

taskRouter.post('/createTask', taskController.createNewTask);

taskRouter.post('/getpresenttasks', taskController.getPresentTasksFromModel);

taskRouter.get('/past', taskController.putPastTask);

taskRouter.post('/getduepasttasks', taskController.getDuePastTasksFromModel);

taskRouter.patch('/edit/task', taskController.editTask);

taskRouter.delete('/delete/task', taskController.deleteTask);

taskRouter.post('/markdone', taskController.markAsDoneTask);

taskRouter.post('/getdonetasks', taskController.getDoneTasks);


export default taskRouter;
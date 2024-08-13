import { v4 as uuidv4 } from 'uuid';
import { getTasks, getPastTasks, pastTasks, createTask, editTask, deleteTask, createPastTask, getTasksDone, markTaskDone } from "../models/TaskModel.js";

const taskController = {
    getPresentTasksFromModel: async (req, res) => {
        const user = req.body;
        const tasks = await getTasks(user.id);
        res.status(200).send({ message: tasks })
    },
    putPastTask: async (req, res) => {
        const payload = req.body.payload;
        const tasks = await pastTasks(payload);
        if (!tasks) {
            const response = createPastTask(payload);
            if (response) {
                res.status(200);
            } else {
                res.send(300)
            }
        } else {
            res.status(300)
        }
    },

    getDuePastTasksFromModel: async (req, res) => {
        const user = req.body;
        const tasks = await getPastTasks(user.id);
        if (tasks)
            res.status(200).send({ message: tasks })
        else
            res.status(301)
    },

    createNewTask: (req, res) => {
        const body = req.body;
        const newDate = body.date.split('T')[0]
        const changedDate = new Date(newDate).getTime()
        const newId = uuidv4()
        const response = createTask({
            task_id: newId,
            u_id: body.u_id,
            title: body.title,
            description: body.description,
            due_date: changedDate
        })
        if (response) {
            res.status(200);
            res.send({ message: "success" })
        } else {
            res.send(300);
        }
    },

    editTask: async (req, res) => {
        const body = req.body;
        const changedDate = new Date(body.due_date).getTime()
        const response = await editTask({
            task_id: body.task_id, taskBody: {
                title: body.title,
                description: body.description,
                due_date: changedDate
            }
        })
        if (response) {
            res.status(200).send("received!")
        } else {
            res.send(300);
        }

    },

    deleteTask: async (req, res) => {
        const body = req.body;
        const response = await deleteTask(body.id);
        if (response) {
            res.status(200).send('Deleted!')
        } else {
            res.status(300);
        }

    },

    markAsDoneTask: async (req, res) => {
        const body = req.body;
        await markTaskDone(body.id);
        res.status(200)
    },
    getDoneTasks: async (req, res) => {
        const body = req.body;
        const doneTasks = await getTasksDone(body);
        res.status(200).json({ message: doneTasks });
    }
}

export default taskController;
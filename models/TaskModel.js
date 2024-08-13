import mongoose from 'mongoose';
import 'dotenv/config'


mongoose.connect(process.env.MONGO_DB_CLIENT);

const TaskSchema = new mongoose.Schema(
    {
        task_id: String,
        u_id: String,
        title: String,
        description: String,
        due_date: Number
    }
)

const PastTaskSchema = new mongoose.Schema(
    {
        task_id: String,
        u_id: String,
        title: String,
        description: String,
        due_date: Number
    }
)

const TasksMarkAsDoneSchema = new mongoose.Schema(
    {
        task_id: String,
        u_id: String,
        title: String,
        description: String,
        due_date: Number
    }
)

const Task = new mongoose.model('task', TaskSchema);
const PastTask = new mongoose.model('pasttask', PastTaskSchema);
const DoneTask = new mongoose.model('donetask', TasksMarkAsDoneSchema);

export const createTask = (task) => {
    const newTask = new Task(task);
    newTask.save();
    return true;
}

export const editTask = async ({ task_id, taskBody }) => {
    const prevTask = await Task.updateOne({ task_id: task_id }, taskBody);
    return true;
}

export const deleteTask = async (id) => {
    await Task.deleteOne({ task_id: id })
    return true;
}

export const getPastTasks = async (id) => {
    const tasks = await PastTask.find({ u_id: id })
    return tasks;
}

export const pastTasks = async (id) => {
    const tasks = await PastTask.findOne({ u_id: id })
    return tasks;
}

export const getTasks = async (id) => {
    const tasks = await Task.find({ u_id: id })
    return tasks;
}

export const createPastTask = (payload) => {
    const pt = new PastTask(payload)
    pt.save();
    return true;
}

export const markTaskDone = async (id) => {
    try {
        const { u_id, title, description, due_date } = await Task.findOne({ task_id: id });
        const doneTask = {
            task_id: id,
            u_id,
            title,
            description,
            due_date
        }
        const markedDoneTask = new DoneTask(doneTask);
        await markedDoneTask.save();
        await Task.deleteOne({ task_id: id })
        return true;
    } catch (error) {
        console.error('Error marking task as done:', error);
    }
}


export const getTasksDone = async (id) => {
    const doneTasks = await DoneTask.find(id);
    return doneTasks;
}
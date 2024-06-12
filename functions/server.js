import express, { Router } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import ServerlessHttp from 'serverless-http'

mongoose.connect(process.env.MONGO_DB_CLIENT + "taskmanagement")

const ProfileSchema = new mongoose.Schema(
    {
        id: String,
        displayName: String,
        email: String,
        password: String
    }
)

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

const Profile = new mongoose.model('profile', ProfileSchema)
const Task = new mongoose.model('task', TaskSchema)
const PastTask = new mongoose.model('pasttask', PastTaskSchema)
const app = express();

const router = Router();

router.use(cors({
    origin: 'https://main--curious-lily-c62daa.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json())
app.use('/.netlify/functions/', router)

router.post('/auth/register', (req, res) => {
    var profile = req.body
    const newId = uuidv4()
    profile = { ...profile, id: newId }
    const newProfile = new Profile(profile)
    newProfile.save()
    res.status(200).json(profile);
})

router.post('/auth/login', async (req, res) => {
    const profile = req.body;
    const p = await Profile.findOne({ email: profile.email })
    if (p === null) res.status(401)
    if (p.password !== profile.password) {
        res.status(401).send('Wrong Password')
    } else {
        res.status(200).json(p)
    }
})

router.post('/get/tasks', async (req, res) => {
    const user = req.body;
    const tasks = await Task.find({ u_id: user.id })
    res.status(200).send({ message: tasks })
})

router.post('/past', async (req, res) => {
    const payload = req.body.payload;
    const tasks = await PastTask.findOne({ u_id: payload.id })
    if (!tasks) {
        const pt = new PastTask(payload)
        pt.save();
        res.status(200);
    } else {
        res.status(300)
    }

})

router.post('/get/pasttasks', async (req, res) => {
    const user = req.body;
    console.log(user)
    const tasks = await PastTask.find({ u_id: user.id })
    console.log(tasks)
    if (tasks)
        res.status(200).send({ message: tasks })
    else
        res.status(301)
})

router.post('/create-task', (req, res) => {
    const body = req.body;
    const newDate = body.date.split('T')[0]
    console.log(newDate)
    const changedDate = new Date(newDate).getTime()
    const newId = uuidv4()
    const newTask = new Task({
        task_id: newId,
        u_id: body.u_id,
        title: body.title,
        description: body.description,
        due_date: changedDate
    })
    newTask.save()
    res.status(200);
    res.send({ message: "success" })
})
router.patch('/edit/task', async (req, res) => {
    const body = req.body;
    const changedDate = new Date(body.due_date).getTime()
    const prevTask = await Task.updateOne({ task_id: body.id }, {
        title: body.title,
        description: body.description,
        due_date: changedDate
    })
    console.log(prevTask.modifiedCount)
    res.status(200).send("received!")
})

router.delete('/delete/task', async (req, res) => {
    const body = req.body;
    await Task.deleteOne({ task_id: body.id })
    res.status(200).send('Deleted!')
})

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log('Server running at port 5000')
})

export const handler = ServerlessHttp(app)
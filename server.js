import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/UserRoute.js';
import taskRouter from './routes/TaskRoute.js';


const app = express();
app.use(cors({
    origin: ['https://main--curious-lily-c62daa.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

app.use(bodyParser.json())

app.use('/user', userRouter);

app.use('/task', taskRouter);

const PORT = 5000 || process.env.PORT

app.listen(PORT, () => {
    console.log('Server running at port 5000')
})
import express from 'express'
import userController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/registeruser', userController.registerUser)

userRouter.post('/login', userController.loginUser)

export default userRouter;
import { createUser, loginUser } from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';

const userController = {
    registerUser: async (req, res) => {
        try {
            let profile = req.body;
            const newId = uuidv4();
            profile = { ...profile, id: newId };
            const response = await createUser(profile);
            if (response) {
                res.status(200).json(profile);
            } else {
                res.status(500).json({ message: "Failed to create user" });
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
    loginUser: async (req, res) => {
        try {
            const profile = req.body;
            const p = await loginUser(profile.email);
            if (!p) {
                res.status(401).json({ message: "No such account" });
            } else if (p.password !== profile.password) {
                res.status(401).send('Wrong Password');
            } else {
                res.status(200).json(p);
            }
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}

export default userController;

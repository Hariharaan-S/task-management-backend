import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_DB_CLIENT);

const ProfileSchema = new mongoose.Schema({
    id: String,
    displayName: String,
    email: String,
    password: String
});

const Profile = mongoose.model('Profile', ProfileSchema);

export const createUser = async (profile) => {
    try {
        const newProfile = new Profile(profile);
        await newProfile.save();
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        return false;
    }
}

export const loginUser = async (email) => {
    try {
        const user = await Profile.findOne({ email: email });
        return user;
    } catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
}

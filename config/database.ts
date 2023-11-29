import mongoose from "mongoose";

export const connect = async(): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected!`);
    } catch (err) {
        console.log(`Failed Database Connection!`);
    }
}
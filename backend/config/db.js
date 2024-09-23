import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Praveen:0987654321@cluster0.2fxw0.mongodb.net/food-del').then(() => console.log("DB Connected."));
}
import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config()


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    //  process.exit(1);
  }
};

export default connectDb;

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";
// import postRoutes from "./routes/post.route.js";
// import commentRoutes from "./routes/comment.route.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// // import path from "path";

// dotenv.config();

// // const __dirname = path.resolve();

// const app = express();

// app.use(
//   cors({
//     origin: [
//       "https://elevate-self-fcv3.vercel.app",
//       "http://127.0.0.1:5173",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDb is connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/comment", commentRoutes);

// // app.use(express.static(path.join(__dirname, "/client/dist")));

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// // });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000!");
// });




import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { spawn } from "child_process";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://elevate-self-fcv3.vercel.app",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

const pythonProcess = spawn('python', ['./sentimentAnalyserServer.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python script stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python script stderr: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python script exited with code ${code}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

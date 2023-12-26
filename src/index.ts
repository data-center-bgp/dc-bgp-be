import express from "express";
import cors from "cors";
import { userRouter } from "./user/user.router";
import { createServer } from "http";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const server = createServer(app);

app.use("/user", userRouter);

server.listen(port, () => {
    console.log(`Server run at ${port}`);
});
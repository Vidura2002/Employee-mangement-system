import express from "express";
import cors from "cors";
import connectDatabase from "./database/db.js";

import authRouter from "./routes/authRouter.js";
import departmentRouter from "./routes/departmentRouter.js"
import employeeRouter from "./routes/employeeRouter.js"
import counterRouter from "./routes/counterRouter.js"

connectDatabase();

const app=express();
app.use(cors());
app.use(express.json());



app.use("/api/auth",authRouter)
app.use("/api/dashboard",counterRouter)
app.use("/api/department",departmentRouter)
app.use("/api/employee",employeeRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
});
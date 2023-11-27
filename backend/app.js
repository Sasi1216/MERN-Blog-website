import Express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import router from "./routes/user-router";
import blogRouter from "./routes/blogroute";
const app = Express();
app.use(cors())

app.use(Express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://s17435345:cFUPevRFGL3JHXR2@cluster0.cw56flb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("connected to database and listening to localhost 5000")
  )
  .catch((err) => console.log(err));

//cFUPevRFGL3JHXR2

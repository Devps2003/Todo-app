const express = require('express');
const cors = require('cors');
const app = express();
require("./conn/conn");
const path = require("path");
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');


app.use(cors());
app.use(express.json());

app.use("/api/v1",authRouter);
app.use("/api/v2",todoRouter);
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });


app.listen(3000,()=>{
    console.log("server runnnig")
});
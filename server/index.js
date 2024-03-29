const express = require('express');
const cors = require('cors')
const authRouter = require('./routes/auth');
const todoRouter = require('./routes/todo');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",authRouter);
app.use("/api/v2",todoRouter);

app.listen(3000,()=>{
    console.log("server runnnig")
});
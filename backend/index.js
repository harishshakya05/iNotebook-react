const express = require("express");
const cors = require("cors");
const app = new express();
const router = express.Router();
require("./db");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const authRoute = require('./routes/auth');
const notesRoute = require('./routes/notes');
app.use('/api/auth', authRoute);
app.use('/api/notes', notesRoute);


app.listen(PORT,()=>{
    console.log(`server is listing on port:${PORT}`);
})
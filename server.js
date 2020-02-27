const express = require('express');
const  app = express();
const db = require("./models");
const todosRoutes = require("./routes/todoRoutes");

const port = process.env.PORT || 3031;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/todos",todosRoutes);


app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
});
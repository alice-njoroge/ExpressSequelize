const express = require('express');
const app = express();
const db = require("./models");
const todosRoutes = require("./routes/todoRoutes");
const usersRoutes = require("./routes/userRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require('./swaggerOptions');
const port = process.env.PORT || 3031;
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
/* app.use(cors({
    origin: 'http://127.0.0.1:3000'
})); */
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));


app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));

app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);


const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve);
app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
const express = require("express");
const cors = require("cors");

const authRoutes =
require("./modules/auth/auth.routes");
const documentRoutes =
require(
    "./modules/document/document.routes"
);
const chatRoutes =
require("./modules/chat/chat.route");
const swaggerUI =
require("swagger-ui-express");
const swaggerSpec =
require("./config/swagger.config");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("Server Running");
});

app.use(
    "/api/auth",
    authRoutes
);
app.use(
    "/api/document",
    documentRoutes
);
app.use(
    "/api/chat",
    chatRoutes
);
app.use(

    "/api-docs",

    swaggerUI.serve,

    swaggerUI.setup(
        swaggerSpec
    )
);

module.exports = app;
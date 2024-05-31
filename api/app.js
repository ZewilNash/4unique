require("express-async-errors");
require("dotenv").config()
const {createServer} = require("http")
const authRouter = require("../routes/auth")


const { Server } = require('socket.io');

//security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require('express-rate-limit');



const express = require("express");
const app = express();

const server = createServer(app);

const io = new Server(server);
global.io = io;

const cors = require("cors");

const errorhandlerMiddleware = require("../middleware/errorHandler");

const bodyParser = require("body-parser")



const connectDB = require("../db/connection");



const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(bodyParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("trust proxy", 1);

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

// hemlet prevents the other urls to load in our page for security reasons

// we will modify hemlet to accept only https to load scripts in our page

// app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
            "script-src": ["'self'", "https: data:"],
            "default-src": ["'self'", "https: data:"],
            
        }
    })
)

app.use(xss());

app.use(cors());


// MAIN APP ROUTES

app.get("/" , (req,res) => {
    return res.render("pages/landing/index")
})

app.get("/home" , (req,res) => {
    return res.render("pages/home/index")
})

app.get("/products" , (req,res) => {
    return res.render("pages/products/index")
})

app.get("/register" , (req,res) => {
    return res.render("pages/register/index")
})

app.get("/login" , (req,res) => {
    return res.render("pages/login/index")
})

app.get("/forgotPass" , (req,res) => {
    return res.render("pages/forgotPass/index")
})

app.use("/api/v1/auth", authRouter);
app.use(errorhandlerMiddleware);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        })

    } catch (err) {
        console.log(err);
    }
}


start();


module.exports = app;
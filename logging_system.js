// Logging System
// Node.js + Express + Winston

const express = require("express");
const winston = require("winston");

const app = express();
const PORT = 3000;

app.use(express.json());

// Configure Winston logger
const logger = winston.createLogger({
    level: "info",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        }),

        new winston.transports.File({
            filename: "logs/combined.log"
        })
    ]
});

// Home route
app.get("/", (req, res) => {
    logger.info("Home route accessed");

    res.json({
        message: "Logging System API is running"
    });
});

// Success route
app.get("/success", (req, res) => {
    logger.info("Success endpoint accessed");

    res.json({
        status: "success",
        message: "Operation completed successfully"
    });
});

// Demo error route
app.get("/error", (req, res) => {
    const error = new Error("This is a demo error");

    logger.error(error.message);

    res.status(500).json({
        status: "error",
        message: "Something went wrong"
    });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});

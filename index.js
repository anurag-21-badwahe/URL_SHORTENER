const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./dbConfig");
const PORT = 8000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/url", urlRoute);

//Connection to mongodb
connectToMongoDB("mongodb://localhost:27017").then(
  console.log("MongoDB Connected")
);

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

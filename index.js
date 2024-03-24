const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const { connectToMongoDB } = require("./dbConfig");
const URL = require("./models/url");
const PORT = 8000;

const app = express();

connectToMongoDB("mongodb://localhost:27017").then(
  console.log("MongoDB Connected")
);
//Connecting to views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRoute);
app.use("/", staticRouter);

//Connection to mongodb

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId; 
    const longURL = await URL.findOneAndUpdate(
      { shortURLId: shortId }, 
      { $inc: { totalVisits: 1 } }
    );
    if (!longURL) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    // Redirect to the longURL's redirectURL
    res.redirect(longURL.redirectURL);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

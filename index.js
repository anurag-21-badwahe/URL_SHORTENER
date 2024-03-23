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
  const shortId = req.params.shortURLId;
  const longURL = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $inc: { totalVisits: 1 } }
  );
  if (!longURL) {
    // If no matching URL found, return a 404 Not Found response
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Redirect to the longURL's redirectURL
  res.redirect(longURL.redirectURL);
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});

const shortid = require('shortid');
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  // Generate a unique short ID
  const uniqueShortId = shortid.generate();

  try {
    // Create a new URL document
    const newURL = await URL.create({
      shortURLId: uniqueShortId,
      redirectURL: body.url,
      totalVisits: 0, 
    });

    // Return the unique short ID in the response
    return res.json({ id: uniqueShortId });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTotalClick = async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Short ID from request:", shortId);
  try {
    // Find the URL document based on the short URL ID
    const urlDocument = await URL.findOne({ shortURLId: shortId });
    if (!urlDocument) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Return the total number of clicks
    return res.json({ totalClicks: urlDocument.totalVisits });
  } catch (error) {
    console.error("Error retrieving total clicks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handleGenerateNewShortURL,
  getTotalClick
};

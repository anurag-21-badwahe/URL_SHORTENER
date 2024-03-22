const shortid = require('shortid');
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json("URL is reequired");
  const uniqueShortId = shortid()
  await URL.create({
    uniqueShortId: uniqueShortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  

  return res.json({id : uniqueShortId})
};

module.exports = {
    handleGenerateNewShortURL,
}

const express = require("express")
const {handleGenerateNewShortURL,getTotalClick}  = require("../controllers/url")

const router = express.Router();

router.post("/",handleGenerateNewShortURL)

router.get("/totalClicks/:shortId",getTotalClick)


module.exports = router;

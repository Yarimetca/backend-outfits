const express = require("express")
const router = express.Router()
const outfitController = require("../controllers/outfit.controller")

router.get("/recommend", outfitController.recommendOutfit)

module.exports = router

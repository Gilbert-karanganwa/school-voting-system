const express = require("express");
const router = express.Router();

// Import the winners controller object
const winnersController = require("../controllers/winnerscandidateController");

// Define all REST API routes for winners
router.post("/winners", winnersController.addWinner);
router.get("/winners", winnersController.getWinners);
router.get("/winners/:winner_id", winnersController.getWinnerById);
router.put("/winners/:winner_id", winnersController.updateWinner);
router.delete("/winners/:winner_id", winnersController.deleteWinner);

module.exports = router;

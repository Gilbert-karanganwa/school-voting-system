const express = require("express");
const router = express.Router();

const{election}= require("../controllers/electionControllers");

router.post("/election",election);
module.exports=router
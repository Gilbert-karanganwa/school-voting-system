const express = require("express");
const router = express.Router();

// Import the entire controller object
const candidateController = require('../controllers/candidateController');

// Use candidateController to access all your functions
router.post('/candidates', candidateController.candidate);
router.get('/candidates', candidateController.getcandidates);
router.get('/candidates/:candidate_id', candidateController.getcandidateById);
router.put('/candidates/:candidate_id', candidateController.updatecandidate);
router.delete('/candidates/:candidate_id', candidateController.deletecandidate);

module.exports = router;

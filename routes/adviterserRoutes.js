const router = require('express').Router();
const advertiserController = require('../controllers/adviterserController');

router.post('/advertise', advertiserController.advertise);
router.get('/advertise', advertiserController.getAdvertised); // Added this link line

module.exports = router;

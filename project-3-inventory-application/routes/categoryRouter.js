const express = require('express');
const router = express.Router();

const baseController = require('../controllers/baseController');

router.get("/:cat", baseController.getPorductsInCategory);

module.exports = router;
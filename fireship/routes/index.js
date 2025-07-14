const express = require('express');
const router = express.Router();

// GET home page
router.get('/', (req, res) => {
    res.json({ message: 'Docker is easy 🐳' });
});

module.exports = router;

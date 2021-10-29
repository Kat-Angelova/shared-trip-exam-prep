const express = require('express');

const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const tripsController = require('./controllers/tripsController.js');

const router = express.Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/trips', tripsController);

router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;
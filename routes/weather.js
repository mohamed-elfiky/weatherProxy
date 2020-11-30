var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weatherController')

router.post('/weather/:latlon', weatherController.save_data);
router.get('/error', (req, res) => {
    res.render('error');
});
router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;

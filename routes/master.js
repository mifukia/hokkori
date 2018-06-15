var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('master', {
        user: "名無し",
        mail: null
    });
});

router.post('/', function(req, res, next) {
    router.userName = req.body['username'];
    router.email = req.body['email'];
    res.render('master', {
        user: router.userName,
        mail: router.email
    });
});

module.exports = router;

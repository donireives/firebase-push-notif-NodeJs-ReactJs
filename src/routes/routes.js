const router = require('express').Router();
const SendPushNotif = require('../handler/SendPushNotif');

router.get('/', (req, res) => {
    return res.send({'version': '1.0.0'});
});

router.post('/otodis/push-notif', SendPushNotif.post);

module.exports = router;

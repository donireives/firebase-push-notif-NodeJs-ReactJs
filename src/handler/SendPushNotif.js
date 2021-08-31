require('dotenv').config();
const admin = require("firebase-admin");
const googleApplicationCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount = require(googleApplicationCredentials);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const messaging = admin.messaging();

exports.post = async function (req, res) {
    let pushResponse;
    const dataBody = req.body;
    const tokens = ['CLIENT_TOKEN'];
    const data = {
        title: dataBody.title,
        body: dataBody.body,
    };

    await admin.messaging()
        .sendMulticast({tokens, data})
        .then(response => {
            const successes = response.responses.filter(r => r.success === true).length;
            const failures = response.responses.filter(r => r.success === false).length;
            pushResponse = `Notifications sent: ${successes} successful, ${failures} failed`;
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });

    // IF USING sendToDevice
    /*const payload = {
        notification: {
            title: 'Payment completed!',
            body: `Thank you, we received your payment.`
        }
    };

    await admin.messaging()
        .sendToDevice(tokens, payload)
        .then(response => {
            // const successes = response.responses.filter(r => r.success === true).length;
            // const failures = response.responses.filter(r => r.success === false).length;
            // pushResponse = `Notifications sent: ${successes} successful, ${failures} failed`;
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });*/

    res.status(200).send({
        data: pushResponse,
        meta: null
    });
}

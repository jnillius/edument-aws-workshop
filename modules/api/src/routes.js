
const express = require('express');
const axios = require('axios').default;
const env = require('./env');
// ...

const routes = express.Router();

// ...
// TMS API.

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const client = new SNSClient({ region: "eu-north-1" });

routes.post('/content', async (_req, res) => {

    const response = await axios.post('http://content/resources', {})

    const out = await client.send(new PublishCommand({
        Message: response.data.id,
        TopicArn: env.requestsTopic,
    }));

    res.send(response.data);
});

routes.post('/injectfault', async (_, res) => {
    const response = await axios({
        method: 'POST',
        url: 'http://content/503'
    });

    res.send(response.data);
});

// ...


module.exports = routes;
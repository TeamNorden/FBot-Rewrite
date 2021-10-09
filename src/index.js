const FBotClient = require('./Structures/FBotClient');
const config = require('../config.json');

const client = new FBotClient(config);
client.start();

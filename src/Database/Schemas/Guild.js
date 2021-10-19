const { Schema, model } = require('mongoose')
const { Snowflake } = require("discord.js");

const GuildSchema = new Schema({
    _id: Snowflake,
    config: {
        countingChannel: Snowflake
    }
})

module.exports = model('guild-settings', GuildSchema)
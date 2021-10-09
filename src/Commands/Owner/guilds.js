const { MessageEmbed, version: djsversion, Guild } = require('discord.js');
const { version } = require('../../../package.json');
const Command = require('../../Structures/Command');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Gives info about all guilds the bot is in.',
			category: 'Owner',
			ownerOnly: true
		});
	}

	run(message) {
		const Guilds = this.client.guilds.cache.map(guild => `${guild.name} | (${guild.owner} | \`${guild.id}\` | ${guild.memberCount}`);
    	message.channel.send({ content: Guilds.join('\n') });
	}

};
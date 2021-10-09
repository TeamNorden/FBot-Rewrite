const { Message } = require('discord.js');
const Command = require('../../Structures/Command');
const figlet = require('util').promisify(require('figlet'));

module.exports = class extends Command {
    
    constructor(...args) {
		super(...args, {
			description: 'Generates a text block with a shiny text format',
			category: 'Fun',
			usage: '<text>'
		});
	}

	async run(msg, ...banner) {
        if(!banner) {
            msg.reply("Maybe actually provide some text???")
        } else {
            return msg.channel.send(await figlet(banner), { code: true });
        }
	}

};
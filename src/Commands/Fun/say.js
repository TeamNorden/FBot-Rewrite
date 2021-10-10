const Command = require('../../Structures/Command');


module.exports = class extends Command {
    constructor(...args) {
		super(...args, {
			aliases: ['talk']
		});
	}
	
	async run(message, args) {
        

        message.channel.send(args.join(" "))
        message.delete()
	}

};
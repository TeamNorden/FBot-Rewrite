const Event = require('../../Structures/Event');

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		if (!message.member) message.member = await message.guild.members.fetch(message.author.id)

		if (message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
		
		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

		if (command) {
			if (command.category.toLowerCase() === 'owner' && !command.ownerOnly) command.ownerOnly = true

			if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
				return message.reply('Shoo now you non-developer, this command can only be used by bot developers.');
			}

			if (command.guildOnly && !message.guild) {
				return message.reply('Yikes, this command can only be used in a Discord server.');
			}

			if (command.nsfw && !message.channel.nsfw) {
				return message.reply('You naughty naughty, this command can only be used in a NSFW marked channel.');
			}

			if (command.args && !args.length) {
				return message.reply(`DUDE, this command requires arguments to function. Usage: ${command.usage ?
					`${this.client.prefix + command.name} ${command.usage}` : 'This command doesn\'t have a usage format'}`);
			}
			
			if (message.guild) {
				const permissions = command.permissions ? this.client.defaultPerms.concat(command.permissions) : this.client.defaultPerms

				if (permissions) {
						const missing = permissions.filter(p => !message.channel.permissionsFor(message.member).toArray().includes(p))
						const botMissing = permissions.filter(p => !message.channel.permissionsFor(message.guild.me).toArray().includes(p))

						if (missing.length || botMissing.length) return message.reply(`${missing.length ? 'You are' : 'I am'} missing \`${this.client.utils.formatArray(missing.length ? missing.map(this.client.utils.formatPerms) : botMissing.map(this.client.utils.formatPerms))}\` permissions, ${missing.length ? 'You' : 'I'} need them to ${missing.length ? 'use' : 'run'} this command!`);
					}
				}
			}
			
		try {
			command.run(message, args);
		} catch (e) {
			console.log(e)
		} // if theres an err, we dont want our bot to crash
	}
};
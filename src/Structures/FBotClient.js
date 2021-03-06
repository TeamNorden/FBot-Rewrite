const { Client, Collection, Permissions, Intents } = require('discord.js');
const Util = require('./Util.js');
const { mongoURI } = require('../../config.json')

module.exports = class FBotClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone',
			intents: [
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_PRESENCES
			],
			partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],
			presence: {
				activities: [{
					name: 'Being Developed | >help For Help',
					type: 'PLAYING'
				}]
			}
		});
		this.validate(options);

		this.commands = new Collection();

		this.aliases = new Collection();

		this.events = new Collection();

		this.utils = new Util(this);

		this.owners = options.owners;
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
		
		if (!options.defaultPerms) throw new Error('You must pass default perm(s) for the Client.');
		this.defaultPerms = options.defaultPerms
	}

	async start(token = this.token) {
		if (!mongoURI) throw new Error('Please provide a mongo connection string in the config.json file')

		await this.utils.loadCommands();
		await this.utils.loadEvents(mongoURI);
		await this.utils.connectToDB()
		
		await super.login(token);
	}

};
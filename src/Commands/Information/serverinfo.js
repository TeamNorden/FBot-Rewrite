const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['serverinfo', 'si', 'guildinfo', 'gi'],
			description: 'Displays information about the server that said message was run in.',
			category: 'Information'
		});
	}

	async run(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = await message.guild.members.fetch();
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		console.log(channels)

		const embed = new MessageEmbed()
			.setDescription(`**Guild information for *${message.guild.name}***`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**❯ Name:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Owner:** ${await message.guild.fetchOwner()} (${message.guild.ownerId})`,
				`**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} - ${moment(message.guild.createdTimestamp).format('LL')} - ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			].join('\n'))
			.addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size}`,
				`**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Member Count:** ${message.guild.memberCount}`,
				`**❯ Regular Users:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Text Channels:** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}`,
				`**❯ Voice Channels:** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`,
				`**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			].join('\n'))
			.addField('Presence', [
				`**❯ Online:** ${members.filter(member => member.presence?.status === 'online').size}`,
				`**❯ Idle:** ${members.filter(member => member.presence?.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${members.filter(member => member.presence?.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence?.status === 'offline' || member.presence?.status).size}`,
				'\u200b'
			].join('\n'))
			.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles).join(', ') : 'None')
			.setTimestamp();
		
		message.channel.send({ embeds: [embed] });
	}
};
const { MessageEmbed } = require('discord.js');

const ZWS = '\u200B';

module.exports = class FBotEmbed extends MessageEmbed {

	splitFields(contentOrTitle, rawContent) {
		if (typeof contentOrTitle === 'undefined') return this;

		let title;
		let content;
		if (typeof rawContent === 'undefined') {
			title = ZWS;
			content = contentOrTitle;
		} else {
			title = contentOrTitle;
			content = rawContent;
		}

		if (Array.isArray(content)) content = content.join('\n');
		if (title === ZWS && !this.description && content.length < 2048) {
			this.description = content;
			return this;
		}

		// eslint-disable-next-line id-length
		let x;
		let slice;
		while (content.length) {
			if (content.length < 1024) {
				this.fields.push({ name: title, value: content, inline: false });
				return this;
			}

			slice = content.slice(0, 1024);
			x = slice.lastIndexOf('\n');
			if (x === -1) x = slice.lastIndexOf('');
			if (x === -1) x = 1024;

			this.fields.push({ name: title, value: content.trim().slice(0, x), inline: false });
			content = content.slice(x + 1);
			title = ZWS;
		}
		return this;
	}

	// right now this seems useless but i will add more stuff

	/**
	 * @description - Custom Types For The Embed
	 * @param [type] - The type of the embed (default: 'main')
	 * @returns {MessageEmbed}
	 */
	setType(type) {
		if (!type) type = 'main'

		this.color = type.toLowerCase() === 'main' ? 0x3498db : 0xFFFFFF

		return this
	}
};
const Command = require("../../Structures/Command");
const FBotEmbed = require("../../Structures/FBotEmbed");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['serv'],
            description: 'Sends FBot\'s Support Server!',
            category: 'Information'
        })
    }

    async run(message, args) {
        const embed = new FBotEmbed()
            .setTitle('Join our server, it\'s for support and fun!')
            .setURL('https://fbot.breadhub.uk/server')
            .setType()

        return message.channel.send({ embeds: [embed] })
    }
}
const Command = require("../../Structures/Command")
const Util = require("../../Structures/Util");
const FBotEmbed = require('../../Structures/FBotEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['avt'],
            description: 'Sends the avatar of the user (author if not specified)',
            category: 'Information'
        })
    }

    async run(message, args) {
        let member = await this.client.utils.getMember(message, args[0] || message.author.id)

        if (!member) member = await this.client.utils.getMember(message, message.author.id)

        const embed = new FBotEmbed()
            .setTitle('Avatar')
            .setDescription(`Avatar of ${member.toString()}`)
            .setImage(member.displayAvatarURL({
                dynamic: true
            }))
            .setType()

        message.channel.send({ embeds: [embed] })
    }
}
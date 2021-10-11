const Command = require("../../Structures/Command")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Makes fbot approve!',
            category: 'Fun',
            usage: '[message}'
        })
    }

    async run(message, args) {
        const approvedMessage = args.join(' ')
        const iApproveMessage = 'Hello, I\'m FBot, and I approve this message.'

        // if theres a specified text at the right of the command, we wanna reply to that that fbot approves
        // ELSE if there isnt any specified, instead of replying to the message we gotta delete that bish and message.channel.send the msg
        if (approvedMessage) {
            message.reply(iApproveMessage)
        } else {
            await message.delete().catch(() => { }) // just in case

            message.channel.send(iApproveMessage)
        }
    }
}
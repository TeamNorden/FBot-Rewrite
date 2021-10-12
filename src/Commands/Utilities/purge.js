const Command = require('../../Structures/Command')
const FBotEmbed = require('../../Structures/FBotEmbed')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['thanos'],
            description: 'Purges the specified amount of messages',
            category: 'Utilities',
            usage: '<amount>',
            permissions: 'MANAGE_MESSAGES'
        });
    }

    async run(message, args) {
        const amount = parseInt(args[0])

        if (isNaN(amount) || !amount) {
            const errEmbed = new FBotEmbed()
                .setTitle('Invalid Amount!')
                .setDescription('Enter a valid number you stinky')
                .setType()

            return message.channel.send({ embeds: [errEmbed] })
        }

        if (amount > 1000 || amount < 1) {
            const errEmbed = new FBotEmbed()
                .setTitle('Out Of Limits!')
                .setDescription(`Yoo that number is like, ${amount > 1000 ? 'higher than 1000' : 'lower than 1'} bro.`)
                .setType()

            return message.channel.send({ embeds: [errEmbed] })
        }

        let easterEgg = ''

        if (amount === 69) easterEgg = ' (nice) '

        const delEmbed = new FBotEmbed()
            .setTitle('Purged!')
            .setDescription(`I have successfully thanos'ed ${amount + easterEgg} messages!`)
            .setType()

        await message.channel.bulkDelete(amount + 1) // +1 so that it counts the message used to run the purge command
            .then(async () => {
                const delMsg = await message.channel.send({ embeds: [delEmbed] })

                setTimeout(() => {
                    delMsg.delete().catch(() => { })
                }, 2000)
            })
            .catch(e => message.channel.send('cannot delete aaaaa')) // .catch() just in case
    }
}
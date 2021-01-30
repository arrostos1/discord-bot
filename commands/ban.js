const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    /**
     * 
     * @param {Discord.Message} message 
     */
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`${message.author.username}, tu n'est pas autorisé à bannir quelqu'un.`)
        }

        const guild = message.guild;
        const user = message.mentions.users.first();
        
        if (!user) {
            return message.channel.send(`${message.author.username}, l'utilisateur que tu souhaite bannir n'existe pas.`)
        }

        let [, days, reason] = args;

        guild.members.ban(user, {days, reason})
        .then(user => message.channel.send(`L'utilisateur * ${user.username} * a été banni du serveur pour une durée de ${days} jour(s) pour la raison suivante ${reason}`))
        .catch(console.error);
    
    },
  };
  
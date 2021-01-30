const Discord = require('discord.js');

module.exports = {
    name: "unban",
    /**
     * @param {Discord.Message} message
     */
    execute(message, args) {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(`${message.author.username}, tu n'est pas autorisé à débannir quelqu'un.`)
        }

        const [username] = args;
        const guild = message.guild;

        guild.fetchBans().then((bans) => {
            let bannedUser = bans.find((b) => b.user.username == username);
            if (!bannedUser) return message.channel.send(`${message.author.username},l'utilisateur que tu souhaites débannir n'existe pas.`);
            guild.members.unban(bannedUser.user);
            return message.channel.send(`${message.author.username}, l'utilisateur a été débanni.`);
        });
    },
  };

const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");

  if (!args[0]) return message.channel.send("no");

  messagecount = parseInt(args[0]);

  message.channel.fetchMessages({ limit: messagecount })
  .then(messages => message.channel.bulkDelete(messages))
  .then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
  });

  // message.channel.bulkDelete(args[0]).then(() => {
  //   message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(2000));
  // });

}

module.exports.help = {
  name: "purge"
}

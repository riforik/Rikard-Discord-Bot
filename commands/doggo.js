const Discord = require("discord.js");
const superagent = require('superagent');
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  //!report @ned this is the reason
  let {
    body
  } = await superagent
    .get(`https://random.dog/woof.json`);
  let dogembed = new Discord.RichEmbed()
    .setColor(config.blue)
    .setTitle("Doggo :dog:")
    .setImage(body.url);

  message.channel.send(dogembed);
}
module.exports.help = {
  name: 'doggo'
}

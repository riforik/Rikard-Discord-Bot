const Discord = require("discord.js");
const superagent = require('superagent');
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let {
        body
    } = await superagent
        .get(`http://aws.random.cat/meow`);
    let dogembed = new Discord.RichEmbed()
        .setColor(config.blue)
        .setTitle("Cat :cat:")
        .setImage(body.file);

    message.channel.send(dogembed);
}
module.exports.help = {
    name: 'cat'
}

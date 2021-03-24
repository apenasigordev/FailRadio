const Discord = require('discord.js');
//const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
module.exports = {
  name: "supportsend",
  aliases: ["sus"],
  execute(client,message,args) {
    if(msg.author.id === "407859300527243275") {
    const embed = new Discord.MessageEmbed()
    .setTitle("🤷‍♂️ • Resposta")
    .setDescription(args.slice(2).join(' '))
    .setFooter(`Enviado por ${message.author.tag} (${message.author.id})`)
    .setColor("RED");
    client.channels.cache.get(args[0]).send(`<@${args[1]}>`, embed);
    }
  }
};
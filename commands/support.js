const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
module.exports = {
  name: "support",
  aliases: ["suporte"],
  execute(client,msg, args) {
    if(args.slice(0)) {
    let channel = msg.channel,
    guild = msg.guild,
    user = msg.author;
    client.channels.cache.get("804707015426441226").send("Pergunta nova\n" + args.slice(0).join(' ')+ `\nUsuário ${user.tag} (${user.id})\nCanal #${channel.name} (${channel.id})\nGuild ::${guild.name} (${guild.id})`);
    msg.quote("Enviado para suporte!");
  } else return message.quote("Você não colocou sua pergunta");

  }
};
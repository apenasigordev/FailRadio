const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
const express = require('express'),
app = express();
const Topgg = require("@top-gg/sdk");
const meet = require("nicemeet.js")
const webhook = new Topgg.Webhook(process.env.webhook);
const moment = require('moment-timezone');
//var ytpl = require('ytpl');
let prefix = "f!";
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = db;
app.get("/", (req,res) => {
  res.send(200);
});
app.post("/dblwebhook", webhook.middleware(), (req, res) => {
  let votembed = new Discord.MessageEmbed()
  .addFields([{
    name: "🇧🇷 | Obrigado",
    value: `Obrigado por votar no FailRadio!`
  },
  {
    name: "🇺🇲 | Thank you!",
    value: `Thank you for voting for FailRadio!`
  }])
  .setColor("PURPLE");
  client.users.cache.get(req.vote.user).send(votembed);
});
app.listen(process.env.PORT)
fs.readdir(`./commands/`, (error, files) => {
    if (error)return console.log("Error while trying to get the commmands.");
     
    files.forEach(file => {
        const command = require(`./commands/${file}`);
        const commandName = file.split(".")[0];

        client.commands.set(commandName, command);

        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command);
            });
        };
    });
});
client.on("ready", () => {
  let activity = ""
let h = moment(Date.now()).tz("America/Sao_Paulo").format("hh");
if(h >05) return client.user.setAvatar("./dayavatar.png");
  if(h > 06) {
  activity = [
    {name: "Escute qualquer estação em seu servidor!", type: 0},
    {name: "Use f!help para ver meus comandos.", type: 3},
    {name: `${client.guilds.cache.size} Servidores`, type: 5}
    ];
  } else if(h>11) {
    activity = "Estou almoçando, jájá eu volto.";
  } else if(h>13) {
    activity = [
      {name: "Use f!help para ver comandos.", type: 0},
      {name: "Nada mais, que um cafezinho da tarde.", type: 2},
      {name: "Teen Titans Go!", type: "WATCHING"}
      ];
  } else if(h>15) {
    activity=[{
      name: "Otima tarde!",
      type: 1,
      url: "https://twitch.tv/iguhr"
    },
    {name: "Use f!help e saiba todos meus comandos"},
    {name: "Parece que NINGUÉM nunca desvendou esse easteregg", type: 5}];
  } else if(h>18) {
    activity="Estou jantando, jájá volto para conversar.";
  } else {
    activity="A mimir 💤";
    client.user.setAvatar("./night_avatar.png");
  }
    setInterval(() => {
    let activitie = activity[Math.floor(Math.random() * activity.length)];
  client.user.setActivity(activitie);
    }, 16000);
    client.user.setStatus('ONLINE');
    console.log("Ativo.");
    // Slash Commands
let slash = require('./modules/slash.js')
slash(client);
    
});
client.on("guildCreate", (guild) => {
  console.log(guild);
});
client.on("reconnecting", () => {
  client.user.setStatus("IDLE");
  console.log("Reconectando...");
})
client.on("error", (err) => {
client.user.setActivity("Erro encontrado, por favor, aguarde o bot reconectar...");
client.user.setStatus("DND");
console.log(err);
});
client.on("message", msg => {

    if (msg.content.startsWith(prefix) && !msg.author.bot && msg.guild) {
        const args = msg.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase();
        
        if (client.commands.find(f => f.name === command)) {
            client.commands.get(command).execute(client, msg, args)
        }
       /* if(client.commands.get(command)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) {
	  client.aliases.get(command).execute(client,msg,args);
	}*/
    }
});
client.login(process.env.token);
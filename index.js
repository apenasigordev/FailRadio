const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const db = require('quick.db');
const express = require('express'),
app = express();
const disbut = require('discord-buttons')(client);
const Topgg = require("@top-gg/sdk");
let meet = require("nicemeet.js");
const webhook = new Topgg.Webhook(process.env.webhook);
const DisTube = require("distube")
//const SpotifyPlugin = require("@distube/spotify")

const {MessageEmbed} = require('discord.js');
const moment = require('moment-timezone');
let prefix = "f!";
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true, leaveOnFinish: true,

});
client.db = db;

const { APIMessage, Message } = require('discord.js');

/**
* @param {StringResolvable|APIMessage} [content='']
* @param {MessageOptions|MessageAdditions} [options={}]
* @param {string} [options?.messageID] - o ID da mensagem que será citada
* @param {boolean} [options?.mention] - caso deva mencionar o autor da mensagem
*/

Message.prototype.quote = async function (content, options) {
  const message_reference = {
    message_id: (
      !!content && !options
        ? typeof content === 'object' && content.messageID
        : options && options.messageID
    ) || this.id,
    message_channel: this.channel.id
  }

  const allowed_mentions = {
    parse: ['users', 'roles', 'everyone'],
    replied_user: typeof content === 'object' ? content && +content.mention : options && +options.mention
  }

  const { data: parsed, files } = await APIMessage
    .create(this, content, options)
    .resolveData()
    .resolveFiles()

  this.client.api.channels[this.channel.id].messages.post({
    data: { ...parsed, message_reference, allowed_mentions },
    files
  })
}

app.get("/", (req,res) => {
  res.sendStatus(200);
});
client.on('clickButton', async (button) => {
  await button.defer();
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
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})


client.on("ready", async() => {
    
    
  let activity = ""
/*  let h = moment().tz("america/sao_paulo").format("h");
  if(h >= 06) {*/
 activity = [
    {name: "Escute qualquer estação em seu servidor!", type: 0},
    {name: "Use f!ajuda para ver meus comandos.", type: 3},
    {name: `${client.guilds.cache.size} Servidores`, type: 5}
    ];

  setInterval(() => {
    let activitie = activity[Math.floor(Math.random() * activity.length)];
  client.user.setActivity(activitie);
    }, 16000);
    client.user.setStatus('online');
    console.log("Ativo.");
    // Slash Commands
    
});
client.on("guildCreate", (guild) => {
  console.log(guild);
});
client.on("reconnecting", () => {
  client.user.setStatus("idle");
  console.log("Reconectando...");
})
client.on("error", (err) => {
client.user.setActivity("Erro encontrado, por favor, aguarde o bot reconectar...");
client.user.setStatus("dnd");
console.log(err);
});
client.on("message", msg => {
  let message = msg;
if(msg.author.bot && !msg.guild) return;
if(msg.content === "<@"+client.user.id+">") {
  msg.reply("Olá, meu prefixo é f!")
}

    if (msg.content.startsWith(prefix)) {
        const args = msg.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    try {
        cmd.execute(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
    }
});
client.login(process.env.token);

client.distube
    .on("playSong", (message, queue, song) => {
      var playSong = new MessageEmbed()
      .setTitle("🎧 • Tocando")
      .addField("🎵 • Música", `**${song.name}** - \`${song.formattedDuration}\``)
      .addField("Pedido por", `${song.user}`)
      .setThumbnail(song.thumbnail)
      .setColor("GREEN");
      message.quote(playSong)
    })
    .on("addSong", (message, queue, song) => {
      var addSong = new MessageEmbed()
      .setTitle("🎵 • Adicionado na fila")
      .addField("🎧 • Música", `**${song.name}** - \`${song.formattedDuration}\``)
      .addField("Pedido por", `${song.user}`)
      .setThumbnail(song.thumbnail)
      .setColor("RED");
      message.quote(addSong);
    })
   /* .on("error", (message,err) => {
      message.quote(`Ocorreu algum erro: \`\`\`${err.stack}\`\`\``)
    });*/
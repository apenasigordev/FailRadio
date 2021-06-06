var {MessageEmbed} = require('discord.js');
module.exports = {
  name: "queue",
  aliases: ["q"],
  execute(client,message,args) {
    const queue = client.distube.getQueue(message)
    this.queuesong=""
    if(!queue) return message.quote("Não tem nada na fila.");
    var embed = new MessageEmbed()
    .setTitle("🎵 • Fila");
    const q = queue.songs.map((song, i) => {
      this.queuesong += `${song.name} - \`${song.formattedDuration}\`\n`;
    });
    embed.addField("📻 • Na Fila", this.queuesong);
    message.quote(embed);
  }
};
module.exports = {
  name: "skip",
  aliases: ["s"],
  execute(client, message,args) {
    client.distube.skip(message);
  }
};
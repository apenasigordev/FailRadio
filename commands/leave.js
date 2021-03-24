module.exports = {
  name: "leave",
  aliases: ["l"],
  execute(client,msg,args) {
    let voice = msg.member.voice.channel;
    if(voice) return voice.leave();
  }
};
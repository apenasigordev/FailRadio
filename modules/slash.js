module.exports = (client) => {
  client.api.applications(client.user.id).commands.post({data: {
    name: 'ping',
    description: 'ping pong!'
}});
client.ws.on('INTERACTION_CREATE', async interaction => {
    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
  type: 4,
  data: {
    content: client.ws.ping + "MS"
  }
}
    });
    console.log(interaction);
})
};
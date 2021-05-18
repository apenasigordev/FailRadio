const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto',
    token:process.env.token
});

manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
manager.spawn();
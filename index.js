// https://github.com/gamedig/node-gamedig

const { Client, Intents } = require('discord.js');
const Gamedig = require('gamedig');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function getStatus() {
    Gamedig.query({
        type: process.env.game,
        host: process.env.ip,
        port: process.env.port
    }).then((state) => {
        client.user.setPresence({ activities: [{ name: `${state.players.length}/${state.maxplayers} players` }] });
    }).catch((error) => {
        client.user.setPresence({ activities: [{ name: 'server offline' }] });
    });
}

client.once('ready', () => {
    console.log('Ready!');
    // run once
    getStatus()
    // schedule all next runs
    setInterval(getStatus, 120000);
});

client.login(process.env.token);

const fs = require('fs');
const log = require('./logger');

module.exports = async function handleEvents(client) {
    const eventsfolders = fs.readdirSync(`./src/events`);

    for (const folder of eventsfolders) {
        const files = fs.readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);

            if(event.rest) {
                if(event.once) client.rest.once(event.name, (...args) => event.execute(...args, client));
                else client.rest.on(event.name, (...args) => event.execute(...args, client));
            } else {
                if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
        }

        continue;
    }

    return log(`Events Loaded.`);
}
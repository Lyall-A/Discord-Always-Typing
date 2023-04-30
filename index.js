const config = require(`${__dirname}/config.json`);
const https = require("https");
if (!config.token) return console.log("No token provided, please get your Discord token and add it to the config.json file next to \"token\"!");
if (!config.channel) return console.log("No channel ID provided, please get a channel ID and add it to the config.json file next to \"channel\"!");
const isArray = typeof config.channel === "object" ? true : false;
if (isArray && !config.channel[0]) return console.log("No channel ID provided, please get a channel ID and add it to the config.json file next to \"channel\"!");

console.log(`Started! Channel ID: ${isArray ? config.channel.join(", ") : config.channel}`);

(function type(id = isArray ? 0 : null) {
    const typing = https.request({
        hostname: "discord.com",
        path: `/api/v10/channels/${isArray ? config.channel[id] : config.channel}/typing`,
        method: "POST",
        headers: {
            Authorization: config.token
        }
    }, res => {
        res.setEncoding("utf-8");
        if (res.statusCode !== 204) return console.log(`Error sending request! Please verify that the token and channel ID ${isArray ? config.channel[id] : config.channel} is valid! Status: ${res.statusCode} (${res.statusMessage})`);
        if (config.log) console.log(`Sent typing request to channel ${isArray ? config.channel[id] : config.channel}!`);
    });
    typing.on("error", err => {
        console.log("HTTPS error while sending request!");
        console.log(err);
    });
    typing.on("close", () => isArray ? config.channel[id + 1] ? type(id + 1) : setTimeout(() => type(), config.timeout || 9000) : setTimeout(() => type(), config.timeout || 9000));
    typing.end();
})();
const config = require(`${__dirname}/config.json`); // Config
const https = require("https"); // HTTPS module
if (!config.token) return console.log("No token provided, please get your Discord token and add it to the config.json file next to \"token\"!"); // If token not provided
if (!config.channel?.[0]) return console.log("No channel ID(s) provided, please get 1 or more channel ID(s) and add it to the config.json file next to \"channel\" as an array or string!\x1b[0m"); // If channel ID(s) not provided
if (typeof config.channel === "string") config.channel = [config.channel]; // Converts single channel ID string to array

console.log(`Started! Channel ID(s): ${config.channel.join(", ")}`); // Log channel ID(s)

process.on("exit", code => {
    // On exit
    console.log(`Exited with code ${code}, up for ${Math.floor(performance.now() / 60000)} minutes`);
});

(function type(id = 0) { // Function to send typing request to channel
    const channelID = config.channel[id];

    const typing = https.request({ // Send HTTPS request
        host: "discord.com",
        path: `/api/v10/channels/${channelID}/typing`,
        method: "POST",
        headers: {
            Authorization: config.token
        }
    }, res => {
        if (res.statusCode !== 204) return console.error(`Error sending request! Please verify that the token and channel ID ${channelID} is valid! Status: ${res.statusCode} (${res.statusMessage})`); // If request is not successful
        if (config.log) console.log(`Sent typing request to channel ${channelID}!`); // Log if request is successful and logging enabled in config
    });

    typing.on("error", err => {
        // Log if HTTPS error sending typing request
        console.error("HTTPS error while sending request!");
        console.error(err);
    });

    // When the typing request is sent Discord will show user/bot typing for 10 seconds, after that the request will have to be sent again to continue
    typing.on("close", () => config.channel[id + 1] ? type(id + 1) : setTimeout(() => type(), config.timeout || 9000)); // On close, run type function again for any more channels or wait x to repeat
    typing.end(); // End request
})();

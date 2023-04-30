const config = require(`${__dirname}/config.json`); // Config
const https = require("https"); // HTTPS module to send typing requests
if (!config.token) return console.log("No token provided, please get your Discord token and add it to the config.json file next to \"token\"!"); // If token not provided
if (!config.channel) return console.log("No channel ID(s) provided, please get 1 or more channel ID(s) and add it to the config.json file next to \"channel\"! Example: \x1b[100m\"channel\": [\"1234567890123456789\", \"9876543210987654321\"]\x1b[0m"); // If channel ID(s) not provided
const isArray = typeof config.channel === "object" ? true : false; // Checks if provided channel ID(s) is an array or a string
if (isArray && !config.channel[0]) return console.log("No channel ID(s) provided, please get 1 or more channel ID(s) and add it to the config.json file next to \"channel\"! Example: \x1b[100m\"channel\": [\"1234567890123456789\", \"9876543210987654321\"]\x1b[0m"); // If channel is array but no channel ID's inside

console.log(`Started! Channel ID: ${isArray ? config.channel.join(", ") : config.channel}`); // Log channel ID(s)

(function type(id = isArray ? 0 : null) { // Function to send typing request to channel
    const typing = https.request({ // Send HTTPS request
        hostname: "discord.com",
        path: `/api/v10/channels/${isArray ? config.channel[id] : config.channel}/typing`,
        method: "POST",
        headers: {
            Authorization: config.token
        }
    }, res => {
        res.setEncoding("utf-8");
        // If status code is NOT 204, an error occurred, this will not close the script
        if (res.statusCode !== 204) return console.log(`Error sending request! Please verify that the token and channel ID ${isArray ? config.channel[id] : config.channel} is valid! Status: ${res.statusCode} (${res.statusMessage})`);
        if (config.log) console.log(`Sent typing request to channel ${isArray ? config.channel[id] : config.channel}!`); // If status code is 204, it succeeded, log if true in config
    });
    typing.on("error", err => {
        // Log if their is an error sending typing request
        console.log("HTTPS error while sending request!");
        console.log(err);
    });
    // On close, if there is another channel then send function again, else timeout for specified amount (9 seconds if null)
    // When the typing request is sent, user/bot will show as typing for 10 seconds, after that you will have to send request again to continue
    typing.on("close", () => isArray ? config.channel[id + 1] ? type(id + 1) : setTimeout(() => type(), config.timeout || 9000) : setTimeout(() => type(), config.timeout || 9000));
    typing.end(); // End request
})();

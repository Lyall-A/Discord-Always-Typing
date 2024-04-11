# Discord Always Typing

A node.js app to make it look like you are typing forever!

## Usage

[Download as ZIP](https://github.com/Lyall-A/Discord-Always-Typing/archive/refs/heads/main.zip)

![Download as ZIP example](https://github.com/Lyall-A/Discord-Always-Typing/blob/main/zip.png?raw=true)

Open `config.json` file in a text editor or IDE

Replace `YOUR TOKEN HERE` with your bot or user token

Replace `CHANNEL ID x` with your channel ID(s)

Save then run the `start.bat` file or `node .` in terminal

## Config options

`token` `[String]`: User or bot token

`channel` `[String/Array]`: String or array of channel ID(s)

`timeout` `[Number]`: Delay between sending typing requests in milliseconds, default: `9000`. Discord assumes you are no longer typing after 10 seconds

`log` `[Boolean]`: Enable logging, default: `false`
# Discord Always Typing

A node.js app to make it look like you are typing forever!

## Usage

Download as ZIP:

![Download as ZIP example](https://github.com/Lyall-A/Discord-Always-Typing/blob/main/zip.png?raw=true)

Open `config.json` file

Replace `YOUR TOKEN HERE` with your bot or user token

Replace `CHANNEL ID` with your channel ID (You can have multiple)

Save and run the `start.bat` file

## Config options

`token`: User or bot token

`channel`: String or array of channel ID(s)

`timeout`: Delay between sending typing requests in milliseconds, default: `9000`. Discord assumes you are no longer typing after 10 seconds

`log`: Enable logging, default: `false`

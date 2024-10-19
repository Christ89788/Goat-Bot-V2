const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "Chris",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const botName = "𝑁𝑎𝑚𝑖𝑘𝑎𝑧𝑒 𝑀𝑖𝑛𝑎𝑡𝑜";
		const botPrefix = ".";
		const authorName = "𝐶ℎ𝑟𝑖𝑠 𝑠𝑡";
		const ownAge = "18";
		const teamName = "Chris2009";
		const authorFB = "https://www.facebook.com/profile.php?id=100094118835962";
		const authortelegram = "https://t.me/hacklab3";
		const tikTok = "tiktok.com/@Minato89788";
		const urls = JSON.parse(fs.readFileSync('chris.json'));
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `《  𝐼𝑛𝑓𝑜 𝑑𝑒 𝑛𝑎𝑚𝑖𝑘𝑎𝑧𝑒 𝑀𝑖𝑛𝑎𝑡𝑜 》
\Name: ${botName}
\Bot Prefix: ${botPrefix}
\owner: ${authorName}
\age : ${ownAge}
\Facebook: ${authorFB}
\telegram: ${authorInsta}
\TikTok: ${tikTok}
\Datee: ${date}
\Time: ${time}
\Team: ${teamName}
\Uptime: ${uptimeString}
\===============`,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};

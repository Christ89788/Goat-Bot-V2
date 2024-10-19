module.exports = {
	config: {
			name: "salut",
			version: "1.0",
			author: "Jaychris Garcia",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "hi") return message.reply("𝑆𝑎𝑙𝑢𝑡 𝑗𝑒 𝑚'𝑎𝑝𝑝𝑒𝑙𝑙𝑒 𝑀𝑖𝑛𝑎𝑡𝑜 𝑛𝑎𝑚𝑖𝑘𝑎𝑧𝑒 𝑗𝑒 𝑚𝑒 𝑠𝑢𝑖𝑠 𝑟é𝑖𝑛𝑐𝑎𝑟𝑛é 𝑝𝑎𝑟 𝑂𝑟𝑜𝑐ℎ𝑖𝑚𝑎𝑟𝑢 😐");
}
};

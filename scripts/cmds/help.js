const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ ⚡| 𝐁𝐨𝐫𝐮𝐬𝐡𝐢𝐤𝐢 𝐔𝐳𝐮𝐦𝐚𝐤𝐢 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // original author Kshitiz 
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔═══════════╗\n     ✰𝐁𝐨𝐫𝐮𝐬𝐡𝐢𝐤𝐢 𝐔𝐳𝐮𝐦𝐚𝐤𝐢✰\n╚═══════════╝`; // replace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────────\n│ 『  ${category.toUpperCase()}  』`;

          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `⚡${item}`);
            msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────ꔪ`;
        }
      });

      const totalCommands = commands.size;
      msg += `\𝐁𝐨𝐫𝐮𝐬𝐡𝐢𝐤𝐢, 𝐁𝐨𝐫𝐮𝐬𝐡𝐢𝐤𝐢 𝐔𝐳𝐮𝐦𝐚𝐤𝐢 𝐚 ${totalCommands} 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐩𝐨𝐮𝐯𝐚𝐧𝐭 ê𝐭𝐫𝐞 𝐮𝐭𝐢𝐥𝐢𝐬é𝐞𝐬 𝐜𝐡𝐞𝐳 𝐥𝐞 𝐦𝐚î𝐭𝐫𝐞 𝐡𝐨𝐤𝐚𝐠𝐞 𝟒𝐞𝐦 𝐝𝐮 𝐧𝐨𝐦\n`;
      msg += `𝗧𝘆𝗽𝗲 ${prefix} 𝐀𝐢𝐝𝐞𝐳 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐦𝐝 à 𝐚𝐟𝐟𝐢𝐜𝐡𝐞𝐫 𝐥𝐞𝐬 𝐝é𝐭𝐚𝐢𝐥𝐬 𝐝𝐞 𝐜𝐞𝐭𝐭𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐝𝐞 𝐥𝐞 𝐜𝐥𝐚𝐢𝐫 𝐣𝐚𝐮𝐧𝐞 𝐝𝐮 𝐤𝐨𝐧𝐨𝐡𝐚 ⚡ 𝐏𝐑𝐎𝐅𝐈𝐋 𝐀𝐃𝐌𝐈𝐍 : https://www.facebook.com/profile.php?id=100094118835962&mibextid=ZbWKwL .\n`;
      msg += `⚡ | 𝐍𝐚𝐦𝐢𝐤𝐚𝐳𝐞 𝐌𝐢𝐧𝐚𝐭𝐨`; // its not decoy so change it if you want 

      await message.reply(msg);
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `╭── NAME ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
				     }

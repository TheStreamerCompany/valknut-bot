const { ActivityType } = require('discord.js');
const client = require('..');
require('colors');

client.on('ready', () => {
  const activities = [
    // {
    //   name: `${client.guilds.cache.size} Servers`,
    //   type: ActivityType.Listening,
    // },
    {
      name: `{/} Slash Commands`,
      // type: ActivityType.Playing,
      type: ActivityType.Listening,
    },
    // {
    //   name: `${client.channels.cache.size} Channels`,
    //   type: ActivityType.Playing,
    // },
    // { name: `${client.users.cache.size} Users`, type: ActivityType.Watching },
    // { name: `top.gg`, type: ActivityType.Competing }
  ];
  const status = ['online']; // ['online', 'dnd', 'idle'];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0;
    client.user.setStatus(status[s]);
    s++;
  }, 30000);
  console.log(`Logged in as ${client.user.tag}!`.red);
});

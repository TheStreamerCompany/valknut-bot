const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandType,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  name: 'invite',
  description: "Get the bot's invite link",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: [],
  botPerms: [],
  run: async (client, interaction) => {
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
    const embed = new EmbedBuilder()
      .setTitle('Invítame')
      .setDescription(`Invita al bot a tu servidor. [Click aquí](${inviteUrl})`)
      .setColor('#03fcdb')
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: client.user.tag });

    const actionRow = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setLabel('Invitar')
        .setURL(inviteUrl)
        .setStyle(ButtonStyle.Link),
    ]);
    return interaction.reply({ embeds: [embed], components: [actionRow] });
  },
};

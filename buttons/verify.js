const config = require('../config.json');

module.exports = {
  id: 'verify_button',
  permissions: [],
  run: async (client, interaction) => {
    await interaction.member.roles.add(interaction.role);
    if (interaction.member.roles.cache.get(interaction.role))
      return interaction.reply({
        content: `${interaction.user}, You were already verified.`,
        ephemeral: true,
      });
    return interaction.reply({
      content: `✅ ${interaction.user}, You are verified.`,
      ephemeral: true,
    });
  },
};

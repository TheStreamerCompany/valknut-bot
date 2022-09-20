const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  GuildMemberRoleManager,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');

module.exports = {
  name: 'verify',
  description: 'Set simple verification for this server.',
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'Administrator',
  options: [
    {
      name: 'set',
      description: 'Add role to a user.',
      type: 1,
      options: [
        {
          name: 'channel',
          description: 'The channel of verification',
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
        {
          name: 'role',
          description: 'The channel of verification',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
        {
          name: 'title',
          description: 'The verification embed title.',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: 'description',
          description: 'The verification embed description.',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    if (interaction.options._subcommand === 'set') {
      try {
        const title = interaction.options.get('title').value;
        const description = interaction.options.get('description').value;
        const channel = interaction.options.get('channel').channel;
        const role = interaction.options.get('channel').role;

        const embed = new EmbedBuilder()
          .setTitle(title || 'Verify')
          .setDescription(description || `Click the button below to verify.`)
          .setColor('Green')
          .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
          });

        const buttons = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Verify')
            .setStyle('Success')
            .setCustomId('verify_button')
        );

        await channel.send({ embeds: [embed], components: [buttons] });
        return interaction.reply({
          content: `Setted up verification.`,
          ephemeral: true,
        });
      } catch {
        return interaction.reply({
          content: `Sorry, I failed setting up...`,
          ephemeral: true,
        });
      }
    }
  },
};

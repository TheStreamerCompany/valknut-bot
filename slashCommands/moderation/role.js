const { EmbedBuilder, RoleManager, ApplicationCommandType } = require('discord.js');

module.exports = {
  name: 'role',
  description: 'Administra los roles del servidor o de los miembros.',
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: 'ManageRoles', // permission required
  options: [
    {
      name: 'add',
      description: 'Añadir un rol a un usuario.',
      type: 1,
      options: [
        {
          name: 'rol',
          description: 'El rol que le quieres añadir al usuario.',
          type: 8,
          required: true,
        },
        {
          name: 'usuario',
          description: 'El usuario al que le quieres añadir el rol.',
          type: 6,
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    if (interaction.options._subcommand === 'add') {
      try {
        const member = interaction.guild.members.cache.get(
          interaction.options.get('user').value
        );
        const rol = interaction.options.get('rol').role;

        await member.roles.add(role.id);
        const embed = new EmbedBuilder()
          .setTitle('¡Rol Añadido!')
          .setDescription(
            `Se ha añadido exitosamente el rol: ${rol} a ${member}`
          )
          .setColor('Green')
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
          });

        return interaction.reply({ embeds: [embed] });
      } catch {
        return interaction.reply({
          content: `Lo siento, No pude añadir ese rol.`,
          ephemeral: true,
        });
      }
    }
  },
};

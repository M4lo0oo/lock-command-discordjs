const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('This locks the (specific) channel in your server')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel that you want to lock in your server')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return await interaction.reply({ content: "You don't have permission to execute/use this command", ephemeral: true });
        }

        let channel = interaction.options.getChannel('channel');

        if (channel.type !== ChannelType.GuildText) {
            return await interaction.reply({ content: "Please select a valid text channel.", ephemeral: true });
        }

        await channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false });

        const embed = new EmbedBuilder()
            .setColor(0x0089D8)
            .setTitle('Channel Locked')
            .setDescription(`${channel} has successfully been **locked!**`)
            .setFooter({ text: 'Secury ©' });

        await interaction.reply({ embeds: [embed] });
    }
};

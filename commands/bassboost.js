const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
  none: 0.0,
  low: 0.2,
  medium: 0.3,
  high: 0.95,
};
module.exports = {
  name: "bassboost",
  description: "Ativa o Bass Boost.",
  usage: "<none|low|medium|high>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["bb", "bass"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Não está a tocar nada...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Precisas de estar numa lota para usar este comando!!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Precisas de estar na mesma lota que eu para usar o barulho extra!**"
      );

    if (!args[0])
      return client.sendTime(
        message.channel,
        "**Seleciona um dos niveis disponiveis. \nNiveis Disponiveis:** `none`, `low`, `medium`, `high`"
      ); //if the user do not provide args [arguments]

    let level = "none";
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();

    player.setEQ(
      ...new Array(3)
        .fill(null)
        .map((_, i) => ({ band: i, gain: levels[level] }))
    );

    return client.sendTime(
      message.channel,
      `✅ | **O barulho extra agora é** \`${level}\``
    );
  },
  SlashCommand: {
    options: [
      {
        name: "level",
        description: `Mete lá um nivel que eu conheça. Eu só conheço estes: low, medium, high, or none`,
        value: "[level]",
        type: 3,
        required: true,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      const levels = {
        none: 0.0,
        low: 0.2,
        medium: 0.3,
        high: 0.5,
      };

      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Não está a tocar nada...**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Precisas de estar numa lota para usar este comando.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(voiceChannel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Precisas de estar na mesma lota que eu para usar o barulho extra!**"
        );
      if (!args)
        return client.sendTime(
          interaction,
          "**Seleciona um dos niveis disponiveis. \nSó conheço estes:** `none`, `low`, `medium`, `high`"
        ); //if the user do not provide args [arguments]

      let level = "none";
      if (args.length && args[0].value in levels) level = args[0].value;

      player.setEQ(
        ...new Array(3)
          .fill(null)
          .map((_, i) => ({ band: i, gain: levels[level] }))
      );

      return client.sendTime(
        interaction,
        `✅ | **O barulho extra agora é** \`${level}\``
      );
    },
  },
};

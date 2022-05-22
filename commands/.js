const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "poker",
  description: "Starts a Poker session",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["pkr"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **You must be in a voice channel to play poker!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "❌ | **Bot doesn't have Create Invite Permission**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "879863976006127627"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "Poker Night",
        "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
      )
      .setColor("#FF0000").setDescription(`
Using **Poker Night** you can play Poker with your friends in a Voice Channel. Click *Join Poker Room* to join in!

__**[Join Poker Night](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** This only works in Desktop
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | You must be in a voice channel to play poker!"
        );
      if (
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "❌ | **Bot doesn't have Create Invite Permission**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "879863976006127627"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "YouTube Together",
          "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1"
        )
        .setColor("#FF0000").setDescription(`
Using **YouTube Together** you can watch YouTube with your friends in a Voice Channel. Click *Join YouTube Together* to join in!

__**[Join YouTube Together](https://discord.com/invite/${Invite.code})**__

⚠ **Note:** This only works in Desktop
`);
      interaction.send(embed.toJSON());
    },
  },
};

//https://gist.github.com/GeneralSadaf/42d91a2b6a93a7db7a39208f2d8b53ad

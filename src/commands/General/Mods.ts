/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "mods",
			description: "Generally used to check if bot is Up",
			category: "general",
            usage: `${client.config.prefix}mods`,
            dm: true,
            aliases: ['moderators', 'mod', 'owner'],
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const kacchan =
			"https://c.tenor.com/H2tVYsdRw0kAAAPo/zerotwo-darlinginthefranxx.mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: kacchan },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `๐ฎ แดแดแดแดสแดแดแดส๊ฑ\n
โฐโข แดกแดสส300
๐แดแดษดแดแดแดแด: wa.me/917842346461?text=๐๐๐ก๐ก๐ค+300/>
โโโโโโโโโโโโโโ
โฐโข แดแดษชษด
๐แดแดษดแดแดแดแด: wa.me/919662713165?text=๐๐๐ก๐ก๐ค+แดแดษชษด
โโโโโโโโโโโโโโ
โฐโข สแดสแด สแดแดแด๊ฑส
๐แดแดษดแดแดแดแด: wa.me/918473956301?text=๐๐๐ก๐ก๐ค+สแดแดแด๊ฑส
โโโโโโโโโโโโโโ
โฐโข สสแดแดขแด
๐แดแดษดแดแดแดแด: wa.me/917721059975?text=๐๐๐ก๐ก๐ค+สสแดแดขแด
โโโโโโโโโโโโโโโโโโ
๐๐๐ฟ๐ฟ๐พ๐๐ ๐ถ๐๐พ๐๐ฟ                                        
๐ https://chat.whatsapp.com/JboXSiHnBLBLE9cJ5Ai8ur 
โขโโโ โฝ โข โฝ โโโโข`,
			}
		);
	};
}

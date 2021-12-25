import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: '2help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['2h']
        })
    }

     run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
           const n = [
           'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac4fb8b6-d014-4b6d-92c0-0e75282eb7dd/dd0kfxg-6e5a1586-f02d-43ee-9f5e-271aa80719ea.jpg/v1/fill/w_1280,h_754,q_75,strp/rias_gremory__noahx6__by_noahx6_dd0kfxg-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzU0IiwicGF0aCI6IlwvZlwvYWM0ZmI4YjYtZDAxNC00YjZkLTkyYzAtMGU3NTI4MmViN2RkXC9kZDBrZnhnLTZlNWExNTg2LWYwMmQtNDNlZS05ZjVlLTI3MWFhODA3MTllYS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.TZJbMQjhQcfqRfXuKgNFksxv4K9ICdvcr5P4MAB8-bk'
        ]
        let zerotwo = n[Math.floor(Math.random() * n.length)]
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `👋🏻 (🍒) Konichiwa! *${M.sender.username}*\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `━━❰•Bot ${this.emojis[keys.indexOf(key)]} ${this.client.util.capitalize(key)}•❱━━\n• \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                     .join(' \n')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, { url: zerotwo }, MessageType.image, {quoted:M.WAMessage,


            caption: `${text} 📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🚀 *Command:* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n⛩ *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n♦️ *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🎐 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n💎 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }

    emojis = ['🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒','🍒']
}

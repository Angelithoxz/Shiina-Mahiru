export default {
  command: ['tagall', 'todos', 'invocar'],
  category: 'group',
  description: 'Mencionar a todos los participantes del grupo.',

  run: async ({ msg, sock, args, usedPrefix, command }) => {
    const chatId = msg.chat

    if (!chatId.endsWith('@g.us')) {
      return msg.reply('「✎」 Este comando solo funciona en grupos.')
    }

    if (!args.length) {
      return msg.reply(
        `「✎」 Uso correcto:\n\n` +
        `> *${usedPrefix + command}* mensaje\n` +
        `Ejemplo:\n` +
        `> *${usedPrefix + command}* reunión ahora`
      )
    }

    const metadata = await sock.groupMetadata(chatId)
    const participants = metadata.participants.map(p => p.id).filter(Boolean)
    const text = args.join(' ').trim()

    let report = `» *Invocación general*\n\n`
    report += `> *${text}*\n`
    report += `> Participantes: \`${participants.length}\`\n\n`

    for (const jid of participants) {
      report += `✧ @${jid.split('@')[0]}\n`
    }

    await sock.sendMessage(chatId, {
      text: report,
      mentions: participants
    }, { quoted: msg })
  }
}
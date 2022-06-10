import { Client, create } from '@open-wa/wa-automate'
import help from './lib/help.js'
import msgHandler from './msgHndlr.js'
import options from './options.js'


const start = async (client = new Client()) => {

        console.log('[SERVER] Servidor iniciado!')

        client.onGlobalParticipantsChanged((async (participant) => {
            const profilePic = await client.getProfilePicFromServer(participant.who)
            const groupInfo = await client.getGroupInfo(participant.chat)
            console.log(profilePic)
            if (participant.action === 'add') {
                const newMembertNumber = participant.who.replace(/@c.us/g, '')
                const welcomeMessage = `Paz do Senhor meu sancto @${newMembertNumber} 👋 Bem vindo ao grupo ${groupInfo.title}.\n ${groupInfo?.description ? groupInfo?.description : ''}`
                await client.sendImage(participant.chat, profilePic,'profilePicture', welcomeMessage)
            } else {
                let banMessage = 'Vixe baniram o cara oh KKKKKKKKKKKKK'
                await client.sendText(participant.chat, banMessage)
                banMessage = `Melhor pensar nos seus atos, foi banido do groupo ${groupInfo.title} por  péssimas atitudes...`
                client.sendText(participant.who, banMessage)
            }
        }))

        client.onStateChanged((state) => {
            console.log('[Status do cliente]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })

        // listening on message
        client.onMessage((async (message) => {

            client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })

            msgHandler(client, message)

        }))
        
        client.onButton((async (chat ) => {
        
            switch (chat?.body) {
                case 'Menu do bot':
                        await client.sendText(chat?.chatId, help)
                    break;
            
                case 'Quem sou eu?':
            	        await client.sendText(chat?.chatId, `Eu sou um bot, me chamo Spirit, foi desenvolvido pelo Pedro e outros desenvolvedores`)
                    break;
            }

        }))

        client.onAddedToGroup((async (chat) => {
            client.sendText(chat.id, 'E aí rapaziada, sou o Spirit, o bot de vocês. Estou ainda sendo atualizado e melhorado a cada,por isso algumas vezes não fico online. Qualquer dúvida, manda um !help.')
        }))

}

create(options(true, start))
    .then(client => {
        start(client)
    }).catch((error) =>{
        console.log(error)
    })

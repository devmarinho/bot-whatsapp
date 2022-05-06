import { Client, create } from '@open-wa/wa-automate'
import help from './lib/help.js'
import msgHandler from './msgHndlr.js'
import options from './options.js'


const start = async (client = new Client()) => {

        console.log('[SERVER] Servidor iniciado!')

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

}

create(options(true, start))
    .then(client => {
        start(client)
    }).catch((error) =>{
        console.log(error)
    })

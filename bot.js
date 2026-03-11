const tmi = require('tmi.js');

const client = new tmi.Client({
    identity: {
        username: 'voippbot',
        password: 'oauth: *** '
    },
    channels: ['voipp_']
});

client.connect();

client.on('connected', (address, port) => {
    console.log(`Bot conectado em ${address}:${port}`);
});

setInterval(() => {
    client.say("#voipp_", "🔥 Siga o canal para não perder as lives!");
}, 500000);

let cooldown = false

client.on('message', async (channel, tags, message, self) => {
    if (self) return;

    if (cooldown) return;

    cooldown = true;

    setTimeout(() => {
        cooldown = false;
    }, 3000); 

    message = message.toLowerCase();

    switch (true) {
    
        case message === '!oi':
            client.say(channel, `Olá @${tags.username}!`);
            break;
    
        case message === '!teste':
            client.say(channel, `Tá funcionando bem @${tags.username}!`);
            break;

        case message === '!setup':
            client.say(channel, `@${tags.username} Meu hardware é: Procesador Ryzen 5 5600 com Radeon Graphics x12; SSD Kingston 1TB; Placa-Mãe Biostar Group A520MH 3.0.`);
            break;
        
        case message === '!comandos':
            client.say(channel, `@${tags.username} comandos disponíveis: !oi | !teste | !setup | !comandos | !donate`);
            break;
        
        case message.includes('!donate'):
            client.say(channel, 'Manda o pix para eu receber mais atualizações!');
            break;
    }
});

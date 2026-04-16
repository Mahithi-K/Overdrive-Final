import dotenv from 'dotenv';
dotenv.config();

import { initBot } from './bot.js';
import { initDB } from './db/database.js';
import { server } from './server.js';

const port = process.env.PORT || 3001;

// 🚀 START SERVER IMMEDIATELY (before anything async)
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

async function bootstrap() {
    initDB();
    console.log('Database initialized');

    const token = process.env.DISCORD_TOKEN;
    const clientId = process.env.DISCORD_CLIENT_ID;
    const webUrl = process.env.WEB_URL || 'http://localhost:5173';

    if (token && clientId) {
        initBot(token, clientId, webUrl)
            .then(() => console.log("Bot initialized"))
            .catch(console.error);
    }
}

bootstrap();
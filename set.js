const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU9VY0phT3pBWiswMUw5NEdNaCsrM3hpUGVpa0d2anEyMmxQVlBPbTZYUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzdnSzlxK3Y2Qkg2WDM2VzVNY1ZHRURVUmxKekc3bU9QM1hKM0RPTVhEdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHUDRudVdEMVNmUnE4Q3lWeStqaW8xcXB1UUdsdFZDV3VHSmptUnhLS0YwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOWTdhZ0tPSmJaeXRKcUt1L2F6NWxsSDZyNFZZL3AxdUpTb0ZGZmZpZXpZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCYmZndW5xMGdLc05udVZXYk56YVhKcGtkeHMrRzR0VjNEUlFHRVd6blU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN4VWFBSTczMThwTTE3UTRpdlU3NmpNVGkzQXBiOFh3VjIxbzN2STV2MDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERCNWRFUmRjL0tJRFg4dnlBZDFQUzVMT2Q2VVUxVEp4Y1B3VS9jUWpsdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVdtVTJlaUJnRXdFc2pYVmlhc1lmaWNCMlRNdGduWkN4b2xCSVplbmtSUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQvaDMrdUtFRE5DQTR3WmZXZ2hSQXVkQitON3h4ODdQeFZhNDIrRjFVd2pZdVUyUUNKSUg0cDZ3M29XZEN0L2xFb2MxT21xVFg1Z29EZ2FKTWhnK2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjgsImFkdlNlY3JldEtleSI6ImpEVFBzTytTdnZDbjNwZkFQT0dMUkhSYXVIK3FUemJ4Uk8rd3JiZWNnYVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlFBY0ZrTElyU2VxRzhjamtTTC1Wb0EiLCJwaG9uZUlkIjoiMjlhMDU5ZTYtZWZhMi00MzhjLWFiODItY2Q1M2NlZGYwNDg2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InMxRU02cmlJOVgyaTU0N2xrV2JrTEtjQ3ZyUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxSzNQRXIwTlREeFNUNFhaeit1MHBTdzZYS2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMzlCRFpKSEciLCJtZSI6eyJpZCI6IjI1NDczODYyMzA2MzozOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXJzaTZFREVKanQzYlVHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTzBWUGlXZHc5dHN1SVFMUlZFS0kyenBDaFJWUytsZ0pZRjRqKzBXQTlEUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoibzM1OU5zRWY2aUFvQ0FZZC83dWdvRGxIbFl3Wm5IcW5JbHBtMGJGOWsxekpyQkFSeVIyZDZFWjVrTXJ2S29FTjN4S1RQQ1M4NXd3K3ZtSmhzb2IvQlE9PSIsImRldmljZVNpZ25hdHVyZSI6Iis0NXRoQVBod0h4N1Njd2ZYaDZ5VnBPenRGS2cwMjc3amprNU1DdVJxdDYrU3FLQUN4dGxKWC9OZE9uQnJieFFka0RIcDVxcnJLNDZKMVdvOG40aGlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzM4NjIzMDYzOjM4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlR0RlQ0bG5jUGJiTGlFQzBWUkNpTnM2UW9VVlV2cFlDV0JlSS90RmdQUTAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMyOTk0OTN9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:/takudzwa" : "postgresql://tkm_user:clGg7nPmF6tVKJ6QIu1NaAB9JeQHOWkb@dpg-cqrnec5umphs73cnkqd0-a.oregon-postgres.render.com/tkm",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

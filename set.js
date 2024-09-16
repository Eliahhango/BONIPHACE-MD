const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZmNnhIUXdjMFVMMFovN2lHZk53MUdtcjNYYUFmQVptYmxHMGtJV3JsZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnhZbGoyZldvMnplSFBkT0JWRW1WejFndk4yV3VxdUFFeVlFRWhOUWZYVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPUHB0U1pHRU9Za3E0N2RzMzRRZnNGdDU5TU02OXV1OElTUUJzeURWTTJJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVem9PeGRteGZHekp3Nkc0cGp6VWJGb3E5ZzRzaXdTcm84NEtVQjRROXlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGc3MyMDVla0pQLzN2WTh6dW1nSlU2T054MTIySFVIcFZNaXZvNVJwbDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImQveUxYa3ZEOU9nWi9oSUNDQVk4aXM2ZHZCRnVvTXFiU0F4NCszN00vaVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0t5ZnB1MzFxWXBSd056ZWJIcGpEYmpBckh4Nkd0WEpOSlhNaXRucHdWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiazhtbFNKYW5KeHg5K0Y2cTRqQzBlTk9SVEFsUXlKVkhCaU9aVEliTUtqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjR3MTcrL1RSbVIwODZGSDRoSlYvRDljN2RNaU9PWGg3dkdKVjhJYWxUS3BzdUxPdXJ1dWRUYlhReVdJTGZDaGdsbWVudnhlVjdUeVpMWUd6ODd2aERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIyLCJhZHZTZWNyZXRLZXkiOiIvb2tDZG9LUEt5TXZydWpsbzFaaC9UT1RpclVKb05MOUducFE2RVAzOXFJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY4ODE2NDUxMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCNDFEN0NEQTdGNDREMDFDRUI4OEM3MUJCQjE5MENDQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2NTIyMDM0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4U2dmbnp2Z1Q5Q00xNmRULXdESUFnIiwicGhvbmVJZCI6IjQ5ODllNDY4LTMyYzgtNGE3YS05YWFlLTk2NmQzMzJlODU4OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSHpwNWVnMEUyWUxQQzBRQXVkZGlJQ1pmM0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjJJTG1zeS9NRTFidzhRZ1ZQeWJocEJyNUdVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlhHUEZLQ0pIIiwibWUiOnsiaWQiOiIyNTU2ODgxNjQ1MTA6MTZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi44CMRdKJbNKIadKIVOqZsGXMtmPNjGjNjHfNmWnNhsy6ypPjgI0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xUaGlYQVFuOFdpdHdZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlRVaWV6RTladGhJRzJPU2VWOFN4aWNsU21kYXlONFQ3Y0o4WU1zZmVDd1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlB0VDIwRm11VVlXQjNSMGFEZEwxY29XV3RuQy8wMithU201ZWc4akJkRzREK21xa3JDZDlTbUJieWNHa0taV0JWSC9FR2grdDVIa012ZUViRXlIbUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxTnc1VmVYNTFEV3ZWZ1B1ME8vc3Z1TFB2ck11OXZjTlIzdytiRU4vSWZhNFlzNzAvWjZWNkwyZzQxK01MNThkZTcvRnVQZG15cVRHNjgwZWI0c2ZDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY4ODE2NDUxMDoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVMUluc3hQV2JZU0J0amtubGZFc1luSlVwbldzamVFKzNDZkdETEgzZ3NHIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2NTIyMDI5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpzVCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Boniphace Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255688164510",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'EliTechWiz MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5462ea7070b61eb790caa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

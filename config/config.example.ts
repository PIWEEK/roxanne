
// --------------------------------------------------------------
// Copy this file to config.ts and edit with your data.
// You need to create a new bot with @BotFather, and copy here
// the token and the name of the command you have assigned to it.
// --------------------------------------------------------------

// @roxanne_en_bot
// https://t.me/roxanne_en_bot

// import { LanguagetoolParams } from "../src/model/languagetool.model";
// import * as loki from "lokijs";
// import { wordsList } from "../src/database/words";

// const token = 'YOUR TOKEN HERE';

// const commands = {
//   start: {
//     name: "start",
//     description: "Wake up Roxanne"
//   },
//   learn: {
//     name: "learn",
//     description: "Start exercises."
//   },
//   win: {
//     name: "didiwin",
//     description: "Who has won the piweek?"
//   },
//   addWord: {
//     name: "add",
//     description: "Add a word to your learning list"
//   },
//   removeWord: {
//     name: "remove",
//     description: "Remove a word from your learning list"
//   },
//   listWords: {
//     name: "list",
//     description: "List words from your learning list"
//   },
// };

// const languageCode: string = "en-GB";

// let languagetoolParams: LanguagetoolParams = {
//   language: languageCode,
//   text: "",
//   motherTongue: "YOUR MOTHER TONGHE",
//   level: "default",
// };

// const db = new loki('DATABASE FILE URL', {
//   autoload: true,
//   autosave: true,
//   autosaveInterval: 4000,
//   autoloadCallback: () => {
//     if(db.getCollection("words") === null ) {
//       const wordsDB = db.addCollection("words", {autoupdate: true});
//       const allRecords = wordsDB.chain().data();

//       if (allRecords.length === 0) {
//         wordsDB.insert(wordsList);
//       }
//     }
//   }
// });

// export {
//   token,
//   commands,
//   languageCode,
//   languagetoolParams,
//   db
// };
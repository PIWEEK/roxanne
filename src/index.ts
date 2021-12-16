import * as TelegramBot from "node-telegram-bot-api";

import {
  token,
  commands,
  dbWords,
} from "../config/config";
import { sendMenu } from "./content/menu";
import { wordsExercise } from "./content/exercises/words";
import { meaningsExercise } from "./content/exercises/meaning";
import { sentenceExercise } from "./content/exercises/sentence";
import { botReplies } from "./content/conversation";
import { listenExercise, pronunciationExercise, speechExercise } from "./content/exercises/pronunciation";
import { wordsList } from "./database/words";


// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, {
  polling: true,
});

const initBot = () => {
  setupCommands();
  setupDB();
}

const setupDB = () => {

  const allRecords = dbWords.chain().simplesort("word").data();

  if (allRecords.length === 0) {
    dbWords.insert(wordsList);
  }

}

const setupCommands = () => {
  bot.setMyCommands(
    [
      {
        command: commands.learn.name,
        description: commands.learn.description,
      },
      {
        command: commands.win.name,
        description: commands.win.description,
      },
    ],
  );
}

bot.on("polling_error", (error: any) => {
  console.log(error);
});

bot.onText(new RegExp(`/${commands.start.name}`), (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    `${botReplies.welcome} ${nameUser}`
  );
});

bot.onText(new RegExp(`/${commands.win.name}`), (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    `${botReplies.piweekWinner}, ${nameUser}`
  );
});

bot.onText(new RegExp(`/${commands.learn.name}`), (msg: TelegramBot.Message) => {
  sendMenu("learnMenu", bot, msg.chat.id, botReplies.whichExercise);
});


bot.on(
  "callback_query",
  (result: TelegramBot.CallbackQuery) => {
    const data = result.data;

    switch (data) {
      case "words":
        wordsExercise(bot, result);
        break;

      case 'meanings':
        meaningsExercise(bot, result);
        break;

      case 'sentences':
        sentenceExercise(bot, result);
        break;

      case 'pronunciation':
        pronunciationExercise(bot, result);
        break;

      case 'pronunciationListen':
        listenExercise(bot, result);
        break;

      case 'pronunciationSpeak':
        speechExercise(bot, result);
        break;

      case "wordsYes":
        wordsExercise(bot, result);
        break;

      case "wordsNo":
        sendMenu(
          "learnMenu",
          bot,
          result.message.chat.id,
          botReplies.whichExercise
        );
        break;

      default:
        bot.answerCallbackQuery({
          callback_query_id: result.id,
          show_alert: true,
          text: botReplies.notImplemented,
        });
        break;
    }
  }
);

initBot();

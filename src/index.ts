import * as TelegramBot from "node-telegram-bot-api";

import {
  token,
  commands,
  db,
} from "../config/config";
import { sendMenu } from "./content/menu";
import { wordsExercise } from "./content/exercises/words";
import { meaningsExercise } from "./content/exercises/meaning";
import { sentenceExercise } from "./content/exercises/sentence";
import { botReplies } from "./content/conversation";
import { listenExercise, pronunciationExercise, speechExercise } from "./content/exercises/pronunciation";
import { wordsList } from "./database/words";
import { addWord, listWords, removeWord } from "./content/word-store";


// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, {
  polling: true,
});

const initBot = () => {
  setupCommands();
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
      {
        command: commands.addWord.name,
        description: commands.addWord.description,
      },
      {
        command: commands.removeWord.name,
        description: commands.removeWord.description,
      },
      {
        command: commands.listWords.name,
        description: commands.listWords.description,
      },
    ],
  );
}

bot.on("polling_error", (error: any) => {
  console.log(error);
});

// COMMANDS

bot.onText(new RegExp(`/${commands.start.name}`), (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `${botReplies.welcome}`
  );

  setTimeout(() => {
    bot.sendMessage(
      chatId,
      `${botReplies.welcome_error}`
    );
  }, 1500);
});

bot.onText(new RegExp(`/${commands.win.name}`), (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  const url = 'https://cdn.sndup.net/qk3t/piweek_winner.mp3?token=l2DciCQoMeLpHBm_HGC2UCC_wpg-ogw-xi9IyOC4ic4&token_path=%2Fqk3t%2F&expires=1639674780';

  bot
    .sendAudio(msg.chat.id, url).then(() => {
      setTimeout(() => {
        bot.sendMessage(
          chatId,
          `${botReplies.piweekWinner}, ${nameUser}`
        );
      }, 8000);
    })

});

bot.onText(new RegExp(`/${commands.learn.name}`), (msg: TelegramBot.Message) => {
  sendMenu("learnMenu", bot, msg.chat.id, botReplies.whichExercise, 100);
});


bot.onText(new RegExp(`/${commands.addWord.name}`), (msg: TelegramBot.Message) => {
  addWord(bot, msg);
});

bot.onText(new RegExp(`/${commands.removeWord.name}`), (msg: TelegramBot.Message) => {
  removeWord(bot, msg);
});

bot.onText(new RegExp(`/${commands.listWords.name}`), (msg: TelegramBot.Message) => {
  listWords(bot, msg);
});

// CALLBACK QUERIES

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

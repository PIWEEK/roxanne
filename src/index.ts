import * as TelegramBot from "node-telegram-bot-api";
import {
  token,
  commands,
} from "../config/config";
import { sendMenu } from "./content/menu";
import { wordsExercise } from "./content/exercises/words";
import { meaningsExercise } from "./content/exercises/meaning";
import { sentenceExercise } from "./content/exercises/sentence";

// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, {
  polling: true,
});

bot.on("polling_error", (error: any) => {
  console.log(error);
});

// GENERAL MESSAGES

// COMMANDS

bot.onText(commands.start, (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    "Welcome to Roxanne bot, " + nameUser
  );
});

bot.onText(commands.win, (msg: TelegramBot.Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    "You have certainly won the PIWEEK, " +
      nameUser
  );
});

// bot.onText(
//   commands.languagetool,
//   (msg: Message) => {
//     var chatId = msg.chat.id;
//     params.text = "This is sentence";

//     languagetool.check(params, (err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(res.matches[0]);
//         if (res.matches) {
//           bot.sendMessage(
//             chatId,
//             res.matches[0].shortMessage
//           );
//           bot.sendMessage(
//             chatId,
//             res.matches[0].message
//           );
//         } else {
//           bot.sendMessage(
//             chatId,
//             "This sentence looks good!"
//           );
//         }
//       }
//     });
//   }
// );

bot.onText(commands.learn, (msg: TelegramBot.Message) => {
  sendMenu(bot, msg, "Which exercise would you like to do?");
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

      default:
        bot.answerCallbackQuery({
          callback_query_id: result.id,
          show_alert: true,
          text: "Not implemented yet",
        });
        break;
    }
  }
);

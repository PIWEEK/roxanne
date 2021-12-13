import TelegramBot from "node-telegram-bot-api";
import languagetool from "languagetool-api";
import {
  token,
  commands,
} from "../config/config";
import { languagetoolParams } from "./model/languagetool.model";
import { learnMenu } from "./content/menu";
import { wordsExercise } from "./content/exercises";
import { CallbackQuery, Message } from 'telegram-typings';

let params: languagetoolParams = {
  language: "en-GB",
  text: "",
  motherTongue: "es",
  level: "default",
};

// Create a bot that uses 'polling' to fetch new updates
const bot: TelegramBot = new TelegramBot(token, {
  polling: true,
});

bot.on("polling_error", function (error) {
  console.log(error);
});

// GENERAL MESSAGES

// COMMANDS

bot.onText(commands.start, (msg: Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    "Welcome to Roxanne bot, " + nameUser
  );
});

bot.onText(commands.win, (msg: Message) => {
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(
    chatId,
    "You have certainly won the PIWEEK, " +
      nameUser
  );
});

bot.onText(commands.languagetool, (msg: Message) => {
  var chatId = msg.chat.id;
  params.text = "This is sentence";

  languagetool.check(params, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.matches[0]);
      if (res.matches) {
        bot.sendMessage(
          chatId,
          res.matches[0].shortMessage
        );
        bot.sendMessage(
          chatId,
          res.matches[0].message
        );
      } else {
        bot.sendMessage(
          chatId,
          "This sentence looks good!"
        );
      }
    }
  });
});

bot.onText(commands.learn, (msg: Message) => {
  bot.sendMessage(msg.chat.id, "Which exercise would you like to do?", {
    reply_markup: learnMenu,
  });
});

bot.on("callback_query", (result: CallbackQuery) => {

  const data = result.data;

  if (data === 'words') {
    wordsExercise(bot, result);
  } else {
    bot.answerCallbackQuery({
      callback_query_id: result.id,
      show_alert: true,
      text: "Not implemented yet",
    })
  }
});

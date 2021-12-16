import * as TelegramBot from "node-telegram-bot-api";
import { dbWords } from "../../config/config";
import { Word } from "../model/words.model";
import { botReplies } from "./conversation";
import { sendMenu } from "./menu";

let newWord: Word = {
  word: '',
  meaning: ''
}

const storeWord = (bot: TelegramBot, reply: TelegramBot.Message) => {
  newWord.meaning = reply.text;
  dbWords.insert(newWord);
  bot
  .sendMessage(
    reply.chat.id,
    `<strong>${reply.text}<strong> ${botReplies.addWord.success}`,
    { parse_mode: "HTML"}
  )
  sendMenu(
    "learnMenu",
    bot,
    reply.chat.id,
    botReplies.whichExercise
  )

  newWord = {
    word: '',
    meaning: ''
  }
}

const addWordName = (bot: TelegramBot, reply: TelegramBot.Message) => {
  newWord.word = reply.text;
  bot
  .sendMessage(
    reply.chat.id,
    `${botReplies.addWord.question.meaning}`
  ).then((result: TelegramBot.Message) => {
    bot.onReplyToMessage(
    result.chat.id,
    result.message_id,
    (reply: TelegramBot.Message) => {
      storeWord(bot, reply);
    });
});
}

const addWord = (
  bot: TelegramBot,
  message: TelegramBot.Message,
) => {
  bot
    .sendMessage(
      message.chat.id,
      `${botReplies.addWord.question.word}`
    )
    .then((result: TelegramBot.Message) => {
        bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: TelegramBot.Message) => {
          const result = dbWords.find({word: { '$eq' : reply.text }});
          if(!result.length) {
            addWordName(bot, reply);
          } else {
            bot
            .sendMessage(
              reply.chat.id,
              `<strong>${reply.text}<strong> ${botReplies.addWord.error}`,
              { parse_mode: "HTML"}
            )
          }
        });
    });
};

const removeWord = (
  bot: TelegramBot,
  message: TelegramBot.Message,
) => {
  bot
    .sendMessage(
      message.chat.id,
      `${botReplies.removeWord.question.word}`
    )
    .then((result: TelegramBot.Message) => {
        bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: TelegramBot.Message) => {
          const wordToRemove = dbWords.findOne({ word: reply.text });
          dbWords.remove(wordToRemove.$loki);
          bot
            .sendMessage(
              reply.chat.id,
              `<strong>${reply.text}<strong> ${botReplies.removeWord.success}`,
              { parse_mode: "HTML"}
            )
          sendMenu(
            "learnMenu",
            bot,
            reply.chat.id,
            botReplies.whichExercise
          )
        });
    });
};

export { addWord, removeWord };

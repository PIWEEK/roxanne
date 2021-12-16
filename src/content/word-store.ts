import * as TelegramBot from "node-telegram-bot-api";
import { dbWords } from "../../config/config";
import { Word } from "../model/words.model";
import { botReplies } from "./conversation";

let newWord: Word = {
  word: '',
  meaning: ''
}

const storeWord = (bot: TelegramBot, reply: TelegramBot.Message) => {
  newWord.meaning = reply.text;
  const result = dbWords.find({word: { '$eq' : reply.text }});
  if(!result.length) {
    dbWords.insert(newWord);
  }
  bot
  .sendMessage(
    reply.chat.id,
    `<strong>${reply.text}<strong> ${botReplies.addWord.success}`,
    { parse_mode: "HTML"}
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
          addWordName(bot, reply);
        });
    });
};

export { addWord };

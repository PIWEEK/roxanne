import * as TelegramBot from "node-telegram-bot-api";
import { db } from "../../config/config";
import { Word } from "../model/words.model";
import { botReplies } from "./conversation";
import { sendMenu } from "./menu";

let newWord: Word = {
  word: '',
  meaning: ''
}

const storeWord = (bot: TelegramBot, reply: TelegramBot.Message) => {
  newWord.meaning = reply.text;
  const wordsDB = db.getCollection('words');
  wordsDB.insert(newWord);
  db.saveDatabase((err) => {
    if(err) {
      console.error(err);
    }
  });
  bot
  .sendMessage(
    reply.chat.id,
    `<strong>${newWord.word}</strong> ${botReplies.addWord.success}`,
    { parse_mode: "HTML"}
  ).then(() => {
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

  })

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
          const wordsDB = db.getCollection('words');
          const result = wordsDB.find({word: { '$eq' : reply.text }});
          if(!result.length) {
            addWordName(bot, reply);
          } else {
            bot
            .sendMessage(
              reply.chat.id,
              `<strong>${reply.text}</strong> ${botReplies.addWord.error}`,
              { parse_mode: "HTML" }
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
          const wordsDB = db.getCollection('words');
          const wordToRemove = wordsDB.findOne({ word: reply.text });

          wordsDB.remove(wordToRemove.$loki);
          db.saveDatabase((err) => {
            if(err) {
              console.error(err);
            }
          });

          bot
            .sendMessage(
              reply.chat.id,
              botReplies.removeWord.success,
            ).then(() => {
              sendMenu(
                "learnMenu",
                bot,
                reply.chat.id,
                botReplies.whichExercise
              )
            })
        });
    });
};

const listWords = (
  bot: TelegramBot,
  message: TelegramBot.Message,
) => {
  const wordsDB = db.getCollection('words');
  const wordsList = wordsDB.chain().data();
  const wordsListMsg = wordsList.map((definition: Word) => {
    console.log(definition.word, definition.meaning);
    return `
    <strong>${definition.word}</strong> ${definition.meaning}\n`
  });
  bot
    .sendMessage(
      message.chat.id,
      `List of words:
      ${wordsListMsg.join(" ")}`,
      {parse_mode: 'HTML'}
    )
}

export { addWord, removeWord, listWords };

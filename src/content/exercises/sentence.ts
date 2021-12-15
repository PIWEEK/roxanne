import * as TelegramBot from "node-telegram-bot-api";
import * as languagetool from "languagetool-api";

import { languagetoolParams } from "../../../config/config";

import { LanguagetoolParams } from "../../model/languagetool.model";
import { Word } from "../../model/words.model";

import { getRandomWord } from "../../utils/utils";
import { sendMenu } from "../menu";
import { botReplies } from "../conversation";

const wordLength = 5;
let langParams: LanguagetoolParams = languagetoolParams;

const writeSentence = (bot: TelegramBot, message: TelegramBot.Message, word: Word) => {
  bot.sendMessage(
    message.chat.id,
    `✍️ Write a sentence (at least ${wordLength} words) using the word <em>${word.word}</em> ?`,
    { parse_mode: "HTML" }
  )
  .then((result: TelegramBot.Message) => {
    checkResponse(bot, result, word);
  });
}

const languageCheck = (bot:TelegramBot, chatId: number, message: string) => {
  langParams.text = message;
  languagetool.check(langParams, async (err, res) => {
    if (err) {
      console.log(err);
      sendMenu("learnMenu", bot, chatId, botReplies.whichExercise);
    } else {
      if (res.matches.length) {
        for (const match of res.matches) {
          await bot.sendMessage(
            chatId,
            `🛑 ${match.shortMessage}`
          ).then(() => {
            bot.sendMessage(
              chatId,
              `👉 ${match.message}`
            );
          })
        }
        sendMenu("learnMenu", bot, chatId, botReplies.whichExercise);
      } else {
        bot.sendMessage(
          chatId,
          botReplies.sentences.success
        ).then(() => {
          sendMenu("learnMenu", bot, chatId, botReplies.whichExercise);
        })
      }
    }
  });
};

const checkResponse = (
  bot: TelegramBot,
  result: TelegramBot.Message,
  word: Word
) => {
  bot.onReplyToMessage(
    result.chat.id,
    result.message_id,
    (reply: TelegramBot.Message) => {
      if (reply.text.split(" ").length < wordLength) {
        bot.sendMessage(
          reply.chat.id,
          botReplies.sentences.error.short
        );
        writeSentence(bot, reply, word);
      } else  if (!reply.text.includes(word.word)) {
        bot.sendMessage(
          reply.chat.id,
          `${botReplies.sentences.error.contains} <strong>${word.word}</strong>. ${botReplies.tryAgain}`,
          { parse_mode: "HTML" }
        );
        writeSentence(bot, reply, word);
      } else {
        const chatId = reply.chat.id;
        bot.sendMessage(
          chatId,
          botReplies.sentences.analysis
        );
        bot.sendChatAction(chatId, "typing")
        languageCheck(bot, chatId, reply.text)
      }
    }
  )
};

const sentenceExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  const word: Word = getRandomWord();
  if (result.message) {
    writeSentence(bot, result.message, word);
  }
}


export { sentenceExercise }
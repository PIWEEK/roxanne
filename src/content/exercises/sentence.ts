import * as TelegramBot from "node-telegram-bot-api";
import { languagetoolParams } from "../../model/languagetool.model";
import { Word } from "../../model/words.model";
import { getRandomWord } from "../../utils/utils";
import { sendMenu } from "../menu";
import * as languagetool from "languagetool-api";

let params: languagetoolParams = {
  language: "en-GB",
  text: "",
  motherTongue: "es",
  level: "default",
};

const wordLength = 5;

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
  params.text = message;
  languagetool.check(params, async (err, res) => {
    if (err) {
      console.log(err);
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
        sendMenu(bot, chatId, "Which exercise would you like to do now?");
      } else {
        bot.sendMessage(
          chatId,
          "This sentence looks good!"
        ).then(() => {
          sendMenu(bot, chatId, "Which exercise would you like to do now?");
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
          `⚠️ That sentence is too short. Try again`
        );
        writeSentence(bot, reply, word);
      } else  if (!reply.text.includes(word.word)) {
        bot.sendMessage(
          reply.chat.id,
          `⚠️ That sentence does not contain the word: <strong>${word.word}</strong>. Try again!`,
          { parse_mode: "HTML" }
        );
        writeSentence(bot, reply, word);
      } else {
        const chatId = reply.chat.id;
        bot.sendMessage(
          chatId,
          `🧐 Aha! Give me a second to analyze this sentence...`
        ).then(() => {
          languageCheck(bot, chatId, reply.text)

        })

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
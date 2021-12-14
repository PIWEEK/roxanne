import * as TelegramBot from "node-telegram-bot-api";
import { getRandomWord } from "../../utils/utils";
import { Word } from "../../model/words.model";
import { sendMenu } from "../menu";
import { botReplies } from "../conversation";

const tryAgain = (
  bot: TelegramBot,
  chatId: number
) => {
  sendMenu(
    "retryMenu",
    bot,
    chatId,
    botReplies.words.retry
  );
  bot.on(
    "callback_query",
    (result: TelegramBot.CallbackQuery) => {
      console.log('here');
      switch (result.data) {
        case "yes":
          wordsExercise(bot, result);
          break;

        case "no":
          sendMenu(
            "learnMenu",
            bot,
            chatId,
            botReplies.whichExercise
          );
          break;

        default:
          sendMenu(
            "learnMenu",
            bot,
            chatId,
            botReplies.whichExercise
          );
          break;
      }
    }
  );
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
      const chatId = reply.chat.id;

      if (reply.text === word.word) {
        bot
          .sendMessage(
            chatId,
            botReplies.words.success,
            { parse_mode: "HTML" }
          )
          .then(() =>
            sendMenu(
              "learnMenu",
              bot,
              chatId,
              botReplies.whichExercise
            )
          );
      } else {
        bot
          .sendMessage(
            chatId,
            `${botReplies.errors.smart} <strong>${word.word}</strong>`,
            { parse_mode: "HTML" }
          )
          .then(() => tryAgain(bot, chatId));
      }
    }
  );
};

const wordsExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery,
  previousWord?: Word
) => {
  const word: Word =
    previousWord || getRandomWord();
  bot
    .sendMessage(
      result.message.chat.id,
      `${botReplies.words.meaning} <em>${word.meaning}</em> ?`,
      { parse_mode: "HTML" }
    )
    .then((result: TelegramBot.Message) => {
      checkResponse(bot, result, word);
    });
};

export { wordsExercise };

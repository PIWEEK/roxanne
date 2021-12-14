import * as TelegramBot from "node-telegram-bot-api";
import { getRandomWord } from "../../utils/utils";
import { Word } from "../../model/words.model";
import { sendMenu } from "../menu";

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
        bot.sendMessage(
          chatId,
          `🎉 Right! <strong>${word.word}</strong> is the correct answer 👏👏👏`,
          { parse_mode: "HTML" }
        );
      } else {
        bot.sendMessage(
          chatId,
          `🤭 You probably weren't the smartest person in your class, were you? The right answer is <strong>${word.word}</strong>`,
          { parse_mode: "HTML" }
        );
      }
      sendMenu(bot, chatId, "Which exercise would you like to do now?");
    }
  )
};

const wordsExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  const word: Word = getRandomWord();
  bot.sendMessage(
    result.message.chat.id,
    `🤔 <strong>Question!!</strong> Which word means <em>${word.meaning}</em> ?`,
    { parse_mode: "HTML" }
  )
  .then((result: TelegramBot.Message) => {
    checkResponse(bot, result, word);
  });
};

export { wordsExercise };

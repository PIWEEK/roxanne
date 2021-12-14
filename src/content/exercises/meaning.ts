import { getRandomWord } from "../../utils/utils";
import { Word } from "../../model/words.model";
import { sendMenu } from "../menu";
import * as TelegramBot from "node-telegram-bot-api";

const checkResponse = (
  bot: TelegramBot,
  result: TelegramBot.Message,
  word: Word
) => {
  bot.onReplyToMessage(
    result.chat.id,
    result.message_id,
    (reply: TelegramBot.Message) => {
      bot.sendMessage(
        reply.chat.id,
        `💡 The meaning of <strong>${word.word}</strong> is: <em>${word.meaning}</em>`,
        { parse_mode: "HTML" }
      );
      sendMenu(bot, reply.chat.id, "Which exercise would you like to do now?");
    }
  )
};

const meaningsExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  const word: Word = getRandomWord();
  bot.sendMessage(
    result.message.chat.id,
    `🤔 <strong>Question!!</strong> What means <em>${word.word}</em> ?`,
    { parse_mode: "HTML" }
  )
  .then((result: TelegramBot.Message) => {
    checkResponse(bot, result, word);
  });
};

export { meaningsExercise };

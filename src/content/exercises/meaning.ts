import { getRandomWord } from "../../utils/utils";
import { Word } from "../../model/words.model";
import { sendMenu } from "../menu";
import * as TelegramBot from "node-telegram-bot-api";
import { botReplies } from "../conversation";

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
        `💡 <strong>${word.word}</strong>: <em>${word.meaning}</em>
      ${botReplies.meanings.check}`,
        { parse_mode: "HTML" }
      ).then(() => {
        sendMenu('learnMenu', bot, reply.chat.id, botReplies.whichExercise);
      })
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
    `${botReplies.meanings.question} <em>${word.word}</em> ?`,
    { parse_mode: "HTML" }
  )
  .then((result: TelegramBot.Message) => {
    checkResponse(bot, result, word);
  });
};

export { meaningsExercise };

import TelegramBot from "node-telegram-bot-api";
import { CallbackQuery } from "telegram-typings";

const wordsExercise = (
  bot: TelegramBot,
  result: CallbackQuery
) => {
  bot
    .sendMessage(
      result.message.chat.id,
      "Excuse me? Say you're sorry"
    )
    .then((result) => {
      console.log("result", result);
    });
  bot.onReplyToMessage(
    result.message.chat.id,
    result.message.message_id,
    (reply) => {
      bot.sendMessage(
        result.message.chat.id,
        "Good."
      );
    }
  );
};

export { wordsExercise };

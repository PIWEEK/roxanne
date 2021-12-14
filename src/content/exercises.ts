import { CallbackQuery, Message } from "telegram-typings";

const wordsExercise = (
  bot,
  result: CallbackQuery
) => {
  bot
    .sendMessage(
      result.message.chat.id,
      "Excuse me? Say you're sorry"
    )
    .then((result: Message) => {
      console.log("result", result);
      bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: Message) => {
          bot.sendMessage(
            reply.chat.id,
            "Good."
          );
        }
      );
    });
};

export { wordsExercise };

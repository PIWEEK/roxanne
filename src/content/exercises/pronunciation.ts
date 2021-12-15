import * as TelegramBot from "node-telegram-bot-api";
import * as googleTTS from "google-tts-api";

import { sendMenu } from "../menu";
import { botReplies } from "../conversation";

const pronounce = (
  bot: TelegramBot,
  reply: TelegramBot.Message
) => {
  const url = googleTTS.getAudioUrl(reply.text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  const options: TelegramBot.SendAudioOptions = {
    caption: reply.text,
  };

  bot
    .sendAudio(reply.chat.id, url, options)
    .then(() =>
      sendMenu(
        "learnMenu",
        bot,
        reply.chat.id,
        botReplies.whichExercise
      )
    );
};

const listenExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  bot
    .sendMessage(
      result.message.chat.id,
      `${botReplies.pronunciation.listen}`
    )
    .then((result: TelegramBot.Message) => {
      // pronounce(bot, result);
      bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: TelegramBot.Message) =>
          pronounce(bot, reply)
      );
    });
};

const pronunciationExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  sendMenu(
    "pronunciationMenu",
    bot,
    result.message.chat.id,
    botReplies.pronunciation.question
  );
};

export { pronunciationExercise, listenExercise };

import * as TelegramBot from "node-telegram-bot-api";
import * as googleTTS from "google-tts-api";
// import * as speech from '@google-cloud/speech';

import { sendMenu } from "../menu";
import { botReplies } from "../conversation";
import { languageCode } from "../../../config/config";

const speak = async (
  bot: TelegramBot,
  reply: TelegramBot.Message
  ) => {
    // const client = new speech.SpeechClient();

    // const filename = '/src/assets/audio_2021-12-15_15-58-28.ogg';

    // const config = {
    //   encoding: 'LINEAR16',
    //   sampleRateHertz: 16000,
    //   languageCode: languageCode,
    // };
    // const audio = {
    //   content: content: fs.readFileSync(filename).toString('base64'),
    // };

    // const request = {
    //   config: config,
    //   audio: audio,
    // };

    // const [response] = await client.recognize(request);
    // const transcription = response.results
    //   .map(result => result.alternatives[0].transcript)
    //   .join('\n');
    // console.log('Transcription: ', transcription);

    bot
    .sendMessage(
      reply.chat.id,
      `${botReplies.pronunciation.pay}`
    ).then(() =>
      sendMenu(
        "learnMenu",
        bot,
        reply.chat.id,
        botReplies.whichExercise
      )
    );
};

const pronounce = (
  bot: TelegramBot,
  reply: TelegramBot.Message
) => {
  const url = googleTTS.getAudioUrl(
    reply.text,
    {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
    }
  );

  const options: TelegramBot.SendAudioOptions = {
    caption: botReplies.pronunciation.sendAudio,
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
      bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: TelegramBot.Message) =>
          pronounce(bot, reply)
      );
    });
};

const speechExercise = (
  bot: TelegramBot,
  result: TelegramBot.CallbackQuery
) => {
  bot
    .sendMessage(
      result.message.chat.id,
      `${botReplies.pronunciation.speak}`
    ).then((result: TelegramBot.Message) => {
      // pronounce(bot, result);
      bot.onReplyToMessage(
        result.chat.id,
        result.message_id,
        (reply: TelegramBot.Message) => {
          speak(bot, reply);
        }
      );
    });
}

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

export { pronunciationExercise, listenExercise, speechExercise };

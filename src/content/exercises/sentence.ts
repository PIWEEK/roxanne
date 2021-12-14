import * as TelegramBot from "node-telegram-bot-api";
import { languagetoolParams } from "../../model/languagetool.model";
import { Word } from "../../model/words.model";
import { getRandomWord } from "../../utils/utils";
import { sendMenu } from "../menu";

let params: languagetoolParams = {
  language: "en-GB",
  text: "",
  motherTongue: "es",
  level: "default",
};

const wordLength = 10;

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

const checkResponse = (
  bot: TelegramBot,
  result: TelegramBot.Message,
  word: Word
) => {
  bot.onReplyToMessage(
    result.chat.id,
    result.message_id,
    (reply: TelegramBot.Message) => {
      console.log(reply);
      if (reply.text.split(" ").length < wordLength) {
        bot.sendMessage(
          reply.chat.id,
          `⚠️ That sentence is too short. Try again`,
          { parse_mode: "HTML" }
        );
        writeSentence(bot, reply, word);
      }
      if (!reply.text.includes(word.word)) {
        bot.sendMessage(
          reply.chat.id,
          `⚠️ That sentence is too short. Try again`,
          { parse_mode: "HTML" }
        );
        writeSentence(bot, reply, word);
      }



    //   if (reply.text === word.word) {
    //     bot.sendMessage(
    //       reply.chat.id,
    //       `🎉 Right! <strong>${word.word}</strong> is the correct answer 👏👏👏`,
    //       { parse_mode: "HTML" }
    //     );
    //   } else {
    //     bot.sendMessage(
    //       reply.chat.id,
    //       `🤭 You probably weren't the smartest person in your class, were you? The right answer is <strong>${word.word}</strong>`,
    //       { parse_mode: "HTML" }
    //     );
    //   }
    //   sendMenu(bot, result, "Which exercise would you like to do now?");
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

// var chatId = msg.chat.id;
//     params.text = "This is sentence";

//     languagetool.check(params, (err, res) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(res.matches[0]);
//         if (res.matches) {
//           bot.sendMessage(
//             chatId,
//             res.matches[0].shortMessage
//           );
//           bot.sendMessage(
//             chatId,
//             res.matches[0].message
//           );
//         } else {
//           bot.sendMessage(
//             chatId,
//             "This sentence looks good!"
//           );
//         }
//       }
//     });

export { sentenceExercise }
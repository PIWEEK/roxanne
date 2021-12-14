import * as TelegramBot from "node-telegram-bot-api";

const learnMenu = {
  inline_keyboard: [
    [
      {
        text: "Guess words",
        callback_data: "words",
      },
      {
        text: "Guess meanings",
        callback_data: "meanings",
      },
    ],
    [
      {
        text: "I want to write sentences",
        callback_data: "sentences",
      },
      {
        text: "I want to pronounce something",
        callback_data: "pronounce",
      },
    ]
  ],
}

const sendMenu = (bot: TelegramBot, chatId: number, text: string) => {
  bot.sendMessage(
    chatId,
    text,
    {
      reply_markup: learnMenu,
    }
  );
}

export { sendMenu }
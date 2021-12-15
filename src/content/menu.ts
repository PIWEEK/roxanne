import * as TelegramBot from "node-telegram-bot-api";
import { MenuList } from "../model/menu.model";

const menu = {
  learnMenu: {
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
          text: "Write sentences",
          callback_data: "sentences",
        },
        {
          text: "Improve pronunciation",
          callback_data: "pronunciation",
        },
      ]
    ],
  },
  retryWordsMenu: {
    inline_keyboard: [
      [
        {
          text: "yes",
          callback_data: "wordsYes",
        },
        {
          text: "no",
          callback_data: "wordsNo",
        }
      ]
    ],
  },
  pronunciationMenu: {
    inline_keyboard: [
      [
        {
          text: "speak",
          callback_data: "pronunciationSpeak",
        },
        {
          text: "listen",
          callback_data: "pronunciationListen",
        }
      ]
    ],
  }
}

const sendMenu = (
  menuId: MenuList = 'learnMenu',
  bot: TelegramBot,
  chatId: number,
  text: string) => {
  bot.sendMessage(
    chatId,
    text,
    {
      reply_markup: menu[menuId.toString()],
    }
  );
}

export { sendMenu }
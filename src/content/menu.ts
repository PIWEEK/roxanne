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
          text: "Improve pronounciation",
          callback_data: "pronounce",
        },
      ]
    ],
  },
  retryMenu: {
    inline_keyboard: [
      [
        {
          text: "yes",
          callback_data: "yes",
        },
        {
          text: "no",
          callback_data: "no",
        }
      ]
    ],
  }
}

const sendMenu = (menuItem: MenuList = 'learnMenu', bot: TelegramBot, chatId: number, text: string) => {
  bot.sendMessage(
    chatId,
    text,
    {
      reply_markup: menu[menuItem.toString()],
    }
  );
}

export { sendMenu }
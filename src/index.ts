import TelegramBot from "node-telegram-bot-api";
import { token } from '../config/config';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// ⚠️ Después de este comentario es donde ponemos la lógica de nuestro bot donde podemos crear los comandos y eventos para darle funcionalidades a nuestro bot

// Implementación de la primera funcionalidad: Cuando mandamos el mensaje "Hola" reconoce tú nombre y genera un input tipo "Hola Daniel"

bot.on('polling_error', function(error){
  console.log(error);
});

bot.onText(/^\/hola/, function(msg){
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(chatId, "Welcome to Roxanne bot, " + nameUser);
});

bot.onText(/^\/didiwin/, function(msg){
  var chatId = msg.chat.id;
  var nameUser = msg.from.first_name;

  bot.sendMessage(chatId, "You have certainly won the PIWEEK, " + nameUser);
});

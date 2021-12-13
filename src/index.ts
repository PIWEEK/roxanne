import TelegramBot from "node-telegram-bot-api";
import languagetool from "languagetool-api";
import { token } from '../config/config';
import { languagetoolParams } from "./model/languagetool.model";

let params: languagetoolParams = {
  language: 'en-GB',
  text: '',
  motherTongue: 'es',
  level: 'default'
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});



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

bot.onText(/^\/sentence/, function(msg){
  var chatId = msg.chat.id;
  params.text = "This is sentence"

  languagetool.check(params, function(err, res){
      if(err){
         console.log(err);
      } else{
        console.log(res.matches[0]);
        if (res.matches) {
          bot.sendMessage(chatId, res.matches[0].shortMessage);
          bot.sendMessage(chatId, res.matches[0].message);
        } else {
          bot.sendMessage(chatId, "This sentence looks good!");
        }
      }
  });

});

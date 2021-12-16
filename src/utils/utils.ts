import { dbWords } from "../../config/config";
import { Word } from "../model/words.model";

// Returns a randomWord from the words array
const getRandomWord = () => {
  const words = dbWords.chain().data();
  return words[Math.floor(Math.random() * words.length)]
}

export { getRandomWord };
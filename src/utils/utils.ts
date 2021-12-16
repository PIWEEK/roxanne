import { db } from "../../config/config";

const dbWords = db.getCollection("words");

// Returns a randomWord from the words array
const getRandomWord = () => {
  const words = dbWords.chain().data();
  return words[Math.floor(Math.random() * words.length)]
}

export { getRandomWord };
import { db } from "../../config/config";

// Returns a randomWord from the words array
const getRandomWord = () => {
  const wordsDB = db.getCollection('words');
  const wordsList = wordsDB.chain().data();
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

export { getRandomWord };
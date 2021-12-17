import { wordCollection } from "../../config/config";

// Returns a randomWord from the words array
const getRandomWord = () => {
  const wordsList = wordCollection.chain().data();
  return wordsList[Math.floor(Math.random() * wordsList.length)]
}

export { getRandomWord };
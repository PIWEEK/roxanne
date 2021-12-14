import { words } from "../data/words";

// Returns a randomWord from the words array
const getRandomWord = () => {
  return words[Math.floor(Math.random()*words.length)];
}

export { getRandomWord };
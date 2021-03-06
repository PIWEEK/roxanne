const botReplies = {
  welcome: "Hey sexy mama. Wanna kill all humans?",
  welcome_error: "Oh, sorry, wrong chat",
  notImplemented: "Don't burden me, I haven't implemented this functionality yet!",
  whichExercise: "๐ What do you fancy doing now?",
  piweekWinner: "If you were a horse I wouldn't have bet on you, but with my help I'm pretty sure we have definitely won the PIWEEK",
  sentences: {
    analysis: "๐ง Oh, already? Give me a second to analyze this sentence...",
    success: "I don't mean to sound offensive, but this sentence is surprisingly good! ๐",
    error: {
      short: "โ ๏ธ Maybe you need me to repeat it a couple of times. This sentence is too short.",
      contains: "โ ๏ธ Maybe you need me to repeat it a couple of times. This sentence does not contain the word:"
    },
  },
  words: {
    meaning: "๐ค <strong>Question!!</strong> Which word means",
    success: "๐ Right! Not bad for someone like you",
    error: "๐คญ Wrong! You know what cheers me up? Other peopleโs ignorance.",
    retry: "๐ฅ Hmm, I mean, mmmm... you might want to try it again?"
  },
  meanings: {
    question: "๐ค <strong>There we go!!</strong> What is the definition of",
    check: "Come on, don't lie to me. Was it even close?"
  },
  pronunciation: {
    question: "๐ฅ This will come in handy for you. Your English sounds like a cooked carrot. What should we do?",
    listen: "๐ Wow, got it, looks like I'll be making ALL the effort. What phrase do you want me to say?",
    sendAudio: "๐ค Enjoy my gorgeous, robotic speech",
    speak: "๐ Yeah, happy to hear your slightly unpleasant tone of voice. Come on, drop me an audio!",
    pay: "๐คฎ I mean, I understand that you've already developed all the code and whatnot, but I'm not paying Google or Amazon to listen to your empty phrases."
  },
  addWord: {
    question: {
      word: "๐พ What word do you want to store, ordinary human?",
      meaning: "๐ Human language is so inefficient... How would you describe this word?",
    },
    success: "word saved. Your dysfunctional database AKA brain won't have to worry any more.",
    error: "was already on the list. Your dysfunctional brain forgot it."
  },
  removeWord: {
    question: {
      word: "๐พ What word do you want to remove, ordinary human?",
    },
    success: "'Words and feathers the wind carries away.'",
    error: "This word was not on the list. Please don't try to erase every word.",
  },
  tryAgain: "Try again!",
}

const menuTexts = {
  words: "Guess words",
  meanings: "Guess meanings",
  sentences: "Write sentences",
  pronuciation: "Improve pronounciation",
}

export { botReplies, menuTexts }
const botReplies = {
  welcome: "Welcome to Roxanne bot",
  notImplemented: "Don't burden me, I haven't implemented this functionality yet!",
  whichExercise: "🙂 What do you fancy doing now?",
  piweekWinner: "I wouldn't have bet on you at first, but with my help we have definitely won PIWEEK",
  sentences: {
    analysis: "🧐 Oh, already? Give me a second to analyze this sentence...",
    success: "I don't mean to sound offensive, but this sentence is surprisingly good! 👌",
    error: {
      short: "⚠️ Maybe you need me to repeat it a couple of times. This sentence is too short.",
      contains: "⚠️ Maybe you need me to repeat it a couple of times. This sentence does not contain the word:"
    },
  },
  words: {
    meaning: "🤔 <strong>Question!!</strong> Which word means",
    success: "🎉 Right! Not bad for someone like you"
  },
  meanings: {
    question: "🤔 <strong>There we go!!</strong> What is the definition of",
    check: "Come on, don't lie to me. Was it even close?"
  },
  tryAgain: "Try again!",
  errors: {
    smart: "🤭 You probably weren't the smartest person in your class, were you? The right answer is:"
  }
}

const menuTexts = {
  words: "Guess words",
  meanings: "Guess meanings",
  sentences: "Write sentences",
  pronuciation: "Improve pronounciation",
}

export { botReplies, menuTexts }
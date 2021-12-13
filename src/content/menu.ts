const learnMenu = {
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
      {
        text: "I want to write sentences",
        callback_data: "sentences",
      },
    ]
  ],
}

export { learnMenu }
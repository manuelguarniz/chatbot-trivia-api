const questions = require("../data/questions");

let currentTopic = null;
let currentQuestionIndex = 0;

const processMessage = (message) => {
  // Comandos iniciales
  if (message.toLowerCase() === "start") {
    const topics = Object.keys(questions).join(", ");
    return `¡Bienvenido a Trivia! Elige un tema: ${topics}`;
  }

  // Selección de tema
  if (questions[message]) {
    currentTopic = message;
    currentQuestionIndex = 0;
    return `Has elegido el tema ${currentTopic}. Aquí va tu primera pregunta: ${askQuestion()}`;
  }

  // Verificar respuesta
  if (currentTopic) {
    const currentQuestion = questions[currentTopic][currentQuestionIndex];
    if (message === currentQuestion.answer) {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions[currentTopic].length) {
        return `⭐ ¡Correcto! Próxima pregunta: ${askQuestion()}`;
      } else {
        const topic = currentTopic;
        currentTopic = null; // Reiniciar tema
        return `⭐ ¡Felicitaciones, completaste el tema ${topic}! Escribe "start" para jugar de nuevo.`;
      }
    } else {
      return `💩 Respuesta incorrecta. Intenta otra vez o escribe "start" para cambiar de tema.`;
    }
  }

  return `No entiendo tu mensaje. Escribe "start" para comenzar.`;
};

// Obtener pregunta actual
const askQuestion = () => {
  const question = questions[currentTopic][currentQuestionIndex];
  return `${question.question}\nOpciones: ${question.options.join(", ")}`;
};

module.exports = { processMessage };

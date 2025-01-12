const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

const API_URL = "http://localhost:8081/trivia"; // URL de tu backend

// Agregar mensaje al chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(isUser ? "user-message" : "bot-message");
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazarse al final
}

// Enviar mensaje al backend
async function sendMessage() {
  const message = messageInput.value.trim();
  if (message === "") return;

  // Agregar mensaje del usuario
  addMessage(message, true);

  // Limpiar entrada de texto
  messageInput.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    // Agregar respuesta del bot
    if (data.response) {
      addMessage(data.response);
    } else {
      addMessage("Error: no se recibió respuesta del servidor.");
    }
  } catch (error) {
    addMessage("Error: no se pudo conectar con el servidor.");
    console.error(error);
  }
}

// Manejar eventos
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

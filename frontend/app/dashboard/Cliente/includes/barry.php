<style>
      
  /* Chat desplegable */
  #chat-box {
    display: none;
    position: fixed;
    bottom: 120px;
    right: 20px;
    width: 400px;
    height: 650px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    flex-direction: column;
    overflow: hidden;
    z-index: 9999;
  }
  
  /* Mostrar chat al abrir */
  #chat-box.visible {
    display: flex;
    flex-direction: column;
  }
  
  /* Mensajes */
  .message { 
    margin: 5px 0; 
    padding: 10px; 
    border-radius: 8px; 
    max-width: 80%; 
    word-wrap: break-word; 
  }
  .user { background-color: #dcf8c6; align-self: flex-end; }
  .bot { background-color: #eee; align-self: flex-start; }
  
  /* Input */
  #input-container { display: flex; padding: 10px; border-top: 1px solid #ccc; }
  #input-container input { flex: 1; padding: 10px; border-radius: 20px; border: 1px solid #ccc; }
  #input-container button { margin-left: 10px; padding: 0 20px; border: none; background-color: #007bff; color: #fff; border-radius: 20px; cursor: pointer; }
  
  /* Loading */
  #loading { text-align: center; font-size: 14px; color: #666; display: none; margin-bottom: 5px; }
  .dot { animation: blink 1.4s infinite both; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes blink { 
    0%,80%,100% { opacity:0; } 
    40% { opacity:1; } 
  }
  
</style>
<!-- BOTÓN FLOTANTE Y CHAT -->
<div id="chatbot-container">
  <!-- Botón animado -->
  <div id="chatbot-button">
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="ring ring-1"></div>
    <div class="ring ring-2"></div>
    <div class="ring ring-3"></div>
    <div class="core"></div>
  </div>
</div>

<!-- Chat desplegable -->
<div id="chat-box">
  <select id="server-select">
    <option value="http://100.101.106.103:3000/chat">Servidor Principal</option>
    <option value="http://localhost:3000/chat">Servidor Local</option>
    <option value="https://api.bringfeel.com.ar/chat">Servidor BringFeel</option>
  </select>
  <div id="messages"></div>
  <div id="loading">
    Escribiendo<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
  </div>
  <div id="input-container">
    <input type="text" id="user-input" placeholder="Escribe un mensaje..." />
    <button id="send-btn">Enviar</button>
  </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const button = document.getElementById("chatbot-button");
        const chatBox = document.getElementById("chat-box");
        const messagesEl = document.getElementById("messages");
        const userInput = document.getElementById("user-input");
        const sendBtn = document.getElementById("send-btn");
        const loadingEl = document.getElementById("loading");
        const serverSelect = document.getElementById("server-select");

        // Abrir / cerrar chat
        button.addEventListener("click", () => {
            chatBox.classList.toggle("visible");
        });

        // Agregar mensajes
        function appendMessage(text, sender){
            const msgEl = document.createElement("div");
            msgEl.classList.add("message", sender);
            msgEl.textContent = text;
            messagesEl.appendChild(msgEl);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        // Enviar mensaje
        async function sendMessage() {
            const prompt = userInput.value.trim();
            if (!prompt) return;
            appendMessage(prompt, "user");
            userInput.value = "";
            sendBtn.disabled = true;
            loadingEl.style.display = "block";

            try {
            const res = await fetch(serverSelect.value, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({prompt})
            });

            if(!res.ok) throw new Error("Error API");

            const data = await res.json();
            appendMessage(data.response, "bot");

            } catch(err) {
            appendMessage("Ocurrió un error al contactar la IA.", "bot");
            console.error(err);

            } finally {
            loadingEl.style.display = "none";
            sendBtn.disabled = false;
            }
        }

        // Eventos
        sendBtn.addEventListener("click", sendMessage);
        userInput.addEventListener("keydown", (e) => { if(e.key === "Enter") sendMessage(); });
    });
</script>
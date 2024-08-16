 // Lista de emojis para nombres de usuario
        const emojiList = ['🦗', '🌟', '🚀', '🐱', '🎉', '🍀', '💬'];

        // Selecciona un emoji aleatorio
        function getRandomEmoji() {
            const randomIndex = Math.floor(Math.random() * emojiList.length);
            return emojiList[randomIndex];
        }

        // Sanitiza el nombre de usuario eliminando caracteres no alfanuméricos y otros peligrosos
        function sanitizeInput(input) {
            return input.replace(/[^\w\s\p{L}]/gu, '').trim(); // Mantiene letras, números y espacios
        }

        // Solicita el nombre de usuario al cargar la página
        let username = prompt('Por favor, ingresa tu nombre de usuario:');
        username = sanitizeInput(username); // Sanitiza la entrada del usuario
        if (!username) {
            username = getRandomEmoji(); // Usa un emoji aleatorio si no se proporciona un nombre
        }

        document.addEventListener('DOMContentLoaded', () => {
            const ws = new WebSocket('wss://grobchat.onrender.com'); // Asegúrate de usar 'wss' para WebSocket seguro

            ws.onopen = () => {
                console.log('Conectado al servidor WebSocket');
                ws.send(`Usuario conectado: ${username}`);
            };

            ws.onmessage = (event) => {
                const messagesDiv = document.getElementById('messages');
                const newMessage = document.createElement('div');
                newMessage.classList.add('message');

                // Verifica si el mensaje recibido es texto
                if (typeof event.data === 'string') {
                    newMessage.textContent = event.data; 
                    messagesDiv.appendChild(newMessage);
                } else if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newMessage.textContent = reader.result; 
                        messagesDiv.appendChild(newMessage);
                    };
                    reader.readAsText(event.data);
                }
            };

            document.getElementById('sendButton').onclick = () => {
                const messageInput = document.getElementById('messageInput');
                const message = messageInput.value;
                if (message) {
                    const formattedMessage = `${username}: ${message}`; // Usa el nombre de usuario
                    ws.send(formattedMessage);
                    messageInput.value = '';
                }
            };
        });

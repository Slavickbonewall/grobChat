 let username = prompt('Por favor, ingrese su nombre de usuario:'); 

        document.addEventListener('DOMContentLoaded', () => {
            const ws = new WebSocket('https://grobchat.onrender.com');

            ws.onopen = () => {
                console.log('Conectado al servidor WebSocket');
            };

            ws.onmessage = (event) => {
                const messagesDiv = document.getElementById('messages');
                const newMessage = document.createElement('div');
                newMessage.classList.add('message');

                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        newMessage.textContent = reader.result; 
                        messagesDiv.appendChild(newMessage);
                    };
                    reader.readAsText(event.data);
                } else {
                    newMessage.textContent = event.data; 
                    messagesDiv.appendChild(newMessage);
                }
            };

            document.getElementById('sendButton').onclick = () => {
                const messageInput = document.getElementById('messageInput');
                const message = messageInput.value;
                if (message) {
                    const formattedMessage = `${username}: ${message}`; 
                    ws.send(formattedMessage);
                    messageInput.value = '';
                }
            };
        });

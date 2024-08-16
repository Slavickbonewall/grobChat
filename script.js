document.addEventListener('DOMContentLoaded', () => {
     const ws = new WebSocket('wss://grobchat.onrender.com');

    ws.onopen = () => {
        console.log('Conectado al servidor WebSocket');
    };

    ws.onmessage = (event) => {
        const messagesDiv = document.getElementById('messages');
        const newMessage = document.createElement('div');

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
            ws.send(message);
            messageInput.value = '';
        }
    };
});

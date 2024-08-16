const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', ws => {
    console.log('Nuevo cliente conectado');

    ws.on('message', message => {
        console.log('Recibido:', message);
        
        // Enviar el mensaje a todos los clientes conectados
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Enviar un mensaje al cliente cuando se conecte
    ws.send('Bienvenido al chat!');
});

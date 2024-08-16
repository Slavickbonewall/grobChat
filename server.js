const WebSocket = require('ws');
const xss = require('xss');
const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });
server.on('connection', ws => {
    console.log('Nuevo cliente conectado');
    ws.on('message', message => {
        console.log('Recibido:', message);
        const sanitizedMessage = xss(message);
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(sanitizedMessage);
            }
        });
    });
    ws.send('Bienvenido a Un lugar sin censura');
});
console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);

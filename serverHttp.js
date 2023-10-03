const { Console } = require('console');
const http = require('http');

const server = http.createServer( (request, response) => {
    response.end('Hi')
});

const PORT = 3000;

server.listen(PORT, () => {
    Console.log(`>>>> server listening at port http://localhost:${PORT}`)
})
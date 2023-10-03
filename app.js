
const Package = require('./productManager')

const express = require('express');

const app = express();

const PORT = 3000;

const container = new Package('products.json');

app.get('/', (req, res) => {
    res.send('Express server online')
});

app.get('/products',async (req, res) => {
    const allProducts = await container.getAll();
    res.json(allProducts)
});

app.get('/ramdomProduct', async (req, res) => {
    const allProducts = await container.getAll();
    const maxId = allProducts.length;

    const randomNumber = generateRandomNumber(1, maxId);
    const randomProduct = await container.getById(randomNumber);

    res.json(randomProduct);
});

app.get('/albums', (req, res) => {
    res.send("you are at albums")
});

app.get('/object', (req, res) => {
    res.json({title: "text for the service", code: "20x0"})
});


const generateRandomNumber = (min, max) => {
    return Math.floor((math.random() * (max + 1 - min)) + min);
}

const server = app.listen(PORT, () => {
    console.log(`>>>> servert started at http://localhost:${PORT}`)
});

server.on('error', (error) => console.log(error))


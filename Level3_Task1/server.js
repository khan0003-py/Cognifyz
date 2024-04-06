const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample data (replace with your actual data source)
let items = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the index.html file
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Endpoint to get a single item by ID
app.get('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

// Endpoint to add a new item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Endpoint to update an existing item
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
});

// Endpoint to delete an item
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

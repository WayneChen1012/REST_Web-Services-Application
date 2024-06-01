const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

const apiUrl = 'https://seat.tpml.edu.tw/sm/service/getAllArea';

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

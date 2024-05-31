const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

const API_KEY = 'CXX8QETFB9P8D9BX';
const BASE_URL = 'https://www.alphavantage.co/query';

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

app.get('/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

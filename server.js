const express = require('express'); // 引入express框架
const axios = require('axios'); // 引入axios庫，用於發送HTTP請求
const path = require('path'); // 引入path模塊，用於處理和轉換文件路徑
const app = express(); // 創建express應用實例
const PORT = 3000; // 定義服務器運行的端口號

// Open data from the Web ==> 警廣即時路況數據URL
const apiUrl = 'https://data.moi.gov.tw/MoiOD/System/DownloadFile.aspx?DATA=36384FA8-FACF-432E-BB5B-5F015E7BC1BE';

// 設置靜態文件夾，使public文件夾中的文件可以被訪問
app.use(express.static(path.join(__dirname, 'public')));

// 定義API端點，當客戶端請求/api/data時，服務器將從apiUrl獲取數據並返回
app.get('/api/data', async (req, res) => {
    try {
        // 發送GET請求到apiUrl，獲取警廣即時路況數據
        const response = await axios.get(apiUrl);
        // 將獲取到的數據作為JSON返回給客戶端
        res.json(response.data);
    } catch (error) {
        // 如果請求失敗，返回500狀態碼和錯誤信息
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// 啟動服務器，監聽指定的端口
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

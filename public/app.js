async function fetchTrafficData() {
  const output = document.getElementById('output'); // 獲取用於顯示數據的表格體
  const apiUrl = '/api/data'; // 定義API端點的URL

  try {
      // 發送GET請求到API端點以獲取數據
      const response = await fetch(apiUrl);
      // 如果響應不正常，拋出錯誤
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      // 將響應轉換為JSON格式
      const data = await response.json();
      console.log(data); // 打印返回的數據到控制台
      // 調用displayData函數顯示數據
      displayData(data);
  } catch (error) {
      // 如果發生錯誤，顯示錯誤信息
      output.innerHTML = '<tr><td colspan="5">Failed to fetch data: ' + error.message + '</td></tr>';
  }
}

function formatTime(timeStr) {
  // 假設時間格式為 "HH:mm:ss.SSSSSSS"
  const [time, ] = timeStr.split('.'); // 只保留 "HH:mm:ss" 部分
  return time;
}

function displayData(data) {
  const output = document.getElementById('output'); // 獲取用於顯示數據的表格體
  output.innerHTML = ''; // 清空表格體中的現有內容

  // 檢查數據是否為數組
  if (Array.isArray(data)) {
      // 遍歷數據數組，為每個項目創建一個表格行
      data.forEach(item => {
          const row = document.createElement('tr'); // 創建表格行
          row.innerHTML = `
              <td>${item.region}</td>
              <td>${item.areaNm}</td>
              <td>${item.road}</td>
              <td>${formatTime(item.happentime)}</td> <!-- 格式化時間 -->
              <td>${item.comment}</td>
          `;
          output.appendChild(row); // 將表格行添加到表格體中
      });
  } else {
      // 如果數據不是數組，顯示無數據或格式錯誤信息
      output.innerHTML = '<tr><td colspan="5">No data available or incorrect data format</td></tr>';
  }
}

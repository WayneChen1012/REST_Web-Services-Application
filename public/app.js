async function fetchTrafficData() {
  const output = document.getElementById('output');
  const apiUrl = '/api/data';

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data); // 打印返回的數據到控制台
      displayData(data);
  } catch (error) {
      output.innerHTML = '<tr><td colspan="5">Failed to fetch data: ' + error.message + '</td></tr>';
  }
}

function formatTime(timeStr) {
  // 假設時間格式為 "HH:mm:ss.SSSSSSS"
  const [time, ] = timeStr.split('.'); // 只保留 "HH:mm:ss" 部分
  return time;
}

function displayData(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  if (Array.isArray(data)) {
      data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.region}</td>
              <td>${item.areaNm}</td>
              <td>${item.road}</td>
              <td>${formatTime(item.happentime)}</td> <!-- 格式化時間 -->
              <td>${item.comment}</td>
          `;
          output.appendChild(row);
      });
  } else {
      output.innerHTML = '<tr><td colspan="5">No data available or incorrect data format</td></tr>';
  }
}

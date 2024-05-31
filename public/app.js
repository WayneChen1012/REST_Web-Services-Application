async function fetchStockData() {
    const symbol = document.getElementById('symbol').value;
    const output = document.getElementById('output');
    try {
      const response = await fetch(`/stock/${symbol}`);
      const data = await response.json();

      // 確認數據格式
      if (data['Meta Data'] && data['Time Series (1min)']) {
        output.textContent = JSON.stringify(data, null, 2);

        // 提取並處理數據
        const timeSeries = data['Time Series (1min)'];
        const labels = Object.keys(timeSeries).reverse();
        const prices = labels.map(label => parseFloat(timeSeries[label]['4. close']));

        // 繪製圖表
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: `${symbol} Stock Price`,
              data: prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'minute'
                }
              }
            }
          }
        });
      } else {
        output.textContent = 'No data available for this symbol.';
      }
    } catch (error) {
      output.textContent = 'Failed to fetch data';
    }
  }

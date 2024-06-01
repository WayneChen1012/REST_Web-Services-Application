async function fetchLibraryData() {
  const output = document.getElementById('output');
  const apiUrl = '/api/data';

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      displayData(data);
  } catch (error) {
      output.innerHTML = '<tr><td colspan="5">Failed to fetch data: ' + error.message + '</td></tr>';
  }
}

function displayData(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';
  data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${item.branchName}</td>
          <td>${item.floorName}</td>
          <td>${item.areaName}</td>
          <td>${item.freeCount}</td>
          <td>${item.totalCount}</td>
      `;
      output.appendChild(row);
  });
}

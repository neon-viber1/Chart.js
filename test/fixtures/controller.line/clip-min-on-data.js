module.exports = {
  config: {
    type: 'line',
    data: {
      labels: [1, 2, 3, 4, 5, 6],
      datasets: [{
        data: [0, 30, 50, 0, 20, 70],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        pointRadius: 15
      }]
    },
    options: {
      animation: false,
      plugins: false,
      scales: {
        x: {display: false},
        y: {display: false, min: 0, max: 70}
      }
    }
  },
  options: {
    canvas: {height: 256, width: 512}
  }
};

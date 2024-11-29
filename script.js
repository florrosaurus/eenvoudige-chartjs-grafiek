fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // sla header over
        const labels = [];
        const values = [];

        rows.forEach(row => {
            const [jaar, waarde] = row.split(',');
            labels.push(jaar.trim());
            values.push(Number(waarde.trim()));
        });

        const ctx = document.getElementById('mijnGrafiek').getContext('2d');
        new Chart(ctx, {
            type: 'line', 
            data: {
                labels: labels,
                datasets: [{
                    label: 'Waarden/Jaar',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('fout bij het laden CSV:', error));
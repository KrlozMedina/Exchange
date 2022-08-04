function hystoryCoin(coin, id) {
    const today = parseFloat(coin[id].price);
    const info = [
        today - parseFloat(coin[id].ytd.price_change),
        today - parseFloat(coin[id]['365d'].price_change),
        today - parseFloat(coin[id]['30d'].price_change),
        today - parseFloat(coin[id]['7d'].price_change),
        today - parseFloat(coin[id]['1d'].price_change),
        today
    ]

    const labels = [
        '1 año',
        '365 dias',
        '30 dias',
        '7 dias',
        '1 dia',
        'hoy',
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: coin[id].name,
            backgroundColor: 'orange',
            borderColor: 'black',
            data: info,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {

        }
    };

    const section = document.querySelector('.chart');

    const div = document.createElement('div');
    section.appendChild(div);
    
    const canvas = document.createElement('canvas');
    // canvas.classList = 'myChart';
    canvas.classList = `myChart${id}`;
    div.appendChild(canvas);

    const myChart = new Chart(
        document.querySelector(`.myChart${id}`),
        config
    );
}
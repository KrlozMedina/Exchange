const time = ['ytd', `365d`, `30d`, `7d`, `1d`];

function getDay (today, coin) {
    const days = [];
    for (let i = 0; i < time.length; i++) {
        if (coin[time[i]] == undefined) {
            console.log(`No se determina ${time[i]}, la moneda es ${coin.name}`)
            days.push(null);
        } else {
            days.push(today - parseFloat(coin[time[i]].price_change));
        }
    }
    days.push(today);
    return days;
}

function hystoryCoin(coin, id, section) {
    const today = parseFloat(coin[id].price);
    const info = getDay(today, coin[id]);

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
        // datasets: [{
        //     type: 'bar',
        //     label: 'Bar Dataset',
        //     backgroundColor: 'orange',
        //     data: info
        // }, {
        //     type: 'line',
        //     label: 'Line Dataset',
        //     backgroundColor: 'black',
        //     data: info,
        // }],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            barThickness: 10,
            base: 100
        }
    };


    const div = document.createElement('div');
    section.appendChild(div);
    
        const logo = document.createElement('img');
        logo.src = coin[id].logo_url;
        div.appendChild(logo)

    const canvas = document.createElement('canvas');
    // canvas.classList = 'myChart';
    canvas.classList = `myChart${id}`;
    div.appendChild(canvas);
    
    const lastUpdate = document.createElement('p');
    lastUpdate.textContent = `Ultima actualizacion: ${coin[id].price_timestamp}`
    div.appendChild(lastUpdate);

    const myChart = new Chart(
        document.querySelector(`.myChart${id}`),
        config
    );
}
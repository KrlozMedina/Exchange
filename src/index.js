const API_KEY = '?key=33aca821b20830c1c9dd639ffd4fc82ae99e49fc';
const API = 'https://api.nomics.com/v1';
const EndPoint = '/currencies/ticker';

// id = BTC,ETH,XRP
// interval = 1d,30d
// convert = EUR
// status = dead
// platform = ETH
// per-page = 50 max. 100 min. 1
// page = 1

async function getCoins() {
    const id = '';
    const currency = document.getElementById('convert').value;
    const interval = '';
    const status = document.getElementById('status').value;
    const platform = '';
    const sort = 'rank';
    const perPage = '100';
    const page = '1'; //Max 133

    const res = await fetch(`${API+EndPoint+API_KEY}&ids=${id}&convert=${currency}&interval=${interval}&status=${status}&platform-currency=${platform}&sort=${sort}&per-page=${perPage}&page=${page}`)
    const data = await res.json();

    // console.log(data);
    
    data.sort((a, b) => {
        return b.price - a.price;
    });

    const datos = [];
    for (let i = 0; i < data.length; i++) {
        datos[i] = data[i].price;
    }

    topCoin(data, convertCoin(datos, currency), 5);

    const section = document.querySelector('.chart');
    section.innerHTML = '';

    for (let i = 0; i < document.getElementById('limit').value; i++) {
        hystoryCoin(data, i, section);
    }
}

function convertCoin(data, currency) {
    // console.log(data)
    switch (currency) {
        case 'COP':
            code = 'es-CO'
            break;
        case 'USD':
            code = 'en-US'
            break;
        case 'EUR':
            code = 'de-DE'
            break;
        case 'JPY':
            code = 'ja-JP'
            break;
        default:
            code = 'es-CO'
            break;
    }

    const formatter = new Intl.NumberFormat(code, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    })

    // const coin = [...data];

    for (i = 0; i < data.length; i++) {
        data[i] = formatter.format(data[i]);
    }

    return data;
}

function topCoin(coin, datos, limit){
    const container = document.querySelector('.top');
    container.innerHTML = '';

    for (let i = 0; i < limit; i++) {
        const article = document.createElement('article');
        article.classList = 'cripto';
        container.appendChild(article);
        
        const div = document.createElement('div');
        div.classList = 'logo-name';
        article.appendChild(div);

        const logo = document.createElement('img');
        logo.classList = 'logoCripto';
        logo.src = coin[i].logo_url;
        div.appendChild(logo);

        const name = document.createElement('h1');
        name.classList = 'nameCripto';
        name.textContent = coin[i].symbol;
        div.appendChild(name)


        const price = document.createElement('p');
        price.classList = 'priceCripto';
        price.textContent = datos[i];
        article.appendChild(price);
    }
}

getCoins()
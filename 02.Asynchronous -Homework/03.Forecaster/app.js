
function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather);
}

attachEvents();

async function getWeather() {
try{
    let divElementError = document.getElementById('current')
    divElementError.firstChild.textContent = ''
    const divCurrent = document.getElementById('current')
    const divForecast = document.getElementById('upcoming')
    let el1 = document.getElementsByClassName('forecasts')[0]
    let el2 = document.getElementsByClassName('forecast-info')[0]

    if (el1 != undefined){
        el1.remove()
        el2.remove()
    }
    
    const input = document.getElementById('location');
    const cityName = input.value;

    const code = await getCode(cityName);
    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ])

    const divDisplay = document.getElementById('forecast')
    divDisplay.style.display = "block"

    element = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    }

    const divCurrentElement = newE('div', { className: 'forecasts' },
        newE('span', { className: 'condition symbol' }, `${element[current.forecast.condition]}`),
        newE('span', { className: 'condition' },
            newE('span', { className: 'forecast-data' }, current.name),
            newE('span', { className: 'forecast-data' }, `${current.forecast.low}°/${current.forecast.high}°`),
            newE('span', { className: 'forecast-data' }, current.forecast.condition)))
        
    divCurrent.appendChild(divCurrentElement)
    if (el1 != undefined){
        if(el1.style.display == 'none'){
            el1.style.display = 'inline-block'
        }  
    }

    const divForecastElement = newE('div', { className: 'forecast-info' },
        newE('span', { className: 'upcoming' },
            newE('span', { className: 'symbol' }, `${element[upcoming.forecast[0].condition]}`),
            newE('span', { className: 'forecast-data' }, `${upcoming.forecast[0].low}°/${upcoming.forecast[0].high}°`),
            newE('span', { className: 'forecast-data' }, upcoming.forecast[0].condition)), newE('span', { className: 'upcoming' },
                newE('span', { className: 'symbol' }, `${element[upcoming.forecast[1].condition]}`),
                newE('span', { className: 'forecast-data' }, `${upcoming.forecast[1].low}°/${upcoming.forecast[1].high}°`),
                newE('span', { className: 'forecast-data' }, upcoming.forecast[1].condition)), newE('span', { className: 'upcoming' },
                    newE('span', { className: 'symbol' }, `${element[upcoming.forecast[2].condition]}`),
                    newE('span', { className: 'forecast-data' }, `${upcoming.forecast[2].low}°/${upcoming.forecast[2].high}°`),
                    newE('span', { className: 'forecast-data' }, upcoming.forecast[2].condition)))

    divForecast.appendChild(divForecastElement)
}catch(error){
    let divElementError = document.getElementById('current')
    divElementError.firstChild.textContent = 'Error'
}
}

async function getCode(cityName) {
        const url = "http://localhost:3030/jsonstore/forecaster/locations";
    
        const response = await fetch(url);
        const data = await response.json();
    
        return data.find(x => x.name.toLowerCase() == cityName.toLowerCase()).code;
}

async function getCurrent(code) {
    const url = "http://localhost:3030/jsonstore/forecaster/today/" + code;

    const response = await fetch(url);
    const data = await response.json();

    return data
}

async function getUpcoming(code) {
    const url = "http://localhost:3030/jsonstore/forecaster/upcoming/" + code;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function newE(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
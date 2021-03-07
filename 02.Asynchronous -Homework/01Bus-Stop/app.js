async function getInfo() {
    const input = document.getElementById('stopId');
    const id = input.value;

    const url = "http://localhost:3030/jsonstore/bus/businfo/" + id;

    try {
        const ulElement = document.getElementById('buses');
        ulElement.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('stopName').textContent = data.name;

        Object.entries(data.buses).map(([bus, time]) => {
            const result = document.createElement("li")
            result.textContent = `Bus ${bus} arrives in ${time} minutes`;

            ulElement.appendChild(result);
        })

        input.value = '';
    } catch (error) {
        document.getElementById('stopName').textContent = 'Error'
    }

    console.log(data);
}


// {
// "1287":{"buses":{"76":15,"84":10,"204":10,"213":18,"280":9,"306":31,"604":11},"name":"Orlov Most sq."},
// "1308":{"buses":{"4":13,"12":6,"18":7},"name":"St. Nedelya sq."},
// "1327":{"buses":{"78":18,"85":20,"213":18,"285":20,"305":18,"404":18,"413":16},"name":"Central Train Station sq."},
// "2334":{"buses":{"20":11,"22":4},"name":"Centralni Hali"}
// }
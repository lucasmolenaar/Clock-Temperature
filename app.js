//TEMPRETURE CODE
window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/76505efc999fa1021e28fa37a860c4b2/${lat},${long}`

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    const temp = document.querySelector('.temp');
                    const city = document.querySelector('.city');
                    const desc = document.querySelector('.desc');
                    const fahrenheit = data.currently.temperature.toFixed(0);
                    const celsius = (fahrenheit - 32) / 1.8;

                    city.innerHTML = data.timezone;
                    temp.innerHTML = `${celsius}°C`;
                    desc.innerHTML = data.currently.summary;
                })
        });
    }
});

//CLOCK CODE
setInterval(setClock, 1000);

const hourHand = document.querySelector('[data-hour-hand');
const minuteHand = document.querySelector('[data-minute-hand');
const secondHand = document.querySelector('[data-second-hand');

function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock();
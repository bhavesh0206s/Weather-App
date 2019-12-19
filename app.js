const temp = document.querySelector(".temperature-degree");
const tempUnit = document.querySelector(".temp-unit");
const tempDescription = document.querySelector(".temperature-description");
const locationTimezone = document.querySelector(".location-timezone");

window.addEventListener("load", () => {
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positon =>{
            let long = positon.coords.longitude;
            let lat = positon.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/1b5fff2786faacff6a7c2da013e77098/${lat},${long}`;

            fetch(api)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                temp.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                console.log(document.querySelector("#icon"))
                setIcons(icon, document.querySelector("#icon"))
                temp.addEventListener("click", changeTempUnit)
            })
            .catch(err =>{
                temp.textContent = "API ERROR";
                tempUnit.textContent = "";
            })
        })
    }

    const changeTempUnit = ()=>{
        const currentTemp = Number(temp.textContent)
        if(tempUnit.textContent === "F"){
            const tempCelcius = (currentTemp - 32) / 1.8;
            temp.textContent = (Math.round( tempCelcius * 10 ) / 10).toFixed(2); 
            tempUnit.textContent ="C";
        }
        else{
            const tempFahrenheit = (currentTemp * 1.8) + 32;
            temp.textContent = tempFahrenheit
            tempUnit.textContent = "F";
        }
    }
    
    const setIcons = (icon, iconId) =>{
        const skycons = new Skycons({"color":"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=e563433c38bb418dacb24625221405&q=${lat}&${long}
            `;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                // console.log(data);
                //array named current that contains the temp
                const {temp_f} = data.current;
                const {text} = data.current.condition;
                const {tz_id} = data.location;
                const {icon} = data.current.condition;
                //Set DOM Elmements from the API
                temperatureDegree.textContent = temp_f;
                temperatureDescription.textContent = text;
                locationTimezone.textContent = tz_id;
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'));
            });
        });


    }
    //Icons
    function setIcons(icon, iconID){
      const skycons = new Skycons({color: "white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);  
    }
});
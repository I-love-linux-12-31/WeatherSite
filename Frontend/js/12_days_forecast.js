var today_forecast_met_no_12 = null;
var other_days_forecast_met_no_12 = null;
var met_no_12_ready = false;



function getMonthName(monthNumber) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[monthNumber];
}


function zeroPad(num, numZeros) {
    let n = Math.abs(num);
    let zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    let zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}

function POSIXtoUserTime(posixTime) {

  let userTime = new Date(0);
  userTime.setUTCSeconds(posixTime)
  // console.log(epoch.getDate())
  // // const userTime = new Date(epoch.getTime() + (epoch.getTimezoneOffset() * 60 * 1000));
  // let userTime = epoch;
  // console.log(userTime.toTimeString())
  return userTime
}

function formatTime(userTime){
  return [zeroPad(userTime.getHours(), 2), zeroPad(userTime.getMinutes(), 2)].join(' : ') + " \n" + userTime.getDate() + " of " + getMonthName(userTime.getMonth()) + ' ' +  userTime.getFullYear();
}


function get_12_days_forecast(location, lat, lon) {
  const apiUrl = `http://yk-hosted-12-31.ydns.eu:9381/v1.0/met_no_12` + `?location=${encodeURIComponent(location)}&lat=${lat}&lon=${lon}`;

  const xhr = new XMLHttpRequest();

  xhr.open("GET", apiUrl, true);

  xhr.send();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the JSON data
      const response = JSON.parse(xhr.responseText);
      today_forecast_met_no_12 = response["today"];
      other_days_forecast_met_no_12 = response["other_days"];
      setTimeout(apply_12_days_forecast, 0.1);
      loader_indicator.parentNode.removeChild(loader_indicator);
      alert("OK")

    }
    else {
      if (xhr.readyState === 4) {
        alert("[" + xhr.status + "]\nSorry, but forecast server unavailable now.\nTry later on contact administrator: Yaroslav-k-12-31@yandex.com")
      } else {

      }
    }
  };
}


function apply_12_days_forecast(){
  // alert(today_forecast_met_no_12[0] + " \n" + POSIXtoUserTime(today_forecast_met_no_12[0]))
    let host = document.createElement("div");
    host.classList.add("forecast-12-days-cards-block")
    forecast_12_days_met_no_cards_host.appendChild(host);

    // sort
    for (let j = 0; j < today_forecast_met_no_12[1].length; j++)
    {
        for (let i = 0; i < today_forecast_met_no_12[1].length - 1; i++){
            if (today_forecast_met_no_12[1][i] > today_forecast_met_no_12[1][i + 1]) {
                let temp = today_forecast_met_no_12[1][i];
                today_forecast_met_no_12[1][i] = today_forecast_met_no_12[1][i + 1];
                today_forecast_met_no_12[1][i + 1] = temp;
            }
        }
    }

    for (let i = 0; i < today_forecast_met_no_12[1].length; i++)
    {
        let item = today_forecast_met_no_12[1][i];
        // 0 - unix times
        // 1 - img_name
        // 2 - temperature
        // 3 - wind

        let div = document.createElement("div");
        div.classList.add("weather-card-big-horizontal");
        div.classList.add("weather-card-big-week");
        div.style.backgroundColor = "rgba(5,114,148,0.74)";
        let img = document.createElement("img");
        img.classList.add("weather-card-big-image");
        img.src = "/3rdParty/FreeIcons/weather-none-available.svg"
        img.alt = "*Image*"
        div.appendChild(img);

        let text_1 = document.createElement("p");
        text_1.innerText = item[2] + " ℃ \n" + item[3] + " m/s";

        let header = document.createElement("p");

        // header.style.position = "absolute";
        // header.style.top = "-6px";
        // header.style.left = "-6px";
        header.style.display = "flex";
        header.style.textAlign = "start";

        // header.style.alignContent = "start";
        // header.style.justifyContent = "start";
        // header.style.alignItems = "start";
        // header.style.justifyItems = "start";
        header.innerText = formatTime(POSIXtoUserTime(item[0]));
        header.style.marginRight = "8px";
        div.appendChild(header)


        div.appendChild(text_1);



        host.appendChild(div);
        // <img className="weather-card-big-image" src="3rdParty/FreeIcons/weather-none-available.svg" alt="*Image*">
        //     <p>*Dayname*</p>

    }

    for (let i = 0; i < other_days_forecast_met_no_12.length; i++)
    {
        add_block_for_12_days_forecast(other_days_forecast_met_no_12[i]);
    }
}

function add_block_for_12_days_forecast(block_data){
  // alert(today_forecast_met_no_12[0] + " \n" + POSIXtoUserTime(today_forecast_met_no_12[0]))
    let host = document.createElement("div");
    host.classList.add("forecast-12-days-cards-block")
    forecast_12_days_met_no_cards_host.appendChild(host);

    // sort
    for (let j = 0; j < block_data[1].length; j++)
    {
        for (let i = 0; i < block_data[1].length - 1; i++){
            if (block_data[1][i] > block_data[1][i + 1]) {
                let temp = block_data[1][i];
                block_data[1][i] = block_data[1][i + 1];
                block_data[1][i + 1] = temp;
            }
        }
    }

    for (let i = 0; i < block_data[1].length; i++)
    {
        let item = block_data[1][i];
        // 0 - unix times
        // 1 - img_name
        // 2 - temperature
        // 3 - wind

        let div = document.createElement("div");
        div.classList.add("weather-card-big-horizontal");
        div.classList.add("weather-card-big-week");
        let img = document.createElement("img");
        img.classList.add("weather-card-big-image");
        img.src = "/3rdParty/FreeIcons/weather-none-available.svg"
        img.alt = "*Image*"
        div.appendChild(img);

        let text_1 = document.createElement("p");
        text_1.innerText = item[2] + " ℃ \n" + item[3] + " m/s";

        let header = document.createElement("p");

        header.style.display = "flex";
        header.style.textAlign = "start";
        header.innerText = formatTime(POSIXtoUserTime(item[0]));
        header.style.marginRight = "8px";
        div.appendChild(header)

        div.appendChild(text_1);

        host.appendChild(div);

    }
}

setTimeout(() => {get_12_days_forecast("Moscow", 55.683943, 37.551963)}, 0.6)
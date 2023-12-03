var forecast = null
var daily_forecast = []
var common_forecast = []


function apply_main_page_forecast(){
    if (forecast_met_no_10 === null)
    {
        // alert("ERR 1.");
        setTimeout(apply_main_page_forecast, 0.3);
        return;
    }
    // sort
    for (let j = 0; j < forecast_met_no_10.length; j++)
    {
        for (let i = 0; i < forecast_met_no_10.length - 1; i++){
            if (forecast_met_no_10[i] > forecast_met_no_10[i + 1]) {
                let temp = forecast_met_no_10[i];
                forecast_met_no_10[i] = forecast_met_no_10[i + 1];
                forecast_met_no_10[i + 1] = temp;
            }
        }
    }

    let now = new Date();

    let count = 0;
    let av_temperature = 0;
    let av_wind_speed = 0;
    for (let i = 0; i < forecast_met_no_10.length; i++)
    {
        let item = forecast_met_no_10[i];
        // 0 - unix times
        // 1 - img_name
        // 2 - temperature
        // 3 - wind
        if (POSIXtoUserTime(item[0]).getDate() === now.getDate())
        {
            let div;
            if (count === 0)
                div = main_page_today_forecast_host_first_item;
            else
                div = document.createElement("div");
            div.classList.add("weather-card-big-horizontal");
            let img = document.createElement("img");
            img.classList.add("weather-card-big-image");
            img.src = "/icons/met_no_api?weather=" + encodeURIComponent(item[1]["symbol_code"]);
            img.alt = item[1]["symbol_code"];
            div.appendChild(img);

            let text_1 = document.createElement("p");
            text_1.innerText = item[2] + " ℃ " + item[3] + " m/s";

            av_wind_speed += item[3];
            av_temperature += item[2];

            let header = document.createElement("p");

            header.style.display = "flex";
            header.style.textAlign = "start";
            header.innerText = formatTime(POSIXtoUserTime(item[0])).replace('\n', " ");
            // console.log("* " + header.innerText )
            header.style.marginRight = "16px";
            div.appendChild(header)
            div.appendChild(text_1);

            // console.log("***")
            main_page_today_forecast_host.appendChild(div);

            count += 1;

        }

    }

    let h2 = document.createElement("h2");
    h2.innerText = "today"
    main_page_today_forecast_average_info_host.appendChild(h2);

    let div = document.createElement("div");
    div.classList.add("weather-card-big-horizontal");
    let img = document.createElement("img");
    img.classList.add("weather-card-big-image");
    img.alt = forecast_met_no_10[0]["symbol_code"];
    img.src = "/icons/met_no_api?weather=" + encodeURIComponent(forecast_met_no_10[0][1]["symbol_code"]);
    div.appendChild(img);

    let text_1 = document.createElement("p");
    text_1.innerText = "Temperature: " + av_temperature / count + " ℃";

    div.appendChild(text_1);
    main_page_today_forecast_average_info_host.appendChild(div)


    div = document.createElement("div");
    div.classList.add("weather-card-big-horizontal");
    img = document.createElement("img");
    img.classList.add("weather-card-big-image");
    img.src = "/icons/met_no_api?weather=windy";
    img.alt = forecast_met_no_10[0]["symbol_code"];
    div.appendChild(img);
    let text_2 = document.createElement("p");
    text_2.innerText = "Wind speed: " + av_wind_speed / count + " m/s";
    div.appendChild(text_2);

    main_page_today_forecast_average_info_host.appendChild(div)
}


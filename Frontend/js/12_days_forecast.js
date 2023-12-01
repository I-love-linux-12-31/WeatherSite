function apply_forecast(){
    fetch(HTTP_FORECAST_API_SERVER_HOST)  .then((response) => {
    return response.json();
  })
  .then((data) => {
      if (data.ok)
        alert(data["today"]);
  });
}

setTimeout(apply_forecast, 0.6)
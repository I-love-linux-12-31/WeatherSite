console.log("JS working.")

const successCallback = (position) => {
  // console.log(position);
  // console.log("!!!", location_input)
  // alert('Your position [navigator]: ' + position.coords.latitude + ';' + position.coords.longitude);
  // location_input.setAttribute("value", "" + position.coords.latitude + ';' + position.coords.latitude);
  location_input.value = "" + position.coords.latitude + ';' + position.coords.longitude;
  setTimeout(
  () => {
    getForecastFunction("", position.coords.latitude, position.coords.longitude);
  }, 0.1
)

};

const errorCallback = (error) => {
  console.log(error);
  getGeoIP();
};

 // Disabled geolocation todo: make gui
try {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
catch (e){
  // navigator not available. MB Tor used.

  setTimeout(() => {errorCallback("Navigator not available. MB Tor used.");}, 0.7);
}


function getGeoIP() {
  var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
  };

  getJSON('http://ipwho.is/',
      function (err, data) {
        if (err !== null) {
          alert('GeoIP: Something went wrong: ' + err + "\nContact administrator: Yaroslav-k-12-31@yandex.com");
        } else {
          // alert('Your city: ' + data["city"]);
          console.log(data)
          location_input.value = data["city"]
          setTimeout(
            () => {
              getForecastFunction(data["city"], data["latitude"], data["longitude"]);
            }, 0.1
          )

        }
      });

}
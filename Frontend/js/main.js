console.log("JS working.")

const successCallback = (position) => {
  // console.log(position);
  // console.log("!!!", location_input)
  // alert('Your position [navigator]: ' + position.coords.latitude + ';' + position.coords.longitude);
  // location_input.setAttribute("value", "" + position.coords.latitude + ';' + position.coords.latitude);
  location_input.value = "" + position.coords.latitude + ';' + position.coords.longitude;
  // location_input.innerText = "" + position.coords.latitude + ';' + position.coords.latitude;
};

const errorCallback = (error) => {
  console.log(error);
};

 // Disabled geolocation todo: make gui
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
/*
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
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
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('Your city: ' + data["city"]);
  }
});*/
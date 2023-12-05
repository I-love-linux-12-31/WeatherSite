var moonStatuses = new Map();

function getMoonPhase(day, month, year){
  let date = "" + day + '.' + month + '.' + year;
  const apiUrl = `http://yk-hosted-12-31.ydns.eu:9381/v1.0/moon_phases` + "?date=" + encodeURIComponent(date);

  const xhr = new XMLHttpRequest();

  xhr.open("GET", apiUrl, true);

  xhr.send();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = xhr.responseText;
      console.log("MOON API get: " + response)
      moonStatuses[date] = response;
      console.log("MOON API [" + date + "] :" + moonStatuses[date])
        // if (! no_apply_forecast)
        //     setTimeout(apply_12_days_forecast, 0.1);


    }
    else {
      if (xhr.readyState === 4) {
        // alert("[" + xhr.status + "]\nSorry, but forecast server unavailable now.\nTry later on contact administrator: Yaroslav-k-12-31@yandex.com");
        // window.location.href("/503");
        window.location.replace("/503");

      } else {

      }
    }
  };
}

function createCalendar(elem, year, month) {
  month_title.innerHTML = getMonthName(month) + " " + year;

  let date = new Date(year, month - 1);
  let table = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>';
  while (date.getMonth() === month - 1) {
    table += '<tr>';
    for (let i = 0; i < 7; i++) {
      if (date.getDay() === i && date.getMonth() === month - 1) {
        // getMoonPhase(date.getDate(), month, year)
        let status = moonStatuses[date.getDate() + '.' + month + '.' + year];
        if (status === undefined) {
          status = "🌐";
        }
        if (date.getDate() === date_now.getDate())
          table += '<td style="color: #fc894d; font-weight: bold;">' + date.getDate() + " " + status + '</td>';
        else
          table += '<td>' + date.getDate() + " " + status + '</td>';



        date.setDate(date.getDate() + 1);
      } else {
        table += '<td style="background-color: rgba(2,158,255,0.22)"></td>';
      }
    }
    table += '</tr>';
  }
  table += '</table>';
  elem.innerHTML += table;
}


function loadMoonPhases(elem, year, month) {
  let date = new Date(year, month - 1);
  while (date.getMonth() === month - 1) {
    for (let i = 0; i < 7; i++) {
      if (date.getDay() === i && date.getMonth() === month - 1) {
        // moonStatuses[date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()] = "❌";
        getMoonPhase(date.getDate(), month, year)
        date.setDate(date.getDate() + 1);
      }
    }
  }
  setTimeout(() => {
     try {
            loader_indicator.parentNode.removeChild(loader_indicator);
     }
     catch (e){}
    createCalendar(elem, year, month);
  }, 850)
}
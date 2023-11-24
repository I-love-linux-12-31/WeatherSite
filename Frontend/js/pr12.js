var t12_notify_counter = 0


function send_notification(){
    t12_notify_counter += 1;
    let item = document.createElement("p");
    item.innerHTML = t12_notify_counter.toString() + ") Notification text ...";
    item.style.display = "block";
    t12_notifications_host.appendChild(item)
    t12_notification_counter_p.innerHTML = t12_notify_counter.toString()
}

var sendNotificationInterval


function init_notification_spam(){
    sendNotificationInterval = setInterval(send_notification, 3000)
}

function stop_spam() {
  clearInterval(sendNotificationInterval); // Clear the interval that calls send_notification()
  setTimeout(() => {
    sendNotificationInterval = setInterval(() => {
      send_notification();
    }, 3000); // Reset the interval to call send_notification() every 3 seconds after 10 seconds
  }, 10000);
}


function sendNotification(text){
    let div = document.createElement("div");
    let item = document.createElement("p");
    div.appendChild(item)
    div.classList.add("t12-notification")
    item.innerHTML = text;
    t12_notifications_section.appendChild(div);
    setTimeout(() => {t12_notifications_section.removeChild(div);}, 5000);
}

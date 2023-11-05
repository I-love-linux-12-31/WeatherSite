//alert("Message")
// function reg_accepted() {
//   console.log('Reg accepted');
//   // var sheet = document.styleSheets[1];
//   // sheet.disabled = !sheet.disabled;
//
//
// }

function main() {
  let answer = prompt("Хотите зарегистрироваться?");
  if ( "да" === answer.toLowerCase())
  {
    alert("Круто!")
  }
  else {
    alert("Попробуй ещё раз.")
  }
  answer = prompt("login: ")
  if (answer === null)
  {
    alert("Отменено")
  }
  else if (answer.toLowerCase() === "админ") {
    let password = prompt("password: ");
    if (password === null)
    {
      alert("Отменено")
    }
    else if (password === "Я главный"){
      alert("Здравствуйте!")
    }
    else {
      alert("Неверный пароль")
    }



  }
  else{
    alert("Я вас не знаю")
  }


}


document.addEventListener("mousemove", function(event) {
  if (!draw_mode)
  {
    return;
  }

  // Get mouse coordinates
  let x = event.clientX;
  let y = event.clientY + 32;

  // Create new div element
  let newDiv = document.createElement("div");

  // Set position of new div element
  newDiv.style.position = "absolute";
  newDiv.style.top = y + "px";
  newDiv.style.left = x + "px";

  // Add content and styling to new div element
  newDiv.innerHTML = "New element";
  newDiv.style.backgroundColor = "red";
  newDiv.style.color = "white";

  // Append new div element to document
  document.body.appendChild(newDiv);
});
var captcha_math_mode = false;
var captcha_solution = null;
var captcha_passed = false;


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getTextCaptchaData() {
    let size = Math.floor(Math.random() * 16) % 7;
    if (size < 4)
      size = 4;
    const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#@!$%&*';
    let data = '';
    for (let i = 0; i < size; i++) {
      data += letters[Math.floor(Math.random() * 64)];
    }
    captcha_solution = data;
    return data;
}

function getMathCaptchaData() {
  let res = '';
  let operand_a = Math.floor(Math.random() * 32) % 512;
  let operand_b = Math.floor(Math.random() * 13) % 256;
  let operation = Math.floor(Math.random() * 16) % 3;
  switch (operation) {
    case 0: {
      operand_a %= 13;
      operand_b %= 13;
      captcha_solution = operand_a * operand_b;
      res += operand_a + "*" + operand_b;
    }
      break;
    case 1:
    {
      captcha_solution = operand_a + operand_b;
      res += operand_a + "+" + operand_b;
    }
      break;
    case 2:
    {
      captcha_solution = operand_a - operand_b;
      res += operand_a + "-" + operand_b;
    }
      break;
  }

  return res;
}


function createImageFromString(str) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let fontSize = 80;
  let font = fontSize + "px Open sans";
  ctx.font = font;
  canvas.width = ctx.measureText(str).width * 1.9 + str.length * 2;
  canvas.height = fontSize * 1.4;

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.fillStyle = getRandomColor();
  ctx.moveTo(1, 1);
  for (let i = 0; i < str.length * 6; i++)
  {
    ctx.lineTo(Math.random() * i * fontSize % ctx.canvas.width, Math.random() * i * fontSize %  ctx.canvas.height);
  }
  ctx.stroke();
  ctx.closePath()


  for (let i = 0; i < str.length; i++) {
    const x = i * fontSize;
    const y = fontSize;
    const color = getRandomColor();
    const angle = getRandomAngle();
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px Arial`;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(str[i], 0, 0);
    ctx.rotate(-angle);
    ctx.translate(-x, -y);
  }

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.fillStyle = getRandomColor();
  ctx.moveTo(1, 1);
  for (let i = 0; i < str.length * 3; i++)
  {
    ctx.lineTo(Math.random() * i * fontSize % ctx.canvas.width, Math.random() * i * fontSize %  ctx.canvas.height);
  }
  ctx.closePath()
  ctx.stroke();


  const pngFile = canvas.toDataURL('image/png');
  // const a = document.createElement('a');
  // a.download = 'myImage.png';
  // a.href = pngFile;
  // a.textContent = 'Download PNG';
  // a.dataset.downloadurl = ['image/png', a.download, a.href].join(':');
  // document.body.appendChild(a);

  const img = document.createElement('img');
  img.src = pngFile;
  captcha_parent.style.backgroundImage = `url(${pngFile})`;
  captcha_parent.style.width = canvas.width + "px";
  captcha_parent.style.height = canvas.height + "px";
}
function getRandomAngle() {
  const minAngle = -0.4;
  const maxAngle = 0.4;
  return Math.random() * (maxAngle - minAngle) + minAngle;
}
function isEmpty(obj) {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
function truncate(str, maxlength) {
  return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
}
class Accumulator{
  constructor(startingValue){
    this.value = startingValue;
  }
  read(){
    let price = parseInt(prompt("Введите число"));
    this.value += price;
    item_sum_p.innerText = this.value;

    let text = prompt("Введите текст");
    let newDiv = document.createElement("div");
    newDiv.classList.add("t10-card");
    let newP = document.createElement("p");
    newP.innerHTML = truncate(text, 16) + " | " + price.toString();
    newDiv.appendChild(newP);
    t10_cards_host.appendChild(newDiv);

  }
}

var items_list = [];

function main() {
  accumulator = new Accumulator(parseInt(prompt("Введите стартовое число")));
  item_sum_p.innerText = accumulator.value;

}
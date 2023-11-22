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

class Item{
  constructor(ac) {
    this.ac = ac;
    this.count = 1
    this.price_val = 0;
    this.div = document.createElement("div");
    this.div.classList.add("t10-card");
    this.name = document.createElement("p");
    this.name.innerHTML = "NAME";
    this.name.style.display = "inline-block";
    this.price = document.createElement("p");
    this.price.style.display = "inline-block";
    this.price.innerHTML = "0";
    this.count_block = document.createElement("p");
    this.count_block.style.display = "inline-block";
    this.count_block.innerHTML = "X 1";


    this.rmBtn = document.createElement("button");
    this.rmBtn.textContent = "Delete";

    this.plusBtn = document.createElement("button");
    this.minusBtn = document.createElement("button");
    this.plusBtn.textContent = "+";
    this.minusBtn.textContent = "-";


    this.div.appendChild(this.name);
    this.div.appendChild(this.price);
    this.div.appendChild(this.count_block);
    this.div.appendChild(this.rmBtn);
    this.div.appendChild(this.plusBtn);
    this.div.appendChild(this.minusBtn);

    t10_cards_host.appendChild(this.div)

    this.read();

    item_sum_p.innerText = this.ac.value;
  }

  read(){
    let price = parseInt(prompt("Введите число"));
    this.price_val = price;
    this.ac.value += price;
    //item_sum_p.innerText = this.value;

    let text = prompt("Введите текст");

    this.name.innerHTML = truncate(text, 16);
    this.price.innerHTML = "price: " + price.toString();

    this.rmBtn.addEventListener('click', () => {
      this.ac.value -= this.price_val * this.count;
      this.del();
      item_sum_p.innerText = this.ac.value;
    })
    this.plusBtn.addEventListener('click', () => {
      this.plus();
    });
    this.minusBtn.addEventListener('click', () => {
      this.minus();
    });
  }


  del(){
    t10_cards_host.removeChild(this.div);
    /// this.ac.value -= parseInt(this.price.innerHTML);
    console.log("RM: " + this.name.innerHTML)
  }

  plus(){
    this.count += 1;
    this.ac.value += this.price_val;
    this.count_block.innerHTML = "X " + this.count.toString();

    item_sum_p.innerText = this.ac.value;
  }
  minus(){
    this.count -= 1;
    this.ac.value -= this.price_val;
    if (isNaN(this.ac.value))
      this.ac.value = 0;

    if (this.count < 1)
      this.del();
    this.count_block.innerHTML = "X " + this.count.toString();

    item_sum_p.innerText = this.ac.value;
  }
}

class Accumulator{
  constructor(startingValue){
    this.value = startingValue;


  }
  read(){
    new Item(this);
  }

}

var items_list = [];


function my_filter(_arr, a, b){
  let res = [];
  for (let i = 0; i < _arr.length; i++){
    if ((_arr[i] >= a) && (_arr[i] <= b))
      res.push(_arr[i]);
  }
  return res;
}

function main() {
  // accumulator = new Accumulator(parseInt(prompt("Введите стартовое число")));
  accumulator = new Accumulator(0);
  item_sum_p.innerText = accumulator.value;

/*  let arr = [1, 3, 7, 9, 3 , 5, 7]
  let a = parseInt(prompt("Массив: " + arr.toString() + ". Введите a"))
  let b = parseInt(prompt("Массив: " + arr.toString() + ". Введите b"))
  let arr_2 = my_filter(arr, a, b);
  console.log(arr_2.length)
  alert("Фильтрованный массив: " + arr_2.toString())
  arr_2.sort()
  alert("Фильтрованный и отсортированный массив: " + arr_2.toString())*/




}
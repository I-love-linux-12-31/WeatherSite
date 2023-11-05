function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createImageFromString(str) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let fontSize = 80;
  let font = fontSize + "px Open sans";
  ctx.font = font;
  canvas.width = ctx.measureText(str).width * 1.7 + str.length * 2;
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
  const minAngle = -0.3;
  const maxAngle = 0.3;
  return Math.random() * (maxAngle - minAngle) + minAngle;
}
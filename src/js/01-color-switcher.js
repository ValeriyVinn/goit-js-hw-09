function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const bgdColorBtnStart = document.querySelector('button[data-start]');
const bgdColorBtnStop = document.querySelector('button[data-stop]');

bgdColorBtnStart.addEventListener('click', onStartBtnClick);
bgdColorBtnStop.addEventListener('click', onStopBtnClick);

let timerId = null;

function onStartBtnClick() {
  bgdColorBtnStart.disabled = true;
  bgdColorBtnStop.disabled = false;
  timerId = setInterval(setColor, 1000);
}

function setColor() {
  const colorValue = getRandomHexColor();
  console.log(`Color = `, colorValue);
  document.body.style.backgroundColor = colorValue;
}

function onStopBtnClick() {
  bgdColorBtnStart.disabled = false;
  bgdColorBtnStop.disabled = true;
  clearInterval(timerId);
}

console.dir(bgdColorBtnStart);

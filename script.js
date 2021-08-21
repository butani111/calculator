var operators = ['+', '-', '*', '/'];
var currentMode = 'normal';

// compute the answer
function evaluate(value) {
  if (operators.includes(value[value.length - 1]))
    value = value.substring(0, value.length - 1);
  value = value.replace(/e/g, 'Math.E').replace(/π/g, 'Math.PI');
  return eval(value);
}

function addKey(key) {
  if (document.getElementById('display').innerHTML == '0')
    document.getElementById('display').innerHTML = ''
  document.getElementById('display').innerHTML += key;
}

function get_answer() {
  document.getElementById('display').innerHTML = evaluate(document.getElementById('display').innerHTML);
}

function clear_all() {
  document.getElementById('display').innerHTML = '0';
}

// perform the given operation (for sci-calculator)
function perform(operation) {
  let data = document.getElementById('display').innerHTML;
  let value = evaluate(data);
  let answer = 0;

  switch (operation) {
    case 'log':
      answer = Math.log10(value);
      break;
    case 'ln':
      answer = Math.log(value);
      break;
    case 'sin':
      answer = Math.sin(value);
      break;
    case 'cos':
      answer = Math.cos(value);
      break;
    case 'tan':
      answer = Math.tan(value);
      break;
    case '1/x':
      answer = 1 / value;
      break;
    default:
      addKey(operation);
  }
  document.getElementById('display').innerHTML = answer
}

// toggle mode (sci & normal)
function change_mode() {
  let buttons = document.getElementsByClassName('sci-btn');
  document.getElementById('change-mode').innerHTML = currentMode;

  if (currentMode == 'normal') {
    currentMode = 'sci'
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'inline-block';
    }
  }
  else {
    currentMode = 'normal'
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.display = 'none';
    }
  }
}

function romove_last() {
  let value = document.getElementById('display').innerHTML;

  if (value.length <= 1)
    document.getElementById('display').innerHTML = '0';
  else
    document.getElementById('display').innerHTML = value.substring(0, value.length - 1);
}

// auto scroll display on change
const displayScreen = document.getElementById('display');
const displayScrollWidth = displayScreen.scrollWidth;

(document.getElementById('btn-section')).addEventListener('click', () => {
  if (displayScreen.scrollLeft !== displayScrollWidth) {
    displayScreen.scrollTo(displayScrollWidth, 0);
  }
});
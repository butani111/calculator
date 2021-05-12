var keys = document.querySelectorAll('#main span');
var operators = ['+', '-', '*', '/'];
var sciOperators = ['log', 'ln', 'sin', 'cos', 'tan'/* , 'x^y' */, '1/x'];//, 'e', 'π'];

// For resposnsive
const extraValuesForBtnSize =  ['70px', '90px', '45px', '60px'];
const btnsize = ['0', '0'];
if(document.documentElement.clientWidth < 620) {
  btnsize[0] = extraValuesForBtnSize[2];
  btnsize[1] = extraValuesForBtnSize[3];
} else {
  btnsize[0] = extraValuesForBtnSize[0];
  btnsize[1] = extraValuesForBtnSize[1];
}

// when chage mode Normal to Scientific (or wise-versa)
function changeMode(keyValue) {
  var i;
  var mode = document.getElementsByClassName('keys-sci');
  var mode1 = document.getElementsByClassName('keys-to-change');

  if (keyValue == 'sci') {
    for (i = 0; i < mode.length; i++) {
      mode[i].style.display = 'inline-block';
    }
    for (i = 0; i < mode1.length; i++) {
      mode1[i].style.width = btnsize[0]; // '70px';
    }
    document.getElementById('change-mode').innerHTML = 'normal';

  } else /* if (keyValue == 'normal') */ {
    var mode = document.getElementsByClassName('keys-sci');
    for (i = 0; i < mode.length; i++) {
      mode[i].style.display = 'none';
    }
    for (i = 0; i < mode1.length; i++) {
      mode1[i].style.width = btnsize[1]; // '90px';
    }
    document.getElementById('change-mode').innerHTML = 'sci';
  }
}

// compute the answer
function evaluate(value) {
  if (operators.includes(value[value.length - 1]))
    value = value.substring(0, value.length - 1);
  value = value.replace(/e/g, 'Math.E').replace(/π/g, 'Math.PI');
  return eval(value);
}

// set onclick function for all keys
for (let i = 0; i < keys.length; i++) {
  keys[i].onclick = function (e) {
    e.preventDefault();

    currentScreen = document.querySelector('.display');
    keyValue = this.innerHTML;

    if (keyValue == 'sci' || keyValue == 'normal') {
      changeMode(keyValue);
    }

    else {

      if (currentScreen.innerHTML == '0')
        currentScreen.innerHTML = '';

      if (keyValue == 'C') {
        currentScreen.innerHTML = '0';
      }

      else if (keyValue == '=') {
        currentScreen.innerHTML = evaluate(currentScreen.innerHTML);
      }

      else if (keyValue == '.') {
        let lastChar = currentScreen[currentScreen.length - 1];
        if (lastChar != '.')
          currentScreen.innerHTML += '.';
      }

      else if (keyValue == '←') {
        if (currentScreen.innerHTML.length <= 1)
          currentScreen.innerHTML = '0';
        else {
          currentScreen.innerHTML = currentScreen.innerHTML.substring(0, currentScreen.innerHTML.length - 1);
        }
      }

      // operators +, -, *, /
      else if (operators.includes(keyValue)) {
        let lastChar = currentScreen.innerHTML[currentScreen.innerHTML.length - 1];
        
        // added operator just before this
        if (currentScreen.innerHTML != '' && operators.includes(lastChar)) {
          currentScreen.innerHTML[currentScreen.innerHTML.length - 1] = keyValue;
        }
        else if (currentScreen.innerHTML != '') {
          currentScreen.innerHTML += keyValue;
        }
        else if (keyValue == '-') {
          currentScreen.innerHTML += keyValue;
        }
      }

      // scientific operatiors
      else if (sciOperators.includes(keyValue)) {
        var value = evaluate(currentScreen.innerHTML);
        switch (keyValue) {
          case 'log':
            currentScreen.innerHTML = Math.log10(value);
            break;
          case 'ln':
            currentScreen.innerHTML = Math.log(value);
            break;
          case 'sin':
            currentScreen.innerHTML = Math.sin(value);
            break;
          case 'cos':
            currentScreen.innerHTML = Math.cos(value);
            break;
          case 'tan':
            currentScreen.innerHTML = Math.tan(value);
            break;
          case '1/x':
            currentScreen.innerHTML = 1 / value;
            break;
          default:
            currentScreen.innerHTML += keyValue;
        }
      }
      else if (keyValue == 'x^y') {
        currentScreen.innerHTML += '**';
      }
      // Numbers
      else {
        console.log('last');
        currentScreen.innerHTML += keyValue;
      }
    }
  }
}
// select elements
const pinInput = document.getElementById('pin-input');
const typedNumberInput = document.getElementById('typed-numbers-input');
const successMessage = document.getElementById('success');
const failMessage = document.getElementById('fail');
const actionLeftBox = document.getElementById('action-left');

let actionLeft = actionLeftBox.innerText;

// functions
function generatePin() {
  const pin = Math.round(Math.random() * 10000);
  const pinStr = pin.toString();
  if (pinStr.length == 4) {
    return pin;
  }
  return generatePin();
}

function displayPin() {
  const pin = generatePin();
  pinInput.value = pin;
}

function displayTypedPin(event) {
  const clickedNumber = event.target.innerText;

  if (isNaN(clickedNumber)) {
    if (clickedNumber == 'C') {
      typedNumberInput.value = '';
    } else if (clickedNumber == '⌫') {
      typedNumberInput.value = typedNumberInput.value.slice(0, -1);
    }
  } else {
    typedNumberInput.value += clickedNumber;
  }
}

function submitPin() {
  const pinNumber = pinInput.value;
  const typedNumber = typedNumberInput.value;

  // if typed input  is black
  if (typedNumber == '') {
    failMessage.innerText = '❌ Input is emplty!!';
    showError();
    return;
  }
  // if 0 action remaining
  else if (actionLeft < 1) {
    failMessage.innerText = '❌ You have 0 attempts remaining. Try again later';
    showError();
    return;
  }
  // if PIN matched
  else if (pinNumber == typedNumber) {
    showSuccess();
    pinInput.value = '';
    actionLeft = 3;
    actionLeftBox.parentNode.style.display = 'none';
  }
  // If the PIN does not match
  else {
    actionLeft--;
    actionLeftBox.parentNode.style.display = 'block';
    failMessage.innerText = "❌ Pin Didn't Match, Please try again";
    showError();
  }

  actionLeftBox.innerText = actionLeft;
  typedNumberInput.value = '';
}

function showSuccess() {
  successMessage.classList.add('show');
  setTimeout(function () {
    successMessage.classList.remove('show');
  }, 2000);
}

function showError() {
  failMessage.classList.add('show');
  setTimeout(function () {
    failMessage.classList.remove('show');
  }, 2000);
}

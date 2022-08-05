'use strict';
const keys = document.querySelectorAll('.keys');
const billInput = document.querySelector('.bill');
const customInput = document.querySelector('.custom');
const peopleInput = document.querySelector('.people');

const totalAmount = document.querySelector('.total--per--person');
const tipAmount = document.querySelector('.tip--amount--per--person');

const resetButton = document.querySelector('.reset');

// Convert the BillinputValues to Numbers
let billValue;
let peopleValue;

const tipCalculator = {
  tipAmountPerPerson: '0.00',
  totaPerPerson: '0.00',
};

customInput.addEventListener('keydown', function (event) {
  console.log(event);
  customTipAmountPerPersonCalc(event.key);
});

keys.forEach((key) => {
  key.addEventListener('click', function (e) {
    let y = e.target;
    console.log(y.textContent);

    if (y.className === 'reset') {
      updateDetails();
      return;
    } else {
      tipAmountPerPersonCalc(y.textContent);
      updateDetails();
      return;
    }
  });
});

const tipAmountPerPersonCalc = function (tipAmt) {
  billValue = parseFloat(billInput.value);
  peopleValue = parseFloat(peopleInput.value);
  // Slice the Selected tip Percentage
  const slice = tipAmt.length - 1;
  const sliceStr = tipAmt.slice(0, slice);
  const sliceStrValue = parseFloat(sliceStr) / 100;

  // Conditions if User decides to put his custom tip percentage or not
  if (billInput.value && peopleInput.value) {
    if (customInput.value === '' && peopleInput.value) {
      tipCalculator.tipAmountPerPerson = (
        (billValue * sliceStrValue) /
        peopleValue
      ).toFixed(2);

      tipCalculator.totaPerPerson = (
        billValue / peopleValue +
        parseFloat(tipCalculator.tipAmountPerPerson)
      ).toFixed(2);
    } else if (customInput.value) {
      console.log('Costom Value should be empty');
      return;
    }
  } else {
    peopleInput.style.borderStyle = 'solid';
    peopleInput.style.borderColor = 'red';
    console.log('Input a value');
    return;
  }
};

const customTipAmountPerPersonCalc = function (key) {
  billValue = parseFloat(billInput.value);
  peopleValue = parseFloat(peopleInput.value);

  switch (key) {
    case billValue:
    case peopleValue:
    case customInput.value:
    case 'Enter':
    case customInput.value.includes('%'):
      const customValue = parseFloat(customInput.value);
      const customSlice = customInput.value.replaceAll('%', '');

      console.log(customSlice);

      tipCalculator.tipAmountPerPerson = (
        (billValue * (parseFloat(customSlice) / 100)) /
        peopleValue
      ).toFixed(2);

      tipCalculator.totaPerPerson = (
        billValue / peopleValue +
        parseFloat(tipCalculator.tipAmountPerPerson)
      ).toFixed(2);

      updateDetails();
      break;

    case billValue:
    case peopleValue:
    case customInput.value:
    case 'Enter':
      tipCalculator.tipAmountPerPerson = (
        (billValue * (customValue / 100)) /
        peopleValue
      ).toFixed(2);

      tipCalculator.totaPerPerson = (
        billValue / peopleValue +
        parseFloat(tipCalculator.tipAmountPerPerson)
      ).toFixed(2);

      updateDetails();
      break;

    default:
      break;
  }
};

const updateDetails = function () {
  totalAmount.innerHTML = tipCalculator.totaPerPerson;
  tipAmount.innerHTML = tipCalculator.tipAmountPerPerson;
};
updateDetails();

resetButton.addEventListener('click', function () {
  peopleInput.style.borderStyle = 'none';
  peopleInput.style.borderColor = 'none';
  billInput.value = '';
  peopleInput.value = '';
  customInput.value = '';
  totalAmount.innerHTML = '0.00';
  tipAmount.innerHTML = '0.00';
});

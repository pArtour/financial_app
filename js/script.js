let startBtn = document.getElementById('start');

let resultBlock = document.querySelector('.result'),
    budgetValue = resultBlock.querySelector('.budget-value'),
    dayBudgetValue = resultBlock.querySelector('.daybudget-value'),
    levelValue = resultBlock.querySelector('.level-value'),
    expensesValue = resultBlock.querySelector('.expenses-value'),
    optionalExpensesValue = resultBlock.querySelector('.optionalexpenses-value'),
    incomeValue = resultBlock.querySelector('.income-value'),
    monthSavingsValue = resultBlock.querySelector('.monthsavings-value'),
    yearSavingsValue = resultBlock.querySelector('.yearsavings-value'),
    yearValue = resultBlock.querySelector('.year-value'),
    monthValue = resultBlock.querySelector('.month-value'),
    dayValue = resultBlock.querySelector('.day-value');

let expensesInputs = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.querySelector('.expenses-item-btn');

let optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
    optionalExpensesInputs = document.querySelectorAll('.optionalexpenses-item');

let countBudgetBtn = document.querySelector('.count-budget-btn');

let chooseIncomeInput = document.querySelector('.choose-income');

let savingsCheckbox = document.getElementById('savings'),
    sumInput = document.querySelector('.choose-sum'),
    percentInput = document.querySelector('.choose-percent');

let money, time;


const getMonth = (input, time) => {
  input.value = new Date(Date.parse(time)).getMonth() + 1;
  if (input.value < 10) {
    input.value = '0' + input.value;
  }
}
const getYear = (input, time) => {
  input.value = new Date(Date.parse(time)).getFullYear();
}
const getDay = (input, time) => {
  input.value = new Date(Date.parse(time)).getDate();
  if (input.value < 10) {
    input.value = '0' + input.value;
  }
} 


startBtn.addEventListener('click', () => {
  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  money = +prompt("Ваш бюджет на месяц?", '');

  while (isNaN(money) || money === '' || money === null) {
    money = +prompt("Ваш бюджет?", '');
  }
  appData.budget = money;
  appData.timeData = time;

  budgetValue.textContent = money.toFixed();

  getYear(yearValue, time)
  getMonth(monthValue, time);
  getDay(dayValue, time);
});

savingsCheckbox.addEventListener('click', () => {
  if (appData.budget) {
    if (appData.savings) {
      appData.savings = false;
    } else {
      appData.savings = true;
    }
  }
});


expensesBtn.addEventListener('click', () => {
  if (appData.budget) {
    let sum = 0;
  
    for (let i = 0; i < expensesInputs.length; i++) {
      let a = expensesInputs[i].value,
          b = expensesInputs[++i].value;
  
      if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b) != null) && a != '' && b != '' && a.length < 50) {
        appData.expenses[a] = b;
        sum += +b;
      } else {
        i -= 1;
      }
    }
    expensesValue.textContent = sum;
  }
});

optionalExpensesBtn.addEventListener('click', () => {
  if (appData.budget) {
    for (let i = 0; i < optionalExpensesInputs.length; i++) {
      let opt = optionalExpensesInputs[i].value;
      appData.optionalExpences[i] = opt;
      optionalExpensesValue.textContent  += appData.optionalExpences[i] + ' ';
    }
  }
});


countBudgetBtn.addEventListener('click', () => {
  if (appData.budget) {
    appData.moneyPerDay = ((appData.budget - Number.parseInt(expensesValue.textContent)) / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;


    if (appData.moneyPerDay < 100) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerDay > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'Произошла ошибка';
    }
  }
});


chooseIncomeInput.addEventListener('input', function() {
  if (appData.budget) {
    let items = this.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
  }
});


sumInput.addEventListener('input', function () {
  if (appData.budget) {
    if (appData.savings) {
      let sum = +this.value,
          percent = +percentInput.value;
      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100  * percent;
  
      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
  }
});


percentInput.addEventListener('input', function () {
  if (appData.budget) {
    if (appData.savings) {
      let sum = +sumInput.value,
          percent = +this.value;
      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;
  
      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
  }
});




let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpences: {},
  income: [],
  savings: false
};

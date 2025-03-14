(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const anchors = mobileMenu.querySelectorAll('a[href*="#"]');
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen
      ? 'disableBodyScroll'
      : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);

    if (anchors.length === 0) return;

    if (!isMenuOpen) {
      anchors.forEach(anchor => {
        anchor.addEventListener("click", toggleMenu);
      });
      return;
    }

    anchors.forEach(anchor => {
      anchor.removeEventListener("click", toggleMenu);
    });
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });

  window.matchMedia('(min-width: 375px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

// Масив для зберігання операцій
const transactions = []; 

// Створюємо змінну для збереження діаграми
let expenseChart = null;

// Форма витрат
document.getElementById('expenseForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = document.getElementById('expenseAmount').value;
  const description = document.getElementById('expenseDescription').value;
  const date = document.getElementById('expenseDate').value;
  const category = document.getElementById('expenseCategory').value;

  const transaction = {
    type: 'Витрата',
    amount: parseFloat(amount), // Перетворюємо суму на число
    description: description,
    date: date,
    category: category
  };

  addTransactionToHistory(transaction);
  updateExpenseChart(); // Оновлюємо діаграму після додавання витрати
});

// Форма доходу
document.getElementById('incomeForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = document.getElementById('incomeAmount').value;
  const description = document.getElementById('incomeDescription').value;
  const date = document.getElementById('incomeDate').value;
  const category = document.getElementById('incomeCategory').value;

  const transaction = {
    type: 'Дохід',
    amount: parseFloat(amount),
    description: description,
    date: date,
    category: category
  };

  addTransactionToHistory(transaction);
  updateExpenseChart(); // Оновлюємо діаграму після додавання доходу
});

// Функція для додавання операцій в історію
function addTransactionToHistory(transaction) {
  const historyTable = document.getElementById('transactionHistory').getElementsByTagName('tbody')[0];
  const newRow = historyTable.insertRow();

  newRow.insertCell(0).textContent = transaction.type;
  newRow.insertCell(1).textContent = transaction.amount;
  newRow.insertCell(2).textContent = transaction.description;
  newRow.insertCell(3).textContent = transaction.date;
  newRow.insertCell(4).textContent = transaction.category;

  transactions.push(transaction); // Додаємо операцію до масиву
}

// Функція для оновлення діаграми на основі введених даних
function updateExpenseChart() {
  // Очищаємо існуючі дані по категоріях
  const categoryTotals = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    bills: 0,
    other: 0
  };

  const incomeTotals = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    bills: 0,
    other: 0
  };

  // Підсумовуємо витрати і доходи по категоріях
  transactions.forEach(transaction => {
    if (transaction.type === 'Витрата') {
      categoryTotals[transaction.category] += transaction.amount;
    } else if (transaction.type === 'Дохід') {
      incomeTotals[transaction.category] += transaction.amount;
    }
  });

  // Оновлюємо дані для діаграми
  const chartData = [
    categoryTotals.food,
    categoryTotals.transport,
    categoryTotals.entertainment,
    categoryTotals.shopping,
    categoryTotals.bills,
    categoryTotals.other
  ];

  const incomeChartData = [
    incomeTotals.food,
    incomeTotals.transport,
    incomeTotals.entertainment,
    incomeTotals.shopping,
    incomeTotals.bills,
    incomeTotals.other
  ];

  // Якщо діаграма ще не була створена, створюємо її
  if (!expenseChart) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(ctx, {
      type: 'pie', // Тип діаграми
      data: {
        labels: ['Їжа', 'Транспорт', 'Розваги', 'Шопінг', 'Платежі', 'Інше'], // Категорії витрат
        datasets: [{
          label: 'Витрати за категоріями',
          data: chartData, // Дані витрат по категоріях
          backgroundColor: [
            '#ff5733',
            '#33c9ff',
            '#75ff33',
            '#f5e233',
            '#e033d7',
            '#33d7a2'
          ],
          borderColor: '#fff',
          borderWidth: 2
        },
        {
          label: 'Доходи за категоріями',
          data: incomeChartData, // Дані доходів по категоріях
          backgroundColor: [
            '#ff9b9b',
            '#9be6ff',
            '#b0ff9b',
            '#f6f9b9',
            '#e9b9ff',
            '#9be8d0'
          ],
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ': ' + tooltipItem.raw + ' грн';
              }
            }
          }
        }
      }
    });
  } else {
    // Якщо діаграма вже існує, оновлюємо тільки її дані
    expenseChart.data.datasets[0].data = chartData;
    expenseChart.data.datasets[1].data = incomeChartData;
    expenseChart.update(); // Оновлюємо діаграму
  }
}

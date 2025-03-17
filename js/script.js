// !МОДАЛКА


document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".js-menu-container");
    const openMenuBtn = document.querySelector(".js-open-menu");
    const closeMenuBtn = document.querySelector(".js-close-menu");
    const menuLinks = document.querySelectorAll(".mobile-menu-link");

    function toggleMenu() {
        menuContainer.classList.toggle("is-open");
    }

    openMenuBtn?.addEventListener("click", toggleMenu);
    closeMenuBtn?.addEventListener("click", toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            // Отримуємо ID секції, на яку потрібно перейти
            const targetId = link.getAttribute("href").substring(1); // Виключаємо "#" з href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Закриваємо меню
                menuContainer.classList.remove("is-open");

                // Плавно прокручуємо до секції
                window.scrollTo({
                    top: targetSection.offsetTop, // Позиція секції
                    behavior: "smooth" // Плавний скролінг
                });
            }
        });
    });
});


////Модалка входу 

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.querySelector(".js-login-modal");
    const openLoginBtn = document.querySelector(".js-open-login");
    const closeLoginBtn = document.querySelector(".js-close-login");

    function toggleLoginModal() {
        loginModal.classList.toggle("is-open"); // Додаємо або видаляємо клас is-open
    }

    openLoginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        toggleLoginModal();
    });

    closeLoginBtn.addEventListener("click", toggleLoginModal);

    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            toggleLoginModal();
        }
    });

    // Додаємо обробник для відправки форми
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Зупиняємо відправку форми

        // Перевірка, чи поля не порожні та чи валідні
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (!emailInput.value || !passwordInput.value) {
            alert('Будь ласка, заповніть всі поля!');
        } else if (!emailInput.validity.valid || !passwordInput.validity.valid) {
            alert('Будь ласка, перевірте правильність введених даних!');
        } else {
            // Якщо всі умови виконані, переходимо на нову сторінку
            window.location.href = './money.html'; // Перехід на іншу сторінку в поточній вкладці
        }
    });
});









// мані

document.addEventListener("DOMContentLoaded", function () {
    // Зберігаємо історію транзакцій та статистику витрат
    const transactionHistory = [];
    const expenseCategoryCounts = {
        food: 0,
        transport: 0,
        entertainment: 0,
        shopping: 0,
        bills: 0,
        other: 0
    };

    // Оформлення графіка
    const ctx = document.getElementById("expenseChart").getContext("2d");
    const expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Object.keys(expenseCategoryCounts),
            datasets: [{
                data: Object.values(expenseCategoryCounts),
                backgroundColor: ['#FF6F61', '#4CAF50', '#FFEB3B', '#2196F3', '#FF9800', '#9C27B0'],
                borderColor: '#ffffff',
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
                            return `${tooltipItem.label}: ${tooltipItem.raw} грн`;
                        }
                    }
                }
            }
        }
    });

    // Обробник форми для витрат
    const expenseForm = document.getElementById("expenseForm");
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("expenseAmount").value);
        const description = document.getElementById("expenseDescription").value;
        const date = document.getElementById("expenseDate").value;
        const category = document.getElementById("expenseCategory").value;

        // Перевірка на правильність вводу
        if (isNaN(amount) || amount <= 0 || !description || !date || !category) {
            alert("Будь ласка, заповніть всі поля правильно!");
            return;
        }

        // Зберігаємо транзакцію
        transactionHistory.push({ type: "Витрата", amount, description, date, category });

        // Оновлюємо категорії витрат
        expenseCategoryCounts[category] += amount;

        // Оновлюємо діаграму
        expenseChart.data.datasets[0].data = Object.values(expenseCategoryCounts);
        expenseChart.update();

        // Додаємо запис в історію
        addTransactionToHistory("Витрата", amount, description, date, category);

        // Очищаємо форму
        expenseForm.reset();
    });

    // Обробник форми для доходу
    const incomeForm = document.getElementById("incomeForm");
    incomeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("incomeAmount").value);
        const description = document.getElementById("incomeDescription").value;
        const date = document.getElementById("incomeDate").value;
        const category = document.getElementById("incomeCategory").value;

        // Перевірка на правильність вводу
        if (isNaN(amount) || amount <= 0 || !description || !date || !category) {
            alert("Будь ласка, заповніть всі поля правильно!");
            return;
        }

        // Зберігаємо транзакцію
        transactionHistory.push({ type: "Дохід", amount, description, date, category });

        // Додаємо запис в історію
        addTransactionToHistory("Дохід", amount, description, date, category);

        // Очищаємо форму
        incomeForm.reset();
    });

    // Функція для додавання запису до таблиці історії
    function addTransactionToHistory(type, amount, description, date, category) {
        const tableBody = document.querySelector("#transactionHistory tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${type}</td>
            <td>${amount} грн</td>
            <td>${description}</td>
            <td>${date}</td>
            <td>${category}</td>
        `;
        tableBody.appendChild(row);
    }
});

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
            const targetId = link.getAttribute("href").substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
    
                menuContainer.classList.remove("is-open");

              
                window.scrollTo({
                    top: targetSection.offsetTop, 
                    behavior: "smooth"
                });
            }
        });
    });
});


////Модалка входу 

document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.querySelector(".js-login-modal");
    const openLoginBtns = document.querySelectorAll(".js-open-login");
    const closeLoginBtn = document.querySelector(".js-close-login");
    const loginForm = document.getElementById("login-form");

    if (!loginModal || !openLoginBtns.length || !closeLoginBtn || !loginForm) {
        console.error("Не знайдено один із необхідних елементів!");
        return;
    }

    function toggleLoginModal() {
        loginModal.classList.toggle("is-open");
    }

    openLoginBtns.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            toggleLoginModal();
        });
    });

    closeLoginBtn.addEventListener("click", toggleLoginModal);

    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            toggleLoginModal();
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        if (!emailInput.value || !passwordInput.value) {
            alert("Будь ласка, заповніть всі поля!");
        } else if (!emailInput.validity.valid || !passwordInput.validity.valid) {
            alert("Будь ласка, перевірте правильність введених даних!");
        } else {
            window.location.href = "./money.html";
        }
    });
});


//Модалка реєстрації 
document.addEventListener("DOMContentLoaded", function () {
    const registerModal = document.querySelector(".js-register-modal");
    const openRegisterBtns = document.querySelectorAll(".js-open-register");
    const closeRegisterBtn = document.querySelector(".js-close-register");
    const registerForm = document.getElementById("register-form");

    if (!registerModal || !openRegisterBtns.length || !closeRegisterBtn || !registerForm) {
        console.error("Не знайдено один із необхідних елементів!");
        return;
    }

    function toggleRegisterModal() {
        registerModal.classList.toggle("is-open");
    }

    openRegisterBtns.forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            toggleRegisterModal();
        });
    });

    closeRegisterBtn.addEventListener("click", toggleRegisterModal);

    window.addEventListener("click", function (event) {
        if (event.target === registerModal) {
            toggleRegisterModal();
        }
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("register-email");
        const passwordInput = document.getElementById("register-password");
        const confirmPasswordInput = document.getElementById("confirm-password");

        if (!nameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
            alert("Будь ласка, заповніть всі поля!");
        } else if (!emailInput.validity.valid || !passwordInput.validity.valid) {
            alert("Будь ласка, перевірте правильність введених даних!");
        } else if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Паролі не співпадають!");
        } else {
            alert("Реєстрація успішна!");
            registerForm.reset();
            toggleRegisterModal();
            window.location.href = "./money.html"; // Перехід на сторінку money.html
        }
    });
});


// Кнопка вгору



 document.addEventListener("DOMContentLoaded", function () {
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("visible");
            } else {
                scrollToTopBtn.classList.remove("visible");
            }
        });

        scrollToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });


// мані
document.addEventListener("DOMContentLoaded", function () {

    const transactionHistory = [];
    const expenseCategoryCounts = {
        food: 0,
        transport: 0,
        entertainment: 0,
        shopping: 0,
        bills: 0,
        other: 0
    };
    const incomeCategoryCounts = {
        salary: 0,
        bonus: 0,
        gift: 0,
        other: 0
    };


    const incomeColors = {
        salary: "#36A2EB",
        bonus: "#4CAF50",
        gift: "#FF9800",
        other: "#9C27B0"
    };

    // діаграма витрат
    const expenseCtx = document.getElementById("expenseChart").getContext("2d");
    const expenseChart = new Chart(expenseCtx, {
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
                     labels: {
                color: '#fff'
            }
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

//діаграма доходів
const incomeCtx = document.getElementById("incomeChart").getContext("2d");
const incomeChart = new Chart(incomeCtx, {
    type: "bar",
    data: {
        labels: Object.keys(incomeCategoryCounts),
        datasets: [{
            label: "Доходи",
            data: Object.values(incomeCategoryCounts),
            backgroundColor: Object.values(incomeColors),
            borderColor: "#ffffff",
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#ffffff' 
                }
            },
            x: {
                ticks: {
                    color: '#ffffff' 
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
    const expenseForm = document.getElementById("expenseForm");
    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("expenseAmount").value);
        const description = document.getElementById("expenseDescription").value;
        const date = document.getElementById("expenseDate").value;
        const category = document.getElementById("expenseCategory").value;


        transactionHistory.push({ type: "Витрата", amount, description, date, category });
        expenseCategoryCounts[category] += amount;

        expenseChart.data.datasets[0].data = Object.values(expenseCategoryCounts);
        expenseChart.update();

        addTransactionToHistory("Витрата", amount, description, date, category);

    
        expenseForm.reset();
    });


    const incomeForm = document.getElementById("incomeForm");
    incomeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("incomeAmount").value);
        const description = document.getElementById("incomeDescription").value;
        const date = document.getElementById("incomeDate").value;
        const category = document.getElementById("incomeCategory").value;


     
        transactionHistory.push({ type: "Дохід", amount, description, date, category });

        
        incomeCategoryCounts[category] += amount;

       
        incomeChart.data.datasets[0].data = Object.values(incomeCategoryCounts);
        incomeChart.update();

       
        addTransactionToHistory("Дохід", amount, description, date, category);

       
        incomeForm.reset();
    });

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

let budget = 10000;
let totalExpenses = 0;

window.onload = function() {
    let storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    totalExpenses = storedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-expenses').innerText = totalExpenses;
    
    if (totalExpenses > budget) {
        showBudgetAlert();
    }

    storedExpenses.forEach(expense => {
        displayExpense(expense);
    });
}

function addExpense(expenseName, amount, imageUrl) {
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    totalExpenses += parseFloat(amount);
    localStorage.setItem('totalExpenses', totalExpenses);

    let expense = { name: expenseName, amount: parseFloat(amount), image: imageUrl };
    
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    document.getElementById('total-expenses').innerText = totalExpenses;

    if (totalExpenses > budget) {
        showBudgetAlert();
    } else {
        document.getElementById('alert-message').innerText = '';
    }

    displayExpense(expense);
}

function displayExpense(expense) {
    let expenseList = document.getElementById('expenses-list');
    let expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';


    let imgElement = new Image();
    imgElement.onload = function() {
        expenseItem.innerHTML = `
            <p><strong>${expense.name}:</strong> ₹${expense.amount}</p>
            <img src="${expense.image}" alt="Expense Image">
        `;
    };
    
    imgElement.onerror = function() {
        expenseItem.innerHTML = `
            <p><strong>${expense.name}:</strong> ₹${expense.amount}</p>
            <img src="https://via.placeholder.com/50" alt="Default Image">
        `;
    };

    imgElement.src = expense.image; 

    expenseList.appendChild(expenseItem);
}

function showBudgetAlert() {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.innerText = "Warning: You have exceeded your budget!";
    alertMessage.classList.add("shake");


    setTimeout(() => {
        alertMessage.innerText = '';
        alertMessage.classList.remove("shake");
    }, 3000);


    let audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
    audio.play();
}

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let expenseName = document.getElementById('expense-name').value;
    let expenseAmount = document.getElementById('expense-amount').value;
    let expenseImage = document.getElementById('expense-image').value;
    
    addExpense(expenseName, expenseAmount, expenseImage);
    
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-image').value = '';
});

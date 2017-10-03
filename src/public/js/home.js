function createExpenseElement(expense) {
    const element = document.createElement('li');
    element.className = 'list-group-item expense';
    element.innerHTML = `<a href="/expense/${expense.id}">${expense.name}
                            <span class="total">${getExpenseTotal(expense)}</span>
                        </a>`;

    return element;    
}

function updateHomeView() {
    const expensesListElement = document.querySelector('#expenses-list');
    const expenseElements = expensesListElement.querySelectorAll('.expense');

    expenseElements.forEach(e => {
        expensesListElement.removeChild(e);
    });

    const expenses = getExpenses();
    expenses.forEach(expense => {
        expensesListElement.appendChild(createExpenseElement(expense));
    });

    const totalField = expensesListElement.querySelector('.total-row .total');
    totalField.innerHTML = getTotal();
}

document.addEventListener('DOMContentLoaded', function() {
    updateHomeView();

    const addBtn = document.querySelector('#add');
    const expensesListElement = document.querySelector('#expenses-list');

    addBtn.addEventListener('mousedown', () => {
        const newExpense = createNewExpense();
        const e = createExpenseElement(newExpense);
        saveExpense(newExpense);
        expensesListElement.appendChild(e);
     });
}, false);
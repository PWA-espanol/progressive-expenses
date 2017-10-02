function createExpenseDetailElement(detail) {
    const element = document.createElement('li');
    element.className = 'list-group-item expense';
    element.innerHTML = `${detail.name}<span class="total">${detail.cost}</span>`;

    return element;
}

function getExpenseId() {
    const href = location.href;
    const id = href.substr(href.lastIndexOf('/') + 1)
    return parseInt(id, 10);
}

function updateExpensesView() {
    const expenseId = getExpenseId();
    const expensesListElement = document.querySelector('#expenses-list');
    const expenseElements = expensesListElement.querySelectorAll('.expense');

    expenseElements.forEach(e => {
        expensesListElement.removeChild(e);
    });

    const expense = getExpense(expenseId);
    expense.details.forEach(detail => {
        expensesListElement.appendChild(createExpenseDetailElement(detail));
    });

    const totalField = expensesListElement.querySelector('.total-row .total');
    totalField.innerHTML = getExpenseTotal(expense);
}

document.addEventListener('DOMContentLoaded', function() {
    updateExpensesView();
}, false);
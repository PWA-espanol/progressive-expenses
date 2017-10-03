function createExpenseDetailElement(detail) {
    const element = document.createElement('li');
    element.className = 'list-group-item expense';
    element.innerHTML = 
    `<form>
        <div class="form-row">
            <div class="col">
                <input type="text" class="form-control name" value="${detail.name}">
            </div>
            <div class="col">
                <input type="text" class="form-control cost" value="${detail.cost}">
            </div>
        </div>
    </form>`;

    return element;
}

function getExpenseId() {
    const href = location.href;
    const id = href.substr(href.lastIndexOf('/') + 1)
    return parseInt(id, 10);
}

function updateValues() {
    const expenseId = getExpenseId();
    const expense = getExpense(expenseId);
    const expensesListElement = document.querySelector('#expenses-list');
    const expenseElements = expensesListElement.querySelectorAll('.expense');
    let details = [];

    expenseElements.forEach(e => {
        details.push({
            name: e.querySelector('.form-control.name').value,
            cost: parseInt(e.querySelector('.form-control.cost').value,10)
        });
    });

    expense.details = details;

    const totalField = expensesListElement.querySelector('.total-row .total');
    totalField.innerHTML = getExpenseTotal(expense);
}

function updateExpensesView() {
    const expenseId = getExpenseId();
    const expensesListElement = document.querySelector('#expenses-list');
    const expenseElements = expensesListElement.querySelectorAll('.expense');

    expenseElements.forEach(e => {
        expensesListElement.removeChild(e);
    });

    const expense = getExpense(expenseId);

    const expenseName = document.querySelector('#expense-name');
    expenseName.innerHTML = expense.name;
    expense.details.forEach(detail => {
        const e = createExpenseDetailElement(detail);
        e.addEventListener('input', () => { updateValues(); });
        expensesListElement.appendChild(e);
    });

    const totalField = expensesListElement.querySelector('.total-row .total');
    totalField.innerHTML = getExpenseTotal(expense);
}

document.addEventListener('DOMContentLoaded', function() {
    updateExpensesView();
}, false);
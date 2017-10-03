function createExpenseDetailElement(detail) {
    const element = document.createElement('li');
    element.className = 'list-group-item expense';
    element.innerHTML = 
    `<form>
        <div class="form-row">
            <div class="col">
                <input type="text" class="form-control name" value="${detail.name}" required>
            </div>
            <div class="col">
                <input type="number" class="form-control cost" value="${detail.cost}" required>
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
        const name = e.querySelector('.form-control.name').value;
        const cost = e.querySelector('.form-control.cost').value;
        if (name && cost) {
            details.push({
                name: e.querySelector('.form-control.name').value,
                cost: parseInt(cost, 10)
            });
        }
    });

    expense.details = details;

    const totalField = expensesListElement.querySelector('.total-row .total');
    totalField.innerHTML = getExpenseTotal(expense);
    saveExpense(expense);
}

function updateName() {
    const expenseId = getExpenseId();
    const expense = getExpense(expenseId);
    const expenseName = document.querySelector('#expense-name');

    expense.name = expenseName.value;

    saveExpense(expense);
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
    expenseName.value = expense.name;

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

    const expenseName = document.querySelector('#expense-name');
    expenseName.addEventListener('input', () => { updateName(); });

    const addBtn = document.querySelector('#add');
    const expensesListElement = document.querySelector('#expenses-list');

    addBtn.addEventListener('mousedown', () => { 
        const e = createExpenseDetailElement({ name: '', cost: 0 });
        e.addEventListener('input', () => { updateValues(); });
        expensesListElement.appendChild(e);
     });
}, false);
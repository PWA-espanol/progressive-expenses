function saveExpenses(expenses) {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem("expenses", expensesString);
}

function getExpenses() {
    const expenses = localStorage.getItem("expenses");

    if (expenses && expenses.length > 0) {
        return JSON.parse(expenses);
    } else {
        const expensesStorage = [{
            id: 1,
            name: "Super",
            details: [
                { name: "Gaseosas", cost: 10 },
                { name: "Galletas", cost: 20 },
                { name: "Pan", cost: 5 },
            ]
        }, {
            id: 2,
            name: "Viaje",
            details: [
                { name: "Tren", cost: 10 },
                { name: "Colectivo", cost: 5 }
            ]
        }];
        saveExpenses(expensesStorage);
        return expensesStorage;
    }
}

function getExpense(expenseId) {
    const result = getExpenses().filter( expense => expense.id === expenseId);
    return (result && result.length > 0) ? result[0] : undefined;
}

function getExpenseTotal(expense) {
    let total = 0;
    if (expense && expense.details) {
        expense.details.forEach( item => {
            total += item.cost;
        });
    }

    return total;
}

function getTotal() {
    let total = 0;
    getExpenses().forEach( expense => {
        total += getExpenseTotal(expense);
    });

    return total;
}
